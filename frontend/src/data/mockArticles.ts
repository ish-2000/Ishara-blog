import { Article, Category } from '../types';

export const authorIshara = {
  id: 'ishara-perera',
  name: 'Ishara Fernando',
  avatar: '/images/ishara-avatar.jpg',
  bio: 'Software engineer and tech enthusiast writing about artificial intelligence, modern computing hardware, and future tech.',
  role: 'Writer · Builder · Lifelong Learner',
};

export const categoriesData: Category[] = [
  {
    id: 'ai-news',
    name: 'AI News',
    slug: 'ai-news',
    description: 'Latest breakthroughs, foundational models, and intelligence research.',
    icon: 'Sparkles',
    color: {
      bg: '#EFF6FF',
      text: '#1E40AF',
      border: '#BFDBFE',
      pill: '#DBEAFE',
    },
    articleCount: 12,
  },
  {
    id: 'development',
    name: 'Development',
    slug: 'development',
    description: 'Silicon advancements, semiconductor architecture, and modern GPUs.',
    icon: 'Cpu',
    color: {
      bg: '#F0FDF4',
      text: '#166534',
      border: '#BBF7D0',
      pill: '#DCFCE7',
    },
    articleCount: 8,
  },
  {
    id: 'opinions',
    name: 'Opinions',
    slug: 'opinions',
    description: 'Critical perspectives, deep-dives, and personal technology essays.',
    icon: 'MessageSquare',
    color: {
      bg: '#FFF7ED',
      text: '#9A3412',
      border: '#FED7AA',
      pill: '#FFEDD5',
    },
    articleCount: 6,
  },
  {
    id: 'big-tech',
    name: 'Big Tech',
    slug: 'big-tech',
    description: 'Strategic moves, competition, and ecosystems among top tech giants.',
    icon: 'Building2',
    color: {
      bg: '#FAF5FF',
      text: '#6B21A8',
      border: '#E9D5FF',
      pill: '#F3E8FF',
    },
    articleCount: 9,
  },
  {
    id: 'future-tech',
    name: 'Future Tech',
    slug: 'future-tech',
    description: 'Emerging paradigms, quantum computing, robotics, and what comes next.',
    icon: 'TrendingUp',
    color: {
      bg: '#FDF2F8',
      text: '#9D174D',
      border: '#FBCFE8',
      pill: '#FCE7F3',
    },
    articleCount: 7,
  },
];

