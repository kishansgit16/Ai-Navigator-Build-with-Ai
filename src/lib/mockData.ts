export interface AIModel {
  id: string;
  name: string;
  provider: string;
  performanceScore: number;
  costInputPerM: number;
  costOutputPerM: number;
  contextWindow: number;
  reasoningScore: number;
  codingScore: number;
  visionScore: number;
  mathScore: number;
  speedTokensPerSec: number;
  multimodalSupport: string[];
  releaseDate: string;
  description: string;
  logo: string;
  popularityTrend: number[]; // monthly popularity score 0-100
  releaseHistory: { version: string; date: string; changes: string }[];
}

export interface AITool {
  id: string;
  name: string;
  category: string;
  rating: number;
  popularityTrend: number[];
  pricingType: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  pricingDetail: string;
  bestUseCase: string;
  alternatives: string[];
  websiteUrl: string;
  description: string;
  logo: string;
}

export interface AgentFramework {
  id: string;
  name: string;
  githubStars: number;
  githubStarsGrowth: number[]; // last 6 months stars
  adoptionRate: number; // 0-100
  communityActivity: number; // 0-100
  codingPerformance: number; // 0-100
  autonomyScore: number; // 0-100
  mcpSupport: boolean;
  description: string;
  logo: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Model Release' | 'Announcement' | 'Funding' | 'Open Source';
  source: string;
  publishedAt: string;
  readTime: string;
}

export interface EcosystemNode {
  id: string;
  label: string;
  type: 'model' | 'framework' | 'agent' | 'application' | 'industry';
  details?: string;
}

export interface EcosystemLink {
  source: string;
  target: string;
  type?: string;
}

