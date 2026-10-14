import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  MapPin,
  Laptop,
  BookOpen,
  FlaskConical,
  Sparkles,
  Cpu,
  Building2,
  MessageSquare,
  TrendingUp,
  Code2,
  Youtube,
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { siteConfig } from "../config/site";
import { mockArticles } from "../data/mockArticles";
import { F } from "../styles/theme";

const XIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const topics = [
  {
    slug: "ai-news",
    name: "AI News & Trends",
    description: "Latest developments in AI, from model releases to real-world impacts.",
    icon: <Sparkles className="w-4 h-4 text-blue-500" />,
    image: "/images/gemini-hero.jpg",
  },
  {
    slug: "chips",
    name: "Chips & Hardware",
    description: "The race for faster, smarter hardware powering the AI era.",
    icon: <Cpu className="w-4 h-4 text-green-600" />,
    image: "/images/nvidia-chip.jpg",
  },
  {
    slug: "development",
    name: "Development",
    description: "Web development, tools, productivity, and things I build.",
    icon: <Code2 className="w-4 h-4 text-purple-600" />,
    image: "/images/about-hero.jpg",
  },
  {
    slug: "big-tech",
    name: "Big Tech",
    description: "What the biggest tech companies are building and where they're headed.",
    icon: <Building2 className="w-4 h-4 text-orange-500" />,
    image: "/images/openai-vs-google.jpg",
  },
  {
    slug: "future-tech",
    name: "Future Technology",
    description: "Exploring what's next — from AI agents to a more connected world.",
    icon: <TrendingUp className="w-4 h-4 text-rose-500" />,
    image: "/images/future-tech.jpg",
  },
  {
    slug: "opinions",
    name: "Opinions & Insights",
    description: "My take on technology, productivity, and the bigger picture.",
    icon: <MessageSquare className="w-4 h-4 text-indigo-500" />,
    image: "/images/ai-robot.jpg",
  },
];

const traits = [
  {
    icon: <Laptop className="w-5 h-5 text-gray-600" />,
    title: "Developer & Designer",
    description: "I love building digital products, exploring new tools, and turning ideas into reality.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-gray-600" />,
    title: "Learning in Public",
    description: "I document what I learn, share my thoughts, and believe in open, honest conversations.",
  },
  {
    icon: <FlaskConical className="w-5 h-5 text-gray-600" />,
    title: "Building Experiments",
    description: "I enjoy side projects, experimenting with new technologies, and exploring creative ideas.",
  },
  {
    icon: <MapPin className="w-5 h-5 text-gray-600" />,
    title: "Based in Sri Lanka",
    description: "A remote creator, part of the global tech community, always excited about what's next.",
  },
];

const stackItems = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "Git", icon: "🔀" },
  { name: "VS Code", icon: "💻" },
  { name: "Figma", icon: "🎨" },
];

