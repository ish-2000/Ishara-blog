# Article Management Guide — Ishara's Blog

This guide outlines how the static JSON blogging architecture works and provides clear instructions for adding, updating, and publishing articles on **Ishara's Blog**.

---

## 1. Architecture & Storage Overview

```
public/
└── data/
    ├── articles.json              # Primary metadata index (generated at build time)
    └── posts/
        ├── {slug}.json            # Individual full article posts (source of truth)
        └── ...
scripts/
└── generate-article-index.js      # Build-time indexing & validation script
```

- **Canonical Source of Truth**: Each article has its own JSON file located in `public/data/posts/{slug}.json`.
- **Primary Metadata Index**: `public/data/articles.json` is a lightweight index containing article metadata (titles, excerpts, covers, tags, authors, etc.) used by the Homepage, Journal, and Newsroom.
- **Automatic Index Generator**: Running `npm run generate-index` (or `npm run build`) automatically reads all posts in `public/data/posts/`, validates them, excludes heavy block content, sorts them by publication date, and generates `public/data/articles.json`.

---

## 2. Article Visibility & Publishing Rules

| Field | Value | Behavior |
| :--- | :--- | :--- |
| `status` | `"published"` | Visible across all public lists (Homepage, Journal, Newsroom). Default for regular articles. |
| `status` | `"draft"` | **Hidden** from public listings. Accessible directly via its URL for preview. |
| `isDemo` | `true` | **Hidden** from public listings by default. Preserved for interactive block format testing. |
| `isDemo` | `false` | Visible publicly (unless `status: "draft"`). |
| `featured`| `true` | Featured in the homepage hero carousel and spotlight banner. |
| `featuredOrder` | `0, 1, 2...` | Determines priority order in the auto-sliding hero carousel. |

---

## 3. How to Create a New Article

### Step 1: Create the Post File
Create a new file in `public/data/posts/{slug}.json` where `{slug}` is lowercase and hyphenated (e.g. `understanding-quantum-chips.json`).

### Step 2: Fill in the JSON Template
```json
{
  "id": "understanding-quantum-chips-2026",
  "slug": "understanding-quantum-chips",
  "title": "Understanding Quantum Chips: From Lab Curiosities to Practical Silicon",
  "excerpt": "A deep dive into superconducting qubits, cryogenic dilution cooling, and what the latest quantum processor leaps mean for real-world computing.",
  "category": "chips",
  "categoryName": "CHIPS",
  "tags": [
    "Quantum",
    "Hardware",
    "Silicon",
    "Deep Tech"
  ],
  "coverImage": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80",
  "author": {
    "id": "ishara-udayanga",
    "name": "Ishara Udayaga",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    "role": "Writer · Builder · Lifelong Learner"
  },
  "publishedAt": "Oct 15, 2026",
  "readingTime": "6 min read",
  "featured": true,
  "featuredOrder": 1,
  "isDemo": false,
  "status": "published",
  "relatedArticleSlugs": [
    "inside-nvidia-new-chip-race",
    "gemini-new-model-shutdown-debate"
  ],
  "blocks": [
    {
      "type": "heading",
      "level": 2,
      "id": "introduction",
      "text": "The Next Frontier in Computing"
    },
    {
      "type": "paragraph",
      "text": "For decades, classical semiconductors have scaled via standard optical lithography. But as quantum advantage approaches, new architectural paradigms are emerging."
    },
    {
      "type": "quote",
      "text": "Quantum computing is not just faster computing; it is fundamentally different mathematics.",
      "author": "Ishara Udayaga"
    },
    {
      "type": "heading",
      "level": 2,
      "id": "code-example",
      "text": "Simulating Qubits in Python"
    },
    {
      "type": "code",
      "language": "python",
      "filename": "quantum_circuit.py",
      "code": "import qiskit\n\ncircuit = qiskit.QuantumCircuit(2, 2)\ncircuit.h(0)\ncircuit.cx(0, 1)\ncircuit.measure([0, 1], [0, 1])\nprint(circuit)"
    },
    {
      "type": "image",
      "url": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      "alt": "Quantum processor chip cryogenic mount",
      "caption": "Dilution refrigerator test chamber for superconducting qubits"
    },
    {
      "type": "list",
      "style": "bullet",
      "items": [
        "**Superconducting Loops**: Josephson junctions operating at millikelvin temperatures.",
        "**Trapped Ion Systems**: High coherence times with optical laser gate control.",
        "**Silicon Spin Qubits**: Leveraging existing semiconductor manufacturing cleanrooms."
      ]
    },
    {
      "type": "callout",
      "variant": "info",
      "title": "Hardware Takeaway",
      "text": "Hybrid quantum-classical algorithms will handle specialized subroutines while GPUs continue handling general linear algebra."
    }
  ]
}
```

### Step 3: Rebuild the Metadata Index
Run the generator script:
```bash
npm run generate-index
```
This updates `public/data/articles.json` with your new post automatically.

---

## 4. Supported Content Block Types

The safe block renderer supports the following block types (without using `dangerouslySetInnerHTML`):

| Type | Fields | Description |
| :--- | :--- | :--- |
| `heading` | `level: 2 \| 3`, `id: string`, `text: string` | Renders `h2` or `h3`. The `id` automatically populates the Table of Contents. |
| `paragraph` | `text: string` | Supports safe inline markdown formatting: `[Links](url)`, `**bold**`, `*italic*`, and `` `code` ``. |
| `code` | `code: string`, `language?: string`, `filename?: string` | Dark monospace code box with language tag and interactive copy button. |
| `quote` | `text: string`, `author?: string` | Editorial quote callout with border and attribution. |
| `image` | `url: string`, `alt?: string`, `caption?: string` | Responsive CDN image with centered semantic caption. |
| `list` | `style: "bullet" \| "ordered"`, `items: string[]` | Formatted bulleted or numbered list. |
| `callout` | `title?: string`, `text: string`, `variant?: "info" \| "tip" \| "warning"` | Styled highlight card with icon. |

---

## 5. Categories Reference

Use any of the established category slugs:
- `ai-news` (AI News)
- `chips` (Chips & Hardware)
- `big-tech` (Big Tech)
- `future-tech` (Future Tech)
- `opinions` (Opinions & Essays)
- `development` (Development)

---

## 6. How to Deploy on Vercel

1. Commit and push your changes to GitHub:
   ```bash
   git add public/data/posts/ scripts/
   git commit -m "feat: publish new article on quantum chips"
   git push origin main
   ```
2. Vercel automatically runs `npm run build`, which triggers `node scripts/generate-article-index.js` first.
3. Your new article is live globally within ~60 seconds!

---

## 7. Troubleshooting

* **Article not showing up in Journal or Newsroom?**
  - Verify that `"isDemo": false` and `"status": "published"` (or `status` is omitted).
  - Run `npm run generate-index` to regenerate `public/data/articles.json`.
* **Table of contents is empty?**
  - Ensure your `heading` blocks have unique `id` fields (e.g. `"id": "introduction"`).
* **Cover image appears as a generic placeholder?**
  - Verify that your `coverImage` URL is a valid, publicly reachable HTTPS link (e.g. Unsplash or Cloudinary). Placeholders containing `YOUR_CLOUD_NAME` will automatically fall back to curated category visuals.