export const MOCK_MODELS: AIModel[] = [
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    performanceScore: 92,
    costInputPerM: 1.25,
    costOutputPerM: 5.00,
    contextWindow: 2000000,
    reasoningScore: 90,
    codingScore: 89,
    visionScore: 95,
    mathScore: 88,
    speedTokensPerSec: 75,
    multimodalSupport: ["text", "image", "audio", "video", "pdf"],
    releaseDate: "2024-05-14",
    description: "Google's premium multimodal model, featuring an industry-leading 2-million token context window and native multi-modal capabilities including audio and video understanding.",
    logo: "G",
    popularityTrend: [60, 65, 72, 78, 85, 92],
    releaseHistory: [
      { version: "1.5 Pro (experimental)", date: "2024-02-15", changes: "Initial release with 1M context window." },
      { version: "1.5 Pro (production)", date: "2024-05-14", changes: "Extended context window to 2M tokens. Improved code generation and multimodal quality." },
      { version: "1.5 Pro 002", date: "2024-09-24", changes: "Significant reduction in latency and cost. 2x speedup in token generation." }
    ]
  },
  {
    id: "gemini-1-5-flash",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    performanceScore: 85,
    costInputPerM: 0.075,
    costOutputPerM: 0.30,
    contextWindow: 1000000,
    reasoningScore: 78,
    codingScore: 80,
    visionScore: 88,
    mathScore: 82,
    speedTokensPerSec: 140,
    multimodalSupport: ["text", "image", "audio", "video", "pdf"],
    releaseDate: "2024-05-14",
    description: "A lightweight, fast, and highly cost-efficient model designed for high-frequency tasks at scale, while still offering a massive 1-million token context window.",
    logo: "G",
    popularityTrend: [50, 58, 68, 75, 82, 88],
    releaseHistory: [
      { version: "1.5 Flash (production)", date: "2024-05-14", changes: "Initial release. Optimized for speed and cost efficiency." },
      { version: "1.5 Flash 002", date: "2024-09-24", changes: "Lower latency, 50% cost cut, and quality boost in coding." }
    ]
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    performanceScore: 95,
    costInputPerM: 3.00,
    costOutputPerM: 15.00,
    contextWindow: 200000,
    reasoningScore: 96,
    codingScore: 95,
    visionScore: 92,
    mathScore: 90,
    speedTokensPerSec: 80,
    multimodalSupport: ["text", "image"],
    releaseDate: "2024-06-20",
    description: "Anthropic's state-of-the-art model. Sets new industry benchmarks for graduate-level reasoning, undergraduate-level knowledge, and coding proficiency.",
    logo: "A",
    popularityTrend: [70, 78, 88, 93, 97, 98],
    releaseHistory: [
      { version: "3.5 Sonnet (v1)", date: "2024-06-20", changes: "Initial release, surpassing Claude 3 Opus in speed and intelligence." },
      { version: "3.5 Sonnet (v2)", date: "2024-10-22", changes: "Upgraded performance in coding, tool use, and reasoning. Released computer-use capabilities." }
    ]
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    performanceScore: 93,
    costInputPerM: 2.50,
    costOutputPerM: 10.00,
    contextWindow: 128000,
    reasoningScore: 91,
    codingScore: 88,
    visionScore: 93,
    mathScore: 89,
    speedTokensPerSec: 90,
    multimodalSupport: ["text", "image", "audio"],
    releaseDate: "2024-05-13",
    description: "OpenAI's flagship multimodal model. Integrates voice, vision, and text processing in real-time, delivering high speed and efficiency.",
    logo: "O",
    popularityTrend: [85, 88, 90, 92, 94, 93],
    releaseHistory: [
      { version: "GPT-4o (initial)", date: "2024-05-13", changes: "Omni model release. Real-time vision and audio processing capability." },
      { version: "GPT-4o-2024-08-06", date: "2024-08-06", changes: "Improved structured outputs support (JSON schema strict mode)." }
    ]
  },
  {
    id: "gpt-4-o1",
    name: "o1 Pro / o1",
    provider: "OpenAI",
    performanceScore: 97,
    costInputPerM: 15.00,
    costOutputPerM: 60.00,
    contextWindow: 200000,
    reasoningScore: 99,
    codingScore: 96,
    visionScore: 88,
    mathScore: 98,
    speedTokensPerSec: 25,
    multimodalSupport: ["text", "image"],
    releaseDate: "2024-09-12",
    description: "OpenAI's reasoning-focused series. Employs reinforcement learning to think before responding, achieving human-expert level scores in math, science, and coding.",
    logo: "O",
    popularityTrend: [30, 45, 65, 80, 89, 94],
    releaseHistory: [
      { version: "o1-preview", date: "2024-09-12", changes: "First reasoning-focused preview release along with o1-mini." },
      { version: "o1 (full)", date: "2024-12-05", changes: "Production-ready o1 model with image understanding, faster reasoning, and higher consistency." }
    ]
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    performanceScore: 91,
    costInputPerM: 0.14,
    costOutputPerM: 0.28,
    contextWindow: 128000,
    reasoningScore: 92,
    codingScore: 92,
    visionScore: 80,
    mathScore: 91,
    speedTokensPerSec: 60,
    multimodalSupport: ["text"],
    releaseDate: "2024-12-26",
    description: "A massive open-source Mixture-of-Experts (MoE) model featuring 671B parameters. Competes directly with closed models at a fraction of the API pricing.",
    logo: "D",
    popularityTrend: [10, 25, 45, 70, 88, 96],
    releaseHistory: [
      { version: "V3", date: "2024-12-26", changes: "Initial release. State-of-the-art open source MoE architecture." }
    ]
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    performanceScore: 96,
    costInputPerM: 0.55,
    costOutputPerM: 2.19,
    contextWindow: 128000,
    reasoningScore: 98,
    codingScore: 94,
    visionScore: 75,
    mathScore: 97,
    speedTokensPerSec: 20,
    multimodalSupport: ["text"],
    releaseDate: "2025-01-20",
    description: "DeepSeek's advanced reasoning model utilizing chain-of-thought processing. Matches OpenAI o1 performance in mathematics, physics, and coding benchmarks under open-source licenses.",
    logo: "D",
    popularityTrend: [0, 0, 30, 60, 85, 98],
    releaseHistory: [
      { version: "R1", date: "2025-01-20", changes: "Initial release with open weight models including distilled versions from Llama and Qwen." }
    ]
  },
  {
    id: "llama-3-1-405b",
    name: "Llama 3.1 405B",
    provider: "Meta",
    performanceScore: 89,
    costInputPerM: 2.66,
    costOutputPerM: 3.50,
    contextWindow: 128000,
    reasoningScore: 85,
    codingScore: 86,
    visionScore: 70,
    mathScore: 84,
    speedTokensPerSec: 35,
    multimodalSupport: ["text"],
    releaseDate: "2024-07-23",
    description: "Meta's flagship open-weights model, serving as a blueprint for developers to fine-tune, distill, and host their own state-of-the-art LLMs.",
    logo: "M",
    popularityTrend: [75, 78, 80, 81, 79, 78],
    releaseHistory: [
      { version: "Llama 3.1 405B", date: "2024-07-23", changes: "First open-weights model of this scale, supporting multilingual and 128K context window." }
    ]
  },
  {
    id: "llama-3-2-90b-vision",
    name: "Llama 3.2 90B Vision",
    provider: "Meta",
    performanceScore: 84,
    costInputPerM: 0.90,
    costOutputPerM: 1.25,
    contextWindow: 128000,
    reasoningScore: 78,
    codingScore: 74,
    visionScore: 88,
    mathScore: 72,
    speedTokensPerSec: 65,
    multimodalSupport: ["text", "image"],
    releaseDate: "2024-09-25",
    description: "Meta's open-weights vision model, supporting image reasoning, charts, document parsing, and visual QA.",
    logo: "M",
    popularityTrend: [40, 52, 60, 68, 71, 74],
    releaseHistory: [
      { version: "Llama 3.2 Vision", date: "2024-09-25", changes: "Vision capabilities integration for the Llama family." }
    ]
  },
  {
    id: "grok-2-beta",
    name: "Grok 2",
    provider: "xAI",
    performanceScore: 88,
    costInputPerM: 2.00,
    costOutputPerM: 10.00,
    contextWindow: 128000,
    reasoningScore: 85,
    codingScore: 84,
    visionScore: 85,
    mathScore: 82,
    speedTokensPerSec: 55,
    multimodalSupport: ["text", "image"],
    releaseDate: "2024-08-13",
    description: "xAI's updated model integrated with X.com real-time news data, offering improved coding, reasoning, and image generation integration via Flux.",
    logo: "X",
    popularityTrend: [45, 55, 62, 70, 72, 75],
    releaseHistory: [
      { version: "Grok 2 Beta", date: "2024-08-13", changes: "Massive improvements in reasoning, vision, and real-time social feed integration." }
    ]
  }
];