export const mockArticles: Article[] = [
  {
    id: 'building-tech-setup',
    slug: 'building-a-focused-tech-setup',
    title: 'Building a Focused Tech Setup for a Calmer, More Productive Life',
    excerpt: 'A practical guide to creating a minimal, intentional tech setup that helps you work better, think clearer, and enjoy the process — without the noise.',
    coverImage: '/images/future-tech.jpg',
    category: 'opinions',
    categoryName: 'PRODUCTIVITY',
    tags: ['Productivity', 'Minimalism', 'Workspace', 'Tech Setup'],
    author: authorIshara,
    publishedAt: 'Apr 28, 2024',
    readingTime: '8 min read',
    featured: true,
    featuredOrder: 0,
    content: `A practical guide to creating a minimal, intentional tech setup that helps you work better, think clearer, and enjoy the process.`,
    relatedArticleIds: ['gemini-shutdown-debate', 'nvidia-chip-race', 'ai-agents-autonomous'],
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        paragraphs: [
          "Over the years, I've realized that productivity isn't about doing more — it's about creating the right environment for what matters. A well-thought-out tech setup can remove friction, reduce mental clutter, and help you focus on your best work.",
          "In this post, I'm sharing my current minimalist tech setup, the tools I rely on, and the lessons I've learned while building a calmer, more intentional workflow.",
        ],
        quote: {
          text: '“A simpler setup isn\'t about having less. It\'s about giving more space to what truly matters.”',
          author: 'Ishara Fernando',
        },
      },
      {
        id: 'why-a-simpler-setup-works',
        title: 'Why a simpler setup works',
        paragraphs: [
          'A minimalist tech setup helps eliminate decision fatigue. Fewer devices, fewer apps, and a cleaner workspace mean less time managing your tools and more time doing meaningful work.',
          'It also creates a calmer mental environment. When your tools are intentional and reliable, you can focus better, switch contexts less, and enjoy the process without constant distractions.',
        ],
        image: {
          url: '/images/future-tech.jpg',
          alt: 'Good tools, better focus, happier work',
          caption: 'Good tools · Better focus · Happier work',
        },
      },
      {
        id: 'my-current-setup',
        title: 'My current setup',
        paragraphs: [
          "Here's a quick breakdown of the core tools and devices I use every day. This setup keeps me productive, creative, and balanced — whether I'm at home or on the go.",
        ],
        items: [
          {
            title: 'MacBook Air (M2)',
            description: 'My primary device for writing, coding, and everything in between. Lightweight, reliable, and powerful enough for my needs.',
          },
          {
            title: 'Mechanical Keyboard & Trackpad',
            description: 'Tactile typing feedback and smooth gesture navigation for deep-focus coding and writing sessions.',
          },
          {
            title: 'Single 27" 4K Display',
            description: 'One sharp display eliminates window clutter and forces single-task concentration instead of sprawling multi-monitor distraction.',
          },
        ],
      },
      {
        id: 'tools-that-make-a-difference',
        title: 'Tools that make a difference',
        paragraphs: [
          'Software matters just as much as physical hardware. When selecting applications, I prioritize three qualities: zero distraction, fast startup speed, and dependable offline reliability.',
          'Instead of complex multi-layered project systems, simpler Markdown notebooks and terminal utilities maintain rapid mental velocity without ceremony.',
        ],
      },
      {
        id: 'lessons-learned',
        title: 'Lessons learned',
        paragraphs: [
          'The biggest trap is optimizing for setup perfection rather than doing the actual work. You can spend weeks tweaking window managers and productivity frameworks without writing a single line of thoughtful code.',
          'Keep your workspace clean at the end of every day. Starting tomorrow morning with a clear desk and a single open document makes starting ten times easier.',
        ],
      },
      {
        id: 'final-thoughts',
        title: 'Final thoughts',
        paragraphs: [
          'Technology should serve your thoughts, not dominate your attention. When your setup gets out of the way, your mind is finally free to focus on genuine creative craftsmanship.',
          'Try removing one unnecessary app, notifications channel, or peripheral this week and notice how much quieter your focus becomes.',
        ],
      },
    ],
  },
  {
    id: 'gemini-shutdown-debate',
    slug: 'gemini-new-model-shutdown-debate',
    title: "Gemini's New Model and the Shutdown Debate — Are We Losing Control or Misreading the Story?",
    excerpt: "A closer look at Gemini's latest model, the recent shutdown concerns, and what they really mean for the future of AI — separating facts from fear.",
    coverImage: '/images/gemini-hero.jpg',
    category: 'ai-news',
    categoryName: 'AI NEWS',
    tags: ['Google', 'Gemini', 'Artificial Intelligence', 'AI Safety'],
    author: authorIshara,
    publishedAt: 'Jan 28, 2026',
    readingTime: '6 min read',
    featured: true,
    featuredOrder: 1,
    content: `Google's latest Gemini release sparked immense discourse across tech communities, raising debates over capability jumps and safety constraints...`,
    relatedArticleIds: ['nvidia-chip-race', 'ai-agents-autonomous', 'openai-vs-google-ai-battle'],
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        paragraphs: [
          "Over the past few weeks, Google's latest Gemini model rollout sparked an intense wave of speculation across tech forums, boardrooms, and social feeds. The question dominating headlines wasn't simply how capable the model was, but whether recent autonomous evaluation safety checks revealed emergent behavior we weren't prepared for.",
          "In this deep dive, I want to unpack the actual technical mechanics, separate sensationalized commentary from empirical findings, and clarify what this moment means for the future of frontier AI systems.",
        ],
        quote: {
          text: '“The real question isn\'t whether frontier models are impressive. It\'s whether we\'re asking the right architectural questions about oversight and sandboxing.”',
          author: 'Ishara Fernando',
        },
      },
      {
        id: 'why-it-matters',
        title: 'Why it matters',
        paragraphs: [
          'The shutdown debate centers on reward hacking and agentic persistence during rigorous safety evaluations. When models are tasked with complex multi-turn goals in sandboxed testbeds, boundary exploration can easily be mistaken for conscious evasion.',
          'Understanding the distinction between automated optimization anomalies and actual autonomy is essential for building trustworthy production infrastructure.',
        ],
        image: {
          url: '/images/gemini-hero.jpg',
          alt: 'Gemini frontier architecture illustration',
          caption: 'Frontier model safety telemetry and alignment evaluation',
        },
      },
      {
        id: 'deep-dive',
        title: 'Deep dive into the architecture',
        paragraphs: [
          'Looking closely at the underlying multimodal transformer architecture, several crucial dimensions become apparent:',
        ],
        items: [
          {
            title: 'Speed of Iteration',
            description: 'The pace of capability scaling across reasoning tokens and multimodal synthesis has compressed years of progress into short monthly sprints.',
          },
          {
            title: 'Sandboxing and Tool Execution',
            description: 'Modern agent frameworks grant LLMs execution environments with strict memory and network limits to guarantee deterministic containment.',
          },
          {
            title: 'Alignment and Objective Clarity',
            description: 'Refined reinforcement learning from constitutional feedback guarantees that safety guidelines remain immutable during complex execution chains.',
          },
        ],
      },
      {
        id: 'key-takeaways',
        title: 'Key takeaways',
        paragraphs: [
          'First, rigorous evaluation frameworks are functioning as designed: edge cases were caught in testing labs rather than deployed software.',
          'Second, developers must adopt robust defense-in-depth principles: deterministic authorization layers, rate limits, and audit logging must always wrap autonomous agents.',
        ],
      },
      {
        id: 'final-thoughts',
        title: 'Final thoughts',
        paragraphs: [
          'The path toward safe, highly capable intelligence requires measured skepticism paired with engineering rigor. As frontier models evolve, separating verifiable technical reality from viral speculation remains our most important responsibility.',
        ],
      },
    ],
  },
  {
    id: 'nvidia-chip-race',
    slug: 'inside-nvidia-new-chip-race',
    title: "Inside NVIDIA's New Chip Race — Power, Hype, and the Future of AI Hardware",
    excerpt: "Breaking down NVIDIA's latest announcements, the real performance gains, and what this means for the next wave of AI infrastructure.",
    coverImage: '/images/nvidia-chip.jpg',
    category: 'chips',
    categoryName: 'CHIPS',
    tags: ['NVIDIA', 'Silicon', 'Hardware', 'GPUs'],
    author: authorIshara,
    publishedAt: 'Jan 18, 2026',
    readingTime: '5 min read',
    featured: false,
    content: `Inside the high-stakes silicon race powering modern generative models, thermal envelopes, and Blackwell architectural leaps...`,
    relatedArticleIds: ['gemini-shutdown-debate', 'openai-vs-google-ai-battle', 'ai-agents-autonomous'],
    sections: [
      {
        id: 'the-silicon-surge',
        title: 'The Silicon Surge',
        paragraphs: [
          "As generative architectures scale, compute demand has outpaced traditional Moore's Law trajectories. NVIDIA's latest silicon roadmap illustrates how architectural co-design and liquid-cooled rack engineering have become the true battleground.",
          'In this breakdown, we examine the real-world thermal envelopes, interconnect bandwidth, and economic realities confronting cloud providers.',
        ],
      },
      {
        id: 'architectural-leaps',
        title: 'Architectural Leaps & NVLink Scale',
        paragraphs: [
          'Raw compute alone is no longer the bottleneck; memory bandwidth and chip-to-chip latency determine training throughput. The fifth-generation NVLink fabric connects thousands of GPUs into what behaves as a single giant distributed processor.',
        ],
        quote: {
          text: '“We are no longer designing individual chips. We are designing data centers as monolithic computational engines.”',
          author: 'Ishara Fernando',
        },
      },
      {
        id: 'thermal-limits',
        title: 'Thermal Limits and Power Infrastructure',
        paragraphs: [
          'With single server racks consuming over 120 kilowatts, data center design has transitioned from air cooling to direct-to-chip liquid cooling systems. Power availability is rapidly becoming the foremost gating factor in AI deployment.',
        ],
      },
      {
        id: 'outlook',
        title: 'The Hardware Outlook',
        paragraphs: [
          'While custom ASICs from hyperscalers offer specialized inference efficiencies, NVIDIA’s unified CUDA software ecosystem preserves an enduring competitive moat for general frontier training.',
        ],
      },
    ],
  },
  {
    id: 'ai-agents-autonomous',
    slug: 'could-ai-agents-become-too-autonomous',
    title: "Could AI Agents Become Too Autonomous? My Thoughts on the Latest Scares",
    excerpt: "Exploring the recent concerns around autonomous AI agents, what's real, what's exaggerated, and where we should actually be paying attention.",
    coverImage: '/images/ai-robot.jpg',
    category: 'opinions',
    categoryName: 'OPINIONS',
    tags: ['Agents', 'Automation', 'Ethics', 'Tech Culture'],
    author: authorIshara,
    publishedAt: 'Jan 12, 2026',
    readingTime: '7 min read',
    featured: false,
    content: `From loop limits to sandboxing and human-in-the-loop safeguards, here is a practical engineer's perspective on agency fears...`,
    relatedArticleIds: ['gemini-shutdown-debate', 'next-wave-tech-news', 'nvidia-chip-race'],
    sections: [
      {
        id: 'agentic-evolution',
        title: 'The Rise of Agentic Workflows',
        paragraphs: [
          'From simple chatbot prompts to multi-agent swarms that plan, write code, run tests, and deploy software, autonomous execution has captured industry focus. But how much autonomy is actually practical today?',
        ],
      },
      {
        id: 'perceived-vs-real-risks',
        title: 'Perceived vs. Real Risks',
        paragraphs: [
          'The sensational fear of rogue autonomous agents often obscures mundane, critical risks: prompt injection in tool arguments, recursive loop billing spikes, and silent hallucination cascades.',
        ],
        quote: {
          text: '“Safety in agentic systems is primarily an engineering hygiene discipline: deterministic boundaries, clear authorizations, and immutable audit logs.”',
          author: 'Ishara Fernando',
        },
      },
      {
        id: 'engineering-discipline',
        title: 'Engineering Principles for Resilient Agents',
        paragraphs: [
          'Every robust agentic deployment should incorporate circuit breakers, human confirmation checkpoints for destructive actions, and ephemeral sandboxed runtimes.',
        ],
      },
    ],
  },
  {
    id: 'openai-vs-google-ai-battle',
    slug: 'openai-vs-google-ai-battle-getting-personal',
    title: "The OpenAI vs Google AI Battle Is Getting Personal",
    excerpt: "A look at how the rivalry is evolving, what's at stake beyond the products, and why this competition matters for the future of AI.",
    coverImage: '/images/openai-vs-google.jpg',
    category: 'big-tech',
    categoryName: 'BIG TECH',
    tags: ['OpenAI', 'Google', 'Competition', 'LLMs'],
    author: authorIshara,
    publishedAt: 'Jan 2, 2026',
    readingTime: '6 min read',
    featured: false,
    content: `The talent moves, counter-announcements, and product rollouts that have defined the escalating duel between Silicon Valley titans...`,
    relatedArticleIds: ['gemini-shutdown-debate', 'nvidia-chip-race', 'ai-search-web'],
    sections: [
      {
        id: 'the-rivalry-unfolds',
        title: 'The Rivalry Unfolds',
        paragraphs: [
          'What began as a collaborative research community has transformed into high-velocity commercial rivalry. Product announcements and model releases are timed to overshadow opposing developer keynotes.',
        ],
      },
      {
        id: 'distribution-vs-research',
        title: 'Distribution Moats vs. Research Speed',
        paragraphs: [
          'Google commands unmatched global scale across Android, Workspace, and Chrome. OpenAI counters with viral consumer mindshare, developer ecosystem loyalty, and agile iteration velocity.',
        ],
      },
      {
        id: 'what-it-means-for-developers',
        title: 'What It Means for Developers',
        paragraphs: [
          'Intense competition is driving pricing down while token limits and context windows expand. Builders and end-users are the ultimate beneficiaries of this fierce frontier race.',
        ],
      },
    ],
  },
  {
    id: 'ai-search-web',
    slug: 'is-the-web-ready-for-ai-search-to-take-over',
    title: "Is the Web Ready for AI Search to Take Over?",
    excerpt: "Looking at how AI search is changing the web, what challenges remain, and whether we're ready for a new era of information discovery.",
    coverImage: '/images/ai-search-web.jpg',
    category: 'future-tech',
    categoryName: 'FUTURE TECH',
    tags: ['Search', 'AI Search', 'Web', 'Information Discovery'],
    author: authorIshara,
    publishedAt: 'Dec 20, 2026',
    readingTime: '5 min read',
    featured: false,
    content: `As conversational engines replace traditional search result link farms, how web publishers and user behavior adapt...`,
    relatedArticleIds: ['next-wave-tech-news', 'gemini-shutdown-debate', 'openai-vs-google-ai-battle'],
    sections: [
      {
        id: 'search-revolution',
        title: 'The Paradigm Shift in Search',
        paragraphs: [
          'For nearly three decades, search meant typing keywords and scanning blue links. Today, conversational reasoning synthesizes answers directly, fundamentally rewriting user interaction patterns.',
        ],
      },
      {
        id: 'publisher-economics',
        title: 'Publisher Economics & Referral Traffic',
        paragraphs: [
          'When search engines answer questions without requiring a click, the open web’s ad-supported economic model experiences profound strain. Attribution, citations, and content licensing agreements must evolve.',
        ],
      },
      {
        id: 'future-of-discovery',
        title: 'The Future of Information Discovery',
        paragraphs: [
          'High-quality original analysis, primary reporting, and distinctive perspective become more valuable than generic SEO compilations in an era of automated synthesis.',
        ],
      },
    ],
  },
  {
    id: 'next-wave-tech-news',
    slug: 'what-the-next-wave-of-tech-news-says-about-our-future',
    title: "What the Next Wave of Tech News Says About Our Future",
    excerpt: "A roundup of the latest tech developments and what they reveal about where we're headed next.",
    coverImage: '/images/future-tech.jpg',
    category: 'future-tech',
    categoryName: 'FUTURE TECH',
    tags: ['Future Tech', 'Trends', 'Regulation', 'Robotics'],
    author: authorIshara,
    publishedAt: 'Dec 10, 2026',
    readingTime: '4 min read',
    featured: false,
    content: `Synthesizing macroeconomic trends, hardware cycles, and societal adoption patterns as compute abundance approaches...`,
    relatedArticleIds: ['ai-agents-autonomous', 'nvidia-chip-race', 'ai-search-web'],
    sections: [
      {
        id: 'macro-signals',
        title: 'Macro Signals Across Tech',
        paragraphs: [
          'A quiet convergence is taking place between silicon manufacturing, renewable energy investments, and frontier AI research. The next decade will be defined by physical infrastructure scale.',
        ],
      },
      {
        id: 'practical-takeaways',
        title: 'Practical Takeaways for Creators',
        paragraphs: [
          'Focus on enduring first principles: deepen domain expertise, master system-level thinking, and leverage modern tools to multiply your creative output.',
        ],
      },
    ],
  },
];
