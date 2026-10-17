import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.resolve(__dirname, '../public/data/posts');
const ARTICLES_INDEX = path.resolve(__dirname, '../public/data/articles.json');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

async function checkRemoteUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    clearTimeout(timeout);
    if (res.ok) {
      return { ok: true, status: res.status };
    }
    // Some CDNs reject HEAD requests with 403 or 405; fallback to GET with range
    const getController = new AbortController();
    const getTimeout = setTimeout(() => getController.abort(), 6000);
    const getRes = await fetch(url, {
      method: 'GET',
      headers: {
        'Range': 'bytes=0-1024',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: getController.signal
    });
    clearTimeout(getTimeout);
    return { ok: getRes.ok, status: getRes.status };
  } catch (err) {
    return { ok: false, status: err.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR', error: err.message };
  }
}

async function validateArticleImages() {
  console.log('====================================================');
  console.log('   Ishara\'s Blog Article Image Validation Suite   ');
  console.log('====================================================\n');

  const errors = [];
  const warnings = [];

  // 1. Verify existence of articles.json
  if (!fs.existsSync(ARTICLES_INDEX)) {
    console.error('❌ Missing articles index:', ARTICLES_INDEX);
    process.exit(1);
  }

  const articles = JSON.parse(fs.readFileSync(ARTICLES_INDEX, 'utf8'));
  const postFiles = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.json') && f !== 'README.json');

  console.log(`📁 Scanning ${postFiles.length} post files and ${articles.length} index entries...\n`);

  // 2. Validate slugs and IDs uniqueness
  const slugCounts = new Map();
  const imageUrlMap = new Map(); // url -> Array of slugs

  for (const file of postFiles) {
    const post = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'));
    slugCounts.set(post.slug, (slugCounts.get(post.slug) || 0) + 1);

    // Track image usage across articles
    if (post.coverImage) {
      const existing = imageUrlMap.get(post.coverImage) || [];
      existing.push(post.slug);
      imageUrlMap.set(post.coverImage, existing);
    }
  }

  // Check unique slugs
  for (const [slug, count] of slugCounts.entries()) {
    if (count > 1) {
      errors.push(`Duplicate slug detected across files: "${slug}" (${count} occurrences)`);
    }
  }

  // 3. Validate each article's coverImage
  const results = [];

  for (const file of postFiles) {
    const post = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'));
    const isPublished = !post.isDemo && post.status !== 'draft';
    const indexEntry = articles.find((a) => a.slug === post.slug);

    const record = {
      slug: post.slug,
      title: post.title,
      isPublished,
      postCover: post.coverImage,
      indexCover: indexEntry ? indexEntry.coverImage : 'MISSING',
      syncStatus: 'MATCH',
      urlValid: false,
      isLocal: false,
      remoteStatus: 'N/A'
    };

    // Check required coverImage
    if (isPublished && (!post.coverImage || post.coverImage.trim() === '')) {
      errors.push(`Published article "${post.slug}" is missing a coverImage.`);
    }

    // Check placeholder tokens
    if (
      post.coverImage &&
      (post.coverImage.includes('YOUR_CLOUD_NAME') ||
        post.coverImage.includes('REPLACE_THIS_COVER') ||
        post.coverImage.includes('YOUR_CDN_DOMAIN'))
    ) {
      errors.push(`Article "${post.slug}" has unreplaced placeholder in coverImage: ${post.coverImage}`);
    }

    // Check synchronization with articles.json
    if (!indexEntry) {
      errors.push(`Article "${post.slug}" exists in posts/ but is missing from articles.json.`);
      record.syncStatus = 'NOT_IN_INDEX';
    } else if (indexEntry.coverImage !== post.coverImage) {
      errors.push(`Cover image mismatch for "${post.slug}": posts/${file} (${post.coverImage}) vs articles.json (${indexEntry.coverImage})`);
      record.syncStatus = 'MISMATCH';
    }

    // Check local path existence or URL syntax
    if (post.coverImage) {
      if (post.coverImage.startsWith('/')) {
        record.isLocal = true;
        const localPath = path.join(PUBLIC_DIR, post.coverImage);
        if (!fs.existsSync(localPath)) {
          errors.push(`Local image file does not exist: "${post.coverImage}" (resolved: ${localPath}) for article "${post.slug}"`);
          record.urlValid = false;
        } else {
          record.urlValid = true;
          record.remoteStatus = 'LOCAL_FILE_OK';
        }
      } else {
        try {
          const parsed = new URL(post.coverImage);
          if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            record.urlValid = true;
          } else {
            errors.push(`Invalid protocol "${parsed.protocol}" in coverImage for article "${post.slug}". Expected HTTP/HTTPS.`);
          }
        } catch (e) {
          errors.push(`Malformed coverImage URL for article "${post.slug}": "${post.coverImage}"`);
        }
      }
    }

    results.push(record);
  }

  // 4. Check image reuse warning
  for (const [url, slugs] of imageUrlMap.entries()) {
    if (slugs.length > 1) {
      warnings.push(`Image URL is shared by multiple articles (${slugs.length}):\n     URL: ${url}\n     Articles: ${slugs.join(', ')}`);
    }
  }

  // 5. Test remote availability for external URLs
  console.log('🌐 Testing remote network availability for external CDN images...');
  const remoteCache = new Map();

  for (const r of results) {
    if (!r.isLocal && r.urlValid && r.postCover) {
      if (!remoteCache.has(r.postCover)) {
        const check = await checkRemoteUrl(r.postCover);
        remoteCache.set(r.postCover, check);
      }
      const remote = remoteCache.get(r.postCover);
      r.remoteStatus = remote.ok ? `HTTP ${remote.status}` : `FAILED (${remote.status})`;
      if (!remote.ok) {
        warnings.push(`Remote image unreachable or returned error: ${r.postCover} (${remote.status})`);
      }
    }
  }

  // 6. Print Report Table
  console.log('\n--- Article Image Audit Summary ---');
  console.log(
    'Slug'.padEnd(42) +
    'Sync'.padEnd(10) +
    'Remote Availability'.padEnd(20) +
    'Cover Image URL'
  );
  console.log('-'.repeat(110));

  for (const r of results) {
    console.log(
      r.slug.slice(0, 40).padEnd(42) +
      r.syncStatus.padEnd(10) +
      r.remoteStatus.padEnd(20) +
      r.postCover.slice(0, 50) + (r.postCover.length > 50 ? '...' : '')
    );
  }

  console.log('\n-----------------------------------');
  console.log(`Total Articles Checked: ${results.length}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (warnings.length > 0) {
    console.log('\n⚠️ Warnings:');
    warnings.forEach((w) => console.log('  - ' + w));
  }

  if (errors.length > 0) {
    console.log('\n❌ Validation FAILED:');
    errors.forEach((e) => console.log('  - ' + e));
    process.exit(1);
  }

  console.log('\n✅ All article images are synchronized and valid!\n');
}

validateArticleImages();