export const MOCK_TOOLS: AITool[] = [
  {
    id: "cursor",
    name: "Cursor",
    category: "Coding",
    rating: 4.8,
    popularityTrend: [60, 68, 78, 87, 94, 98],
    pricingType: "Freemium",
    pricingDetail: "$20/month for Pro unlimited",
    bestUseCase: "AI-first code editor with codebase indexing, inline edits, and composer capabilities.",
    alternatives: ["VS Code Copilot", "Windsurf", "Replit Agent"],
    websiteUrl: "https://cursor.com",
    description: "An AI-powered fork of VS Code designed to help you write code faster. It scans your entire codebase, suggests edits, and autocompletes lines using advanced AI.",
    logo: "💻"
  },
  {
    id: "v0-dev",
    name: "v0 by Vercel",
    category: "Coding",
    rating: 4.7,
    popularityTrend: [50, 62, 75, 84, 91, 95],
    pricingType: "Freemium",
    pricingDetail: "Free plan available, Pro at $20/month",
    bestUseCase: "Generative UI builder creating modern React, Tailwind CSS, and HTML components from prompts.",
    alternatives: ["Bolt.new", "Lovable.dev", "Claude Artifacts"],
    websiteUrl: "https://v0.dev",
    description: "A generative UI system by Vercel that makes frontend development accessible. Type a prompt, receive copy-paste ready UI components, and chat with AI to refine them.",
    logo: "⚡"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "Image Generation",
    rating: 4.9,
    popularityTrend: [92, 90, 89, 91, 93, 94],
    pricingType: "Paid",
    pricingDetail: "Plans start from $10/month",
    bestUseCase: "Artistic, highly detailed, photorealistic digital artwork and asset creation.",
    alternatives: ["Stable Diffusion", "DALL-E 3", "Flux.1"],
    websiteUrl: "https://midjourney.com",
    description: "An independent research lab exploring new mediums of thought. Its text-to-image generator yields state-of-the-art cinematic and illustrative visuals.",
    logo: "🎨"
  },
  {
    id: "flux-1",
    name: "Flux.1 by Black Forest Labs",
    category: "Image Generation",
    rating: 4.8,
    popularityTrend: [0, 0, 50, 75, 88, 93],
    pricingType: "Open Source",
    pricingDetail: "Apache 2.0 (Schnell), paid api for Pro",
    bestUseCase: "State-of-the-art open source image generation with perfect text rendering and prompt compliance.",
    alternatives: ["Stable Diffusion 3", "Midjourney"],
    websiteUrl: "https://blackforestlabs.ai",
    description: "A highly advanced text-to-image model series developed by the original creators of Stable Diffusion, featuring incredible prompt adherence and text generation inside images.",
    logo: "🔮"
  },
  {
    id: "sora",
    name: "Sora by OpenAI",
    category: "Video Generation",
    rating: 4.6,
    popularityTrend: [85, 80, 78, 77, 82, 89],
    pricingType: "Paid",
    pricingDetail: "Pricing within OpenAI account tiers",
    bestUseCase: "Creating high-fidelity, photorealistic 60-second video clips from textual descriptions.",
    alternatives: ["Runway Gen-3", "Luma Dream Machine", "Kling AI"],
    websiteUrl: "https://openai.com/sora",
    description: "OpenAI's text-to-video AI model. Sora can generate videos up to a minute long while maintaining visual quality and adherence to the user's prompt.",
    logo: "🎬"
  },
  {
    id: "runway-gen3",
    name: "Runway Gen-3 Alpha",
    category: "Video Generation",
    rating: 4.7,
    popularityTrend: [40, 55, 70, 82, 88, 92],
    pricingType: "Paid",
    pricingDetail: "Starts from $12/month",
    bestUseCase: "Professional-grade cinematic B-roll, camera movement control, and video-to-video editing.",
    alternatives: ["Sora", "Pika 2.0", "Luma Dream Machine"],
    websiteUrl: "https://runwayml.com",
    description: "A new frontier for video generation, offering major improvements in fidelity, consistency, motion dynamics, and complex character animation.",
    logo: "🎥"
  },
  {
    id: "phind",
    name: "Phind",
    category: "Research",
    rating: 4.6,
    popularityTrend: [75, 76, 78, 79, 81, 82],
    pricingType: "Freemium",
    pricingDetail: "Free basic search, $20/month Pro",
    bestUseCase: "Developer search engine providing instant answers, code samples, and web-sourced explanations.",
    alternatives: ["Perplexity Pro", "Kapa.ai", "Gemini Advanced"],
    websiteUrl: "https://phind.com",
    description: "An AI search engine geared towards developers. It gathers web search results and synthesizes them with code guides, API docs, and step-by-step solutions.",
    logo: "🔎"
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    category: "Research",
    rating: 4.8,
    popularityTrend: [80, 84, 88, 92, 95, 97],
    pricingType: "Freemium",
    pricingDetail: "Free plan, $20/month for Pro (Claude/GPT access)",
    bestUseCase: "Conversational answer engine summarizing web information with inline source citations.",
    alternatives: ["Phind", "Genspark", "Google Search GPT"],
    websiteUrl: "https://perplexity.ai",
    description: "Perplexity unlocks the power of knowledge by information discovery and sharing. It acts as an interactive search assistant, citing articles and checking facts.",
    logo: "🌐"
  },
  {
    id: "langgraph",
    name: "LangGraph",
    category: "Agent Frameworks",
    rating: 4.7,
    popularityTrend: [30, 48, 62, 75, 84, 91],
    pricingType: "Open Source",
    pricingDetail: "Free MIT license, commercial cloud hosting",
    bestUseCase: "Building complex stateful multi-agent systems with cyclical agent graphs and human-in-the-loop steps.",
    alternatives: ["CrewAI", "AutoGen", "LlamaIndex Workflows"],
    websiteUrl: "https://langchain-ai.github.io/langgraph/",
    description: "A library for building stateful, multi-actor applications with LLMs. It enables cyclical graphs crucial for complex agent loops, branching, and memory control.",
    logo: "🕸️"
  },
  {
    id: "crewai",
    name: "CrewAI",
    category: "Agent Frameworks",
    rating: 4.6,
    popularityTrend: [45, 58, 68, 79, 85, 89],
    pricingType: "Open Source",
    pricingDetail: "Free open source, Enterprise cloud platforms",
    bestUseCase: "Orchestrating role-playing autonomous agents that collaborate to execute complex operational workflows.",
    alternatives: ["LangGraph", "AutoGen", "Agency Swarm"],
    websiteUrl: "https://crewai.com",
    description: "A framework for orchestrating collaborative AI agents. By assigning roles, goals, and tools, agents work in teams to solve problems sequentially or hierarchically.",
    logo: "🚢"
  }
];