export const AboutPage: React.FC = () => {
  const latestArticles = mockArticles.slice(0, 4);
  const githubUrl = siteConfig.socials.find((s) => s.platform === "github")?.url || "#";
  const linkedinUrl = siteConfig.socials.find((s) => s.platform === "linkedin")?.url || "#";
  const twitterUrl = siteConfig.socials.find((s) => s.platform === "twitter")?.url || "#";
  const youtubeUrl = siteConfig.socials.find((s) => s.platform === "youtube")?.url || "#";

  return (
    <div className="bg-white dark:bg-[#0D0D0D] min-h-screen" style={{ fontFamily: F.family }}>
      <PageContainer>
        <div className="pt-8 sm:pt-10 pb-4 space-y-14 sm:space-y-16">

          {/* 1. HERO */}
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 font-medium mb-5">
                About
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-[44px] font-semibold text-gray-950 dark:text-gray-100 leading-[1.12] tracking-[-0.04em] mb-5">
                Hi, I'm Ishara —{" "}
                <span className="text-gray-400 dark:text-gray-500 font-light">
                  exploring technology, ideas, and what's next.
                </span>
              </h1>
              <p className="text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 font-normal leading-relaxed max-w-[500px] mb-7">
                I write about AI, development, product thinking, and digital culture —
                sharing what I learn, build, and explore along the way. This is a space
                for curious minds who care about technology and a better future.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Link
                  to="/journal"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gray-950 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-950 text-[12px] font-medium transition-all shadow-sm"
                >
                  Read latest posts
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={siteConfig.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-[#141414] text-gray-700 dark:text-gray-300 text-[12px] font-medium transition-all"
                >
                  View portfolio
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-black dark:hover:text-white transition-colors">
                  <Github className="w-[18px] h-[18px]" />
                </a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-black dark:hover:text-white transition-colors">
                  <Linkedin className="w-[18px] h-[18px]" />
                </a>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:text-black dark:hover:text-white transition-colors">
                  <XIcon className="w-[17px] h-[17px]" />
                </a>
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  <Youtube className="w-[18px] h-[18px]" />
                </a>
                <a href="mailto:hello@ishara.live" aria-label="Email" className="hover:text-black dark:hover:text-white transition-colors">
                  <Mail className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <img
                  src="/images/about-hero.jpg"
                  alt="Ishara working at a developer setup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
              </div>
              <div className="absolute -top-3 -right-3 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 px-3.5 py-2.5 max-w-[160px]">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px]">🚀</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                    Always learning, always building.
                  </span>
                </div>
                <p className="text-[9px] text-gray-400 dark:text-gray-400 font-normal leading-snug pl-5">
                  Ideas today. A better tomorrow.
                </p>
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 px-3.5 py-2.5 max-w-[200px] flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <p className="text-[10px] font-medium text-gray-800 dark:text-gray-200 leading-snug">
                  Building a calmer,<br />more intentional tech life.
                </p>
              </div>
            </div>
          </section>

          {/* 2. TOPICS */}
          <section>
            <div className="mb-6">
              <span className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 font-medium mb-2">
                Topics
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-semibold text-gray-950 dark:text-gray-100 tracking-tight leading-tight">
                What I write about
              </h2>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 font-normal mt-1.5">
                A mix of news, analysis, tutorials, and personal thoughts on the technologies shaping our world.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  to="/journal"
                  className="group flex gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800/80 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-[#141414] hover:shadow-sm transition-all"
                >
                  <div className="w-[110px] h-[78px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-900">
                    <img
                      src={topic.image}
                      alt={topic.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="flex-shrink-0">{topic.icon}</span>
                      <span className="text-[12px] font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {topic.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-400 font-normal leading-snug line-clamp-3">
                      {topic.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 3. MORE ABOUT ME */}
          <section className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-[#141414] p-7 sm:p-9">
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-gray-950 dark:text-gray-100 tracking-tight mb-1.5">
              A little more about me
            </h2>
            <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 font-normal mb-8 leading-relaxed max-w-lg">
              I'm a <span className="font-medium text-gray-800 dark:text-gray-200">developer</span>, designer, and lifelong learner who enjoys exploring the intersection of
              technology, creativity, and human potential.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {traits.map((trait) => (
                <div key={trait.title}>
                  <div className="mb-2 text-gray-600 dark:text-gray-300">{trait.icon}</div>
                  <h3 className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 mb-1">{trait.title}</h3>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 font-normal leading-relaxed">{trait.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. TECH STACK */}
          <section>
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-gray-950 dark:text-gray-100 tracking-tight">
                  My stack
                </h2>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 font-normal mt-1">
                  Tools and technologies I use and enjoy working with.
                </p>
              </div>
              <a
                href={siteConfig.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[12px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors"
              >
                View full tech stack
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {stackItems.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-[#141414] hover:shadow-sm transition-all cursor-default"
                  style={{ minWidth: "72px" }}
                >
                  <span className="text-xl leading-none">{item.icon}</span>
                  <span className="text-[11px] text-gray-600 dark:text-gray-300 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. QUOTE BANNER */}
          <section className="relative rounded-2xl overflow-hidden">
            <img
              src="/images/about-quote-bg.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/65" />
            <div className="relative z-10 px-8 py-12 sm:px-14 sm:py-16 max-w-2xl">
              <blockquote>
                <p
                  className="text-white text-[22px] sm:text-[28px] font-light leading-snug tracking-[-0.02em] mb-4"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                >
                  "A better internet starts with curious people who keep learning and building."
                </p>
                <footer className="text-white/70 text-[13px] font-normal">
                  — Ishara Udayaga
                </footer>
              </blockquote>
            </div>
          </section>

          {/* 6. LATEST ARTICLES */}
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-gray-950 dark:text-gray-100 tracking-tight">
                  Latest Articles
                </h2>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 font-normal mt-1">
                  A few recent posts from the journal.
                </p>
              </div>
              <Link
                to="/journal"
                className="hidden sm:inline-flex items-center gap-1 text-[12px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors"
              >
                View all posts
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {latestArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="group flex flex-col"
                >
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-3 flex-shrink-0">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-[3px] text-[8px] font-semibold uppercase tracking-[0.06em] text-gray-500 dark:text-gray-400 mb-1.5 self-start">
                    {article.categoryName}
                  </span>
                  <h3 className="text-[13px] font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-500 dark:group-hover:text-gray-400 leading-snug tracking-tight transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 font-normal mt-auto">
                    {article.publishedAt} · {article.readingTime}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-5 sm:hidden">
              <Link
                to="/journal"
                className="inline-flex items-center gap-1 text-[12px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors"
              >
                View all posts <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

        </div>
      </PageContainer>
    </div>
  );
};

export default AboutPage;
