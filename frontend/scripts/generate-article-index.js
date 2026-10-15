import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.resolve(__dirname, '../public/data/posts');
const OUTPUT_FILE = path.resolve(__dirname, '../public/data/articles.json');

function generateArticleIndex() {
  console.log('[generate-article-index] Scanning posts directory:', POSTS_DIR);

  if (!fs.existsSync(POSTS_DIR)) {
    throw new Error(`Posts directory not found: ${POSTS_DIR}`);
  }

  const files = fs.readdirSync(POSTS_DIR).filter((file) => {
    return file.endsWith('.json') && file !== 'README.json' && file !== 'articles.json';
  });

  console.log(`[generate-article-index] Found ${files.length} article post files.`);

  const articles = [];
  const seenIds = new Set();
  const seenSlugs = new Set();
  const errors = [];

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const post = JSON.parse(raw);

      // Validate required fields
      const requiredFields = ['id', 'slug', 'title', 'coverImage', 'category', 'publishedAt', 'readingTime'];
      for (const field of requiredFields) {
        if (!post[field]) {
          errors.push(`File "${file}" missing required field "${field}".`);
        }
      }

      // Validate filename matches slug
      const expectedFileName = `${post.slug}.json`;
      if (file !== expectedFileName) {
        errors.push(`File name "${file}" does not match post slug "${post.slug}". Expected "${expectedFileName}".`);
      }

      // Check duplicates
      if (seenIds.has(post.id)) {
        errors.push(`Duplicate article ID found: "${post.id}" in file "${file}".`);
      }
      seenIds.add(post.id);

      if (seenSlugs.has(post.slug)) {
        errors.push(`Duplicate article slug found: "${post.slug}" in file "${file}".`);
      }
      seenSlugs.add(post.slug);

      // Extract metadata (omit large blocks/sections/content)
      const metadata = {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        coverImage: post.coverImage,
        category: post.category,
        categoryName: post.categoryName || post.category.toUpperCase(),
        tags: Array.isArray(post.tags) ? post.tags : [],
        language: post.language || 'en',
        author: {
          id: post.author?.id || 'ishara-udayanga',
          name: post.author?.name || 'Ishara Udayanga',
          avatar: post.author?.avatar || '/images/ishara-avatar.jpg',
          role: post.author?.role || 'Writer · Builder · Lifelong Learner',
          bio: post.author?.bio || ''
        },
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        featured: Boolean(post.featured),
        featuredOrder: typeof post.featuredOrder === 'number' ? post.featuredOrder : 99,
        isDemo: Boolean(post.isDemo),
        status: post.status || (post.isDemo ? 'demo' : 'published'),
        relatedArticleSlugs: Array.isArray(post.relatedArticleSlugs) ? post.relatedArticleSlugs : []
      };

      articles.push(metadata);
    } catch (err) {
      errors.push(`Error parsing file "${file}": ${err.message}`);
    }
  }

  if (errors.length > 0) {
    console.error('[generate-article-index] Validation failed with errors:');
    errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  // Sort articles: newest published date first
  articles.sort((a, b) => {
    const timeA = new Date(a.publishedAt).getTime();
    const timeB = new Date(b.publishedAt).getTime();
    if (!isNaN(timeA) && !isNaN(timeB)) {
      return timeB - timeA;
    }
    return 0;
  });

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2), 'utf8');

  const publishedCount = articles.filter((a) => !a.isDemo && a.status !== 'draft').length;
  const demoCount = articles.filter((a) => a.isDemo).length;

  console.log(`[generate-article-index] Successfully generated ${OUTPUT_FILE}`);
  console.log(`[generate-article-index] Total: ${articles.length} | Published: ${publishedCount} | Demo/Hidden: ${demoCount}`);
}

generateArticleIndex();