export const MOCK_AGENTS: AgentFramework[] = [
  {
    id: "crewai",
    name: "CrewAI",
    githubStars: 19800,
    githubStarsGrowth: [10000, 12000, 14200, 16500, 18200, 19800],
    adoptionRate: 85,
    communityActivity: 92,
    codingPerformance: 78,
    autonomyScore: 82,
    mcpSupport: false,
    description: "Assign roles, backstories, and goals to crews of agents. Best for structured, task-driven workflows like content writing, marketing campaigns, and data pipeline tasks.",
    logo: "🚢"
  },
  {
    id: "langgraph",
    name: "LangGraph",
    githubStars: 6200,
    githubStarsGrowth: [1200, 2200, 3500, 4400, 5200, 6200],
    adoptionRate: 90,
    communityActivity: 89,
    codingPerformance: 88,
    autonomyScore: 92,
    mcpSupport: true,
    description: "Provides absolute control over cycles and state. Best for production-level software development, debugging loops, and customer service routing requiring human-in-the-loop approval.",
    logo: "🕸️"
  },
  {
    id: "autogen",
    name: "AutoGen",
    githubStars: 32000,
    githubStarsGrowth: [24000, 26000, 28000, 29500, 31000, 32000],
    adoptionRate: 75,
    communityActivity: 85,
    codingPerformance: 82,
    autonomyScore: 88,
    mcpSupport: false,
    description: "Microsoft's pioneering multi-agent framework. Supports customizable agents that can solve tasks through conversational chat, code generation, and automated execution loops.",
    logo: "🤖"
  },
  {
    id: "openai-agents",
    name: "OpenAI Assistants API",
    githubStars: 0, // Proprietary
    githubStarsGrowth: [0, 0, 0, 0, 0, 0],
    adoptionRate: 88,
    communityActivity: 95,
    codingPerformance: 90,
    autonomyScore: 75,
    mcpSupport: false,
    description: "Built-in hosting for threads, code interpreter, file search, and function calling. Simplifies agent creation inside the OpenAI ecosystem without hosting orchestration infrastructure.",
    logo: "O"
  },
  {
    id: "google-adk",
    name: "Google ADK",
    githubStars: 1500,
    githubStarsGrowth: [200, 500, 800, 1100, 1300, 1500],
    adoptionRate: 65,
    communityActivity: 72,
    codingPerformance: 85,
    autonomyScore: 80,
    mcpSupport: true,
    description: "Google's Agent Development Kit, optimizing agents to run on Gemini's large context and structured tool calling with native access to vertex and workspace integrations.",
    logo: "G"
  },
  {
    id: "claude-mcp",
    name: "Claude MCP Ecosystem",
    githubStars: 8900,
    githubStarsGrowth: [0, 1500, 3500, 5800, 7500, 8900],
    adoptionRate: 92,
    communityActivity: 97,
    codingPerformance: 92,
    autonomyScore: 85,
    mcpSupport: true,
    description: "Model Context Protocol. Standardizes connections between AI models and local or remote data sources, giving models context and tools out-of-the-box via open servers.",
    logo: "A"
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "DeepSeek Releases R1 Reasoning Model Matching o1 Benchmarks",
    summary: "DeepSeek has launched DeepSeek-R1, an open-weights reasoning model using reinforcement learning and chain of thought. In MATH, AIME, and Codeforces, it scores on par with closed models like o1 while pricing APIs at a 90% discount.",
    category: "Model Release",
    source: "DeepSeek Official Blog",
    publishedAt: "2025-01-20T10:00:00Z",
    readTime: "3 min read"
  },
  {
    id: "news-2",
    title: "Google Extends Gemini 1.5 Pro Context Window to 2 Million Tokens",
    summary: "Google Cloud announces general availability of Gemini 1.5 Pro with a native 2M context window. Developers can now analyze entire code repositories, hours of audio/video, or hundreds of documents in a single API call.",
    category: "Announcement",
    source: "Google Workspace",
    publishedAt: "2024-09-24T14:30:00Z",
    readTime: "4 min read"
  },
  {
    id: "news-3",
    title: "Anthropic Releases Model Context Protocol (MCP) to Standardize AI Integrations",
    summary: "Anthropic introduces MCP, an open-source protocol allowing LLMs to securely connect with IDEs, databases, web tools, and local terminal environments. The repository has quickly surged past 8,000 GitHub stars.",
    category: "Open Source",
    source: "Anthropic Research",
    publishedAt: "2024-11-25T09:00:00Z",
    readTime: "5 min read"
  },
  {
    id: "news-4",
    title: "OpenAI Launches o1 Series with Active Reinforcement Learning Reasoning",
    summary: "OpenAI introduces o1-preview and o1-mini. The model reasons through complex problems, outputs its inner chain of thought, and performs exceptionally well on high school physics olympiads and programming contests.",
    category: "Model Release",
    source: "OpenAI Newsroom",
    publishedAt: "2024-09-12T16:00:00Z",
    readTime: "6 min read"
  },
  {
    id: "news-5",
    title: "Black Forest Labs Secures $31M Funding, Releases FLUX.1 Image Models",
    summary: "Led by former Stable Diffusion researchers, Black Forest Labs raises $31M and launches FLUX.1 - an open-weights text-to-image generator that dominates prompt adherence, image realism, and text placement inside images.",
    category: "Funding",
    source: "TechCrunch",
    publishedAt: "2024-08-01T11:00:00Z",
    readTime: "3 min read"
  }
];

