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
import { ArticleMetadata } from "../types";
import { articleService, getArticleCoverImage, handleCoverImageError } from "../services/articleService";
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
    slug: "lifestyle",
    name: "Lifestyle",
    description: "Everyday tech, intentional setups, productivity, and modern living.",
    icon: <Sparkles className="w-4 h-4 text-green-600" />,
    image: "/images/nvidia-chip.jpg",
  },
  {
    slug: "development",
    name: "Development",
    description: "Web development, tools, productivity, and things I build.",
    icon: <Code2 className="w-4 h-4 text-purple-600" />,
    image: "/images/xabout-hero.jpg",
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
  const [latestArticles, setLatestArticles] = React.useState<ArticleMetadata[]>([]);

  React.useEffect(() => {
    let isMounted = true;
    articleService.getPublishedArticles().then((articles) => {
      if (isMounted) {
        setLatestArticles(articles.slice(0, 4));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const githubUrl = siteConfig.socials.find((s) => s.platform === "github")?.url || "#";
  const linkedinUrl = siteConfig.socials.find((s) => s.platform === "linkedin")?.url || "#";
  const twitterUrl = siteConfig.socials.find((s) => s.platform === "twitter")?.url || "#";
  const youtubeUrl = siteConfig.socials.find((s) => s.platform === "youtube")?.url || "#";

  return (
    <div className="bg-white dark:bg-[#0D0D0D] min-h-screen" style={{ fontFamily: F.family }}>
      <PageContainer>
        <div className="pt-8 sm:pt-2 pb-4 space-y-14 sm:space-y-16">

          {/* 1. CINEMATIC CREATOR HERO STAGE */}
          <section className="space-y-8">
            {/* Main Visual Stage Canvas */}
            <div className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[650px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800 bg-[#070A10] shadow-2xl shadow-black/40 group">
              
              {/* Background 3D Floating Cards Wall */}
              <img
                src="/images/Futuristic Content Wall with Cinematic Depth.png"
                alt="Tech articles floating in perspective backdrop"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.06]"
              />

              {/* Ambient radial glow behind subject */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 55%, rgba(245, 158, 11, 0.15) 0%, rgba(30, 58, 138, 0.10) 50%, transparent 75%)"
                }}
              />

              {/* Atmospheric Edge & Depth Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-[15]" />

              

              {/* Center Cutout Portrait - Ishara */}
              {/* make this image smaller */}
              <div className="absolute inset-x-0 bottom-10 h-full flex items-end justify-center z-10 pointer-events-none">
                <img
                  src="/images/about-hero.jpg"
                  alt="Ishara Udayanga"
                  className="h-[70%] sm:h-[70%] md:h-[83%] lg:h-[83%] w-auto max-w-none object-contain object-bottom select-none filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] drop-shadow-[0_0_60px_rgba(245,158,11,0.14)]"
                />
              </div>

              {/* Bottom Bold Headline Banner - YouTube Creator Style */}
              <div className="absolute bottom-5 sm:bottom-8 left-0 right-0 z-20 flex flex-col items-center text-center px-4">
                <div className="flex items-center gap-2 sm:gap-3.5 flex-wrap justify-center drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
                  <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    Hi, I'm
                  </span>
                  <span className="inline-block bg-[#FACC15] text-gray-950 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight px-3 sm:px-5 py-0.5 sm:py-1 rounded-xl shadow-[0_10px_35px_rgba(250,204,21,0.45)] uppercase transform -rotate-1 hover:rotate-0 transition-transform duration-200">
                    Ishara
                  </span>
                </div>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-200 font-medium max-w-xl text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-2">
                  Exploring technology, ideas, and what's next.
                </p>
              </div>
            </div>

            {/* Intro Details & Actions Row Below Hero Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              <div className="lg:col-span-8 space-y-5">
                <span className="block text-[10px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500 font-semibold">
                  About Ishara
                </span>
                <p className="text-[15px] sm:text-[16px] text-gray-600 dark:text-gray-300 font-normal leading-relaxed max-w-2xl">
                  I write about AI, hardware architectures, modern development, and digital culture —
                  sharing what I learn, build, and explore along the way. This is a space
                  for curious minds who care about technology and a better future.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-950 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-950 text-[13px] font-medium transition-all shadow-sm"
                  >
                    <span>Read latest articles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={siteConfig.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-[#141414] text-gray-700 dark:text-gray-300 text-[13px] font-medium transition-all"
                  >
                    <span>View portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                  </a>
                </div>
              </div>

              {/* Social Connections Column */}
              <div className="lg:col-span-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#141414] space-y-3.5">
                <span className="block text-[10px] uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 font-semibold">
                  Connect & Follow
                </span>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 flex items-center justify-center hover:text-black dark:hover:text-white hover:border-gray-400 transition-all shadow-xs"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 flex items-center justify-center hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all shadow-xs"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 flex items-center justify-center hover:text-black dark:hover:text-white hover:border-gray-400 transition-all shadow-xs"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 flex items-center justify-center hover:text-red-600 dark:hover:text-red-400 hover:border-red-400 transition-all shadow-xs"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:hello@ishara.live"
                    aria-label="Email"
                    className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 flex items-center justify-center hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 transition-all shadow-xs"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
                  Open for tech writing, collaborations, and discussions on future tech.
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
                  to="/blogs"
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
                to="/blogs"
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
                      src={getArticleCoverImage(article)}
                      alt={article.title}
                      loading="lazy"
                      onError={(e) => handleCoverImageError(e, article.category)}
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
                to="/blogs"
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