export const MOCK_ECOSYSTEM_NODES: EcosystemNode[] = [
  // Models
  { id: "gemini", label: "Gemini Models", type: "model", details: "Native multimodal LLM series (Google)" },
  { id: "claude", label: "Claude Models", type: "model", details: "State-of-the-art reasoning LLMs (Anthropic)" },
  { id: "gpt", label: "GPT Models", type: "model", details: "Industry standard foundation LLMs (OpenAI)" },
  { id: "llama", label: "Llama Models", type: "model", details: "Open-source foundation LLMs (Meta)" },
  { id: "deepseek", label: "DeepSeek Models", type: "model", details: "Ultra low cost open weights models (DeepSeek)" },

  // Frameworks
  { id: "langchain", label: "LangChain / LangGraph", type: "framework", details: "Stateful orchestration library for agents" },
  { id: "llamaindex", label: "LlamaIndex", type: "framework", details: "Data framework for linking LLMs with private data (RAG)" },
  { id: "mcp", label: "Model Context Protocol (MCP)", type: "framework", details: "Standardized tool & server connection protocol" },

  // Agents
  { id: "crewai", label: "CrewAI", type: "agent", details: "Role-playing agent team framework" },
  { id: "autogen", label: "Microsoft AutoGen", type: "agent", details: "Conversational multi-agent framework" },
  { id: "google-adk", label: "Google ADK", type: "agent", details: "Gemini-native SDK for structured agent setups" },

  // Applications
  { id: "cursor", label: "Cursor IDE", type: "application", details: "AI code editor with project index" },
  { id: "v0", label: "Vercel v0", type: "application", details: "Generative frontend design and deployment" },
  { id: "perplexity", label: "Perplexity Search", type: "application", details: "Interactive AI web search" },
  { id: "bolt-new", label: "Bolt.new", type: "application", details: "Full-stack sandbox environment generator" },

  // Industries
  { id: "software-dev", label: "Software Engineering", type: "industry", details: "Automated coding, agent debugging" },
  { id: "data-analytics", label: "Data & Research", type: "industry", details: "Scientific search, market surveys" },
  { id: "design-creative", label: "Creative & Design", type: "industry", details: "UI assets, cinematic animations" }
];

export const MOCK_ECOSYSTEM_LINKS: EcosystemLink[] = [
  // Models to Frameworks
  { source: "gemini", target: "mcp" },
  { source: "gemini", target: "langchain" },
  { source: "gemini", target: "llamaindex" },
  { source: "claude", target: "mcp" },
  { source: "claude", target: "langchain" },
  { source: "gpt", target: "langchain" },
  { source: "gpt", target: "llamaindex" },
  { source: "llama", target: "langchain" },
  { source: "deepseek", target: "langchain" },

  // Frameworks to Agents
  { source: "mcp", target: "google-adk" },
  { source: "mcp", target: "crewai" },
  { source: "langchain", target: "crewai" },
  { source: "langchain", target: "autogen" },
  { source: "llamaindex", target: "crewai" },

  // Agents to Applications
  { source: "crewai", target: "cursor" },
  { source: "crewai", target: "bolt-new" },
  { source: "google-adk", target: "v0" },

  // Models directly to Applications
  { source: "claude", target: "cursor" },
  { source: "claude", target: "v0" },
  { source: "gpt", target: "perplexity" },
  { source: "deepseek", target: "cursor" },

  // Applications to Industries
  { source: "cursor", target: "software-dev" },
  { source: "bolt-new", target: "software-dev" },
  { source: "v0", target: "design-creative" },
  { source: "perplexity", target: "data-analytics" }
];

export interface RoadmapItem {
  week: string;
  title: string;
  description: string;
  toolRecommendations: string[];
}

export function generateRoadmap(goal: string, level: string, industry: string, budget: string): RoadmapItem[] {
  // Simple deterministic generator
  const isBeginner = level.toLowerCase() === 'beginner';
  const isFree = budget.toLowerCase() === 'free' || budget.toLowerCase() === 'low';
  
  if (goal.includes('SaaS') || goal.includes('saas') || goal.includes('app')) {
    return [
      {
        week: "Week 1",
        title: "Prompt Engineering & UI Prototyping",
        description: isBeginner 
          ? "Master prompting techniques. Design layout mocks and define the software requirements."
          : "Define schema models. Create front-end UI mockups with system prompts.",
        toolRecommendations: isFree ? ["Vercel v0 (Free)", "Claude (Free)"] : ["Vercel v0 (Pro)", "Claude 3.5 Sonnet"]
      },
      {
        week: "Week 2",
        title: "API Integration & Backend Wiring",
        description: "Connect the frontend interface to database services and AI APIs. Handle streams.",
        toolRecommendations: isFree ? ["Gemini 1.5 Flash (Free)", "Supabase (Free Tier)"] : ["Gemini 1.5 Pro", "Supabase", "Resend API"]
      },
      {
        week: "Week 3",
        title: "Agent logic & Autonomous loops",
        description: "Implement simple LLM chain scripts or agent flows to make your application perform work on behalf of users.",
        toolRecommendations: ["LangGraph (Open Source)", "CrewAI"]
      },
      {
        week: "Week 4",
        title: "Deployment, Testing & Launch",
        description: "Package application bundle, host on cloud provider, verify speed and launch public beta.",
        toolRecommendations: ["Vercel", "GitHub Actions"]
      }
    ];
  } else if (goal.includes('Research') || goal.includes('research') || goal.includes('data')) {
    return [
      {
        week: "Week 1",
        title: "Advanced Information Retrieval & AI Search",
        description: "Learn to construct deep research questions, verify citations and extract raw context.",
        toolRecommendations: ["Perplexity AI", "Phind"]
      },
      {
        week: "Week 2",
        title: "RAG & Vector Embeddings",
        description: "Learn how to embed text files, PDFs, or web links, and structure them inside search databases.",
        toolRecommendations: ["LlamaIndex (Open Source)", "ChromaDB (Free)"]
      },
      {
        week: "Week 3",
        title: "Knowledge Graphs & Agent workflows",
        description: "Assemble multiple agents to read articles, summarize insights, and cross-examine conclusions.",
        toolRecommendations: ["LangGraph", "DeepSeek R1"]
      },
      {
        week: "Week 4",
        title: "Publishing & Insight Presentation",
        description: "Write formal summary papers or generate custom data reports representing research conclusions.",
        toolRecommendations: ["LaTeX / Overleaf", "Pandas & Python"]
      }
    ];
  } else {
    // Default general AI development roadmap
    return [
      {
        week: "Week 1",
        title: "AI Ecosystem Foundations",
        description: "Understand basic neural network concepts, APIs, cost-efficiency, and capabilities of major models.",
        toolRecommendations: ["Gemini 1.5 Flash", "OpenAI Playgrounds"]
      },
      {
        week: "Week 2",
        title: "IDE Integration & Accelerated Coding",
        description: "Supercharge your workflows with AI coding tools, codebase referencing, and code generation.",
        toolRecommendations: ["Cursor IDE", "v0 by Vercel"]
      },
      {
        week: "Week 3",
        title: "Multi-Agent Systems",
        description: "Orchestrate cooperative crews of agents. Learn context management and tool use protocols.",
        toolRecommendations: ["CrewAI", "Claude MCP Ecosystem"]
      },
      {
        week: "Week 4",
        title: "Product Launch & Optimization",
        description: "Deploy production applications, configure logging, track error trends, and optimize user prompt latency.",
        toolRecommendations: ["Vercel", "LangSmith / Phoenix"]
      }
    ];
  }
}
