import type { NavLink, Service, PortfolioItem, TeamMember, Stat } from "./types";

export type Locale = "en" | "zh";

export const SITE_URL = "https://slagga.top";

interface SeoEntry {
  readonly title: string;
  readonly description: string;
}

interface SiteContent {
  readonly navLinks: readonly NavLink[];
  readonly company: {
    readonly name: string;
    readonly tagline: string;
    readonly description: string;
    readonly email: string;
    readonly location: string;
  };
  readonly stats: readonly Stat[];
  readonly services: readonly Service[];
  readonly portfolio: readonly PortfolioItem[];
  readonly team: readonly TeamMember[];
  readonly ui: {
    readonly navbarCta: string;
    readonly navbarToggleAriaLabel: string;
    readonly footerQuickLinks: string;
    readonly footerContact: string;
    readonly footerRightsReserved: string;
    readonly heroBadge: string;
    readonly heroHeadingBefore: string;
    readonly heroHeadingHighlight: string;
    readonly heroHeadingAfter: string;
    readonly heroPrimaryCta: string;
    readonly heroSecondaryCta: string;
    readonly servicesTitle: string;
    readonly servicesSubtitle: string;
    readonly portfolioTitle: string;
    readonly portfolioSubtitle: string;
    readonly portfolioViewAllCta: string;
    readonly aboutTitle: string;
    readonly aboutSubtitle: string;
    readonly aboutStoryTitle: string;
    readonly aboutStoryBody: string;
    readonly aboutApproachTitle: string;
    readonly aboutApproachBody: string;
    readonly aboutTeamTitle: string;
    readonly ctaTitle: string;
    readonly ctaSubtitle: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
    readonly contactTitle: string;
    readonly contactSubtitle: string;
    readonly contactNameLabel: string;
    readonly contactEmailLabel: string;
    readonly contactCompanyLabel: string;
    readonly contactServiceLabel: string;
    readonly contactMessageLabel: string;
    readonly contactNamePlaceholder: string;
    readonly contactEmailPlaceholder: string;
    readonly contactCompanyPlaceholder: string;
    readonly contactMessagePlaceholder: string;
    readonly contactSendButton: string;
    readonly contactSendingButton: string;
    readonly socialTwitter: string;
    readonly socialGithub: string;
    readonly socialDiscord: string;
  };
  readonly formErrors: {
    readonly requiredName: string;
    readonly shortName: string;
    readonly requiredEmail: string;
    readonly invalidEmail: string;
    readonly requiredMessage: string;
    readonly shortMessage: string;
  };
  readonly formStatus: {
    readonly success: string;
    readonly networkError: string;
    readonly unknownError: string;
  };
  readonly api: {
    readonly tooManyRequests: string;
    readonly invalidEmail: string;
    readonly receivedMessage: string;
    readonly invalidRequestBody: string;
    readonly internalError: string;
    readonly missingRequiredPrefix: string;
  };
  readonly seo: {
    readonly rootTitleDefault: string;
    readonly rootTitleTemplate: string;
    readonly rootDescription: string;
    readonly openGraphLocale: string;
    readonly openGraphDescription: string;
    readonly keywords: readonly string[];
    readonly pages: {
      readonly about: SeoEntry;
      readonly services: SeoEntry;
      readonly portfolio: SeoEntry;
      readonly contact: SeoEntry;
    };
  };
}

const SITE_CONTENT: Readonly<Record<Locale, SiteContent>> = {
  zh: {
    navLinks: [
      { label: "首页", href: "/" },
      { label: "服务", href: "/services" },
      { label: "关于我们", href: "/about" },
      { label: "案例", href: "/portfolio" },
      { label: "联系我们", href: "/contact" },
    ],
    company: {
      name: "NEXT AI",
      tagline: "区块链软件开发",
      description:
        "我们构建安全、可扩展的区块链解决方案，驱动去中心化未来。从智能合约到全栈 dApp，团队交付可用于生产环境的 Web3 软件。",
      email: "slagga@duck.com",
      location: "San Francisco, CA",
    },
    stats: [
      { value: "50+", label: "已交付项目" },
      { value: "99.9", label: "稳定可用", suffix: "%" },
      { value: "15+", label: "支持公链协议" },
      { value: "24/7", label: "技术支持" },
    ],
    services: [
      {
        id: "smart-contracts",
        icon: "📜",
        title: "智能合约开发",
        description:
          "由顶级安全团队审计的高安全、低 Gas 智能合约。支持 Solidity、Rust（Solana）与 Move，保障千万级 TVL 安全。",
        features: [
          "ERC-20 / ERC-721 / ERC-1155 代币",
          "DeFi 协议（DEX、借贷、收益）",
          "多签钱包与 DAO 治理",
          "形式化验证与模糊测试",
        ],
      },
      {
        id: "dapp-development",
        icon: "🖥️",
        title: "dApp 开发",
        description:
          "打造全栈去中心化应用，兼顾易用体验与高性能。前端与链上后端无缝衔接，快速落地业务。",
        features: [
          "React / Next.js Web3 前端",
          "钱包集成（MetaMask、WalletConnect）",
          "子图索引（The Graph）",
          "IPFS / Arweave 存储",
        ],
      },
      {
        id: "defi-solutions",
        icon: "🏦",
        title: "DeFi 解决方案",
        description:
          "从概念设计到主网上线的一站式 DeFi 平台开发。已服务产品累计交易量超过 20 亿美元。",
        features: [
          "自动化做市商（AMM）",
          "借贷协议",
          "收益聚合器与金库",
          "跨链桥",
        ],
      },
      {
        id: "nft-platforms",
        icon: "🎨",
        title: "NFT 与资产通证化",
        description:
          "提供端到端 NFT 平台与现实资产通证化能力。我们推出的系列二级市场交易量累计超 10000 ETH。",
        features: [
          "NFT 铸造平台",
          "交易市场开发",
          "RWA 通证化",
          "动态 / 生成式 NFT",
        ],
      },
      {
        id: "security-audit",
        icon: "🔒",
        title: "安全与审计",
        description:
          "全面覆盖智能合约安全审计与链上监控。团队累计发现并修复 200+ 高危漏洞。",
        features: [
          "人工代码审查",
          "自动化扫描（Slither、Mythril）",
          "经济攻击仿真",
          "上线后监控",
        ],
      },
      {
        id: "consulting",
        icon: "💡",
        title: "区块链咨询",
        description:
          "面向企业的 Web3 战略咨询服务。通过架构设计与技术路线规划，帮助你稳健完成链上化转型。",
        features: [
          "技术架构设计",
          "Tokenomics 模型设计",
          "协议选型建议",
          "合规与监管咨询",
        ],
      },
    ],
    portfolio: [
      {
        id: "dex-protocol",
        title: "跨链 DEX 协议",
        category: "DeFi",
        description:
          "构建高性能去中心化交易协议，支持 8 条公链统一流动性池并具备 MEV 防护能力。",
        imageUrl: "/portfolio/dex.jpg",
        tags: ["Solidity", "Rust", "The Graph", "React"],
        results: ["总交易量 $5 亿+", "活跃用户 5 万+", "支持 8 条链"],
      },
      {
        id: "nft-marketplace",
        title: "企业级 NFT 交易平台",
        category: "NFT",
        description:
          "为世界 500 强游戏公司交付白标 NFT 平台，支撑 200 万+ 铸造且全程零宕机。",
        imageUrl: "/portfolio/nft.jpg",
        tags: ["ERC-721", "IPFS", "Next.js", "Polygon"],
        results: ["铸造 NFT 200 万+", "99.99% 可用性", "月活 20 万"],
      },
      {
        id: "defi-lending",
        title: "机构级 DeFi 借贷协议",
        category: "DeFi",
        description:
          "超额抵押借贷协议，提供机构级风险管理能力，活跃借贷规模超 2 亿美元。",
        imageUrl: "/portfolio/lending.jpg",
        tags: ["Solidity", "Chainlink", "TypeScript", "AWS"],
        results: ["TVL $2 亿", "出借人 1.5 万", "零被攻击事件"],
      },
      {
        id: "dao-platform",
        title: "DAO 治理平台",
        category: "DAO",
        description:
          "模块化治理框架，支持链上投票、资金库管理与委托投票，服务 30+ DAO 组织。",
        imageUrl: "/portfolio/dao.jpg",
        tags: ["Solidity", "Snapshot", "IPFS", "Vue.js"],
        results: ["服务 30+ DAO", "累计投票 10 万+", "管理资产 $5000 万"],
      },
      {
        id: "gaming-wallet",
        title: "Web3 游戏钱包 SDK",
        category: "Gaming",
        description:
          "面向链游场景的嵌入式钱包 SDK，支持免 Gas 交易与社交恢复，已接入 12 家游戏工作室。",
        imageUrl: "/portfolio/gaming.jpg",
        tags: ["Rust", "TypeScript", "Solana", "Unity"],
        results: ["12 家工作室接入", "50 万+ 钱包", "交易确认 <1 秒"],
      },
      {
        id: "tokenization",
        title: "房地产资产通证化",
        category: "Tokenization",
        description:
          "合规化分拆持有平台，支持商业地产份额化，累计完成超 1 亿美元资产上链。",
        imageUrl: "/portfolio/realestate.jpg",
        tags: ["Solidity", "ERC-3643", "Node.js", "PostgreSQL"],
        results: ["已通证化 $1 亿", "5000 名投资人", "覆盖 4 个司法辖区"],
      },
    ],
    team: [
      {
        name: "Alex Chen",
        role: "CEO & 联合创始人",
        bio: "曾任以太坊基金会核心开发者，拥有 10+ 年分布式系统与密码学经验。",
        imageUrl: "/team/alex.jpg",
      },
      {
        name: "Sarah Park",
        role: "CTO & 联合创始人",
        bio: "前 Consensys 首席工程师，打造过 3 个 TVL 超 10 亿美元协议，专注智能合约安全。",
        imageUrl: "/team/sarah.jpg",
      },
      {
        name: "Marcus Rivera",
        role: "DeFi 负责人",
        bio: "曾在 Jump Crypto 设计交易系统，擅长 AMM 机制设计与 MEV 风险缓解。",
        imageUrl: "/team/marcus.jpg",
      },
      {
        name: "Yuki Tanaka",
        role: "安全研究负责人",
        bio: "曾在头部 20 个协议中发现 50+ 关键漏洞，前 Trail of Bits 首席审计师。",
        imageUrl: "/team/yuki.jpg",
      },
    ],
    ui: {
      navbarCta: "立即咨询",
      navbarToggleAriaLabel: "切换导航菜单",
      footerQuickLinks: "快速导航",
      footerContact: "联系方式",
      footerRightsReserved: "保留所有权利。",
      heroBadge: "领先的区块链开发团队",
      heroHeadingBefore: "构建",
      heroHeadingHighlight: "去中心化",
      heroHeadingAfter: "未来",
      heroPrimaryCta: "启动你的项目",
      heroSecondaryCta: "查看案例",
      servicesTitle: "我们的服务",
      servicesSubtitle: "从智能合约到全栈 dApp 的端到端区块链开发",
      portfolioTitle: "精选案例",
      portfolioSubtitle: "来自 50+ 区块链项目的真实交付案例",
      portfolioViewAllCta: "查看全部项目 ->",
      aboutTitle: "关于我们",
      aboutSubtitle: "由区块链工程师、密码学研究者与产品专家组成的团队",
      aboutStoryTitle: "我们的故事",
      aboutStoryBody:
        "NEXT AI 成立于 2021 年，创始团队成员最初相识于以太坊基金会。我们看到了前沿区块链研究与生产级软件落地之间的鸿沟，并致力于连接两者。至今，我们已在 15+ 条公链上交付 50+ 个项目，以安全优先与工程质量著称。",
      aboutApproachTitle: "我们的方法",
      aboutApproachBody:
        "我们相信区块链软件必须遵循更高标准。不可变代码必须一次做对，因此我们将测试驱动开发与形式化验证、模糊测试以及多轮独立审计结合。每个项目从 Day 1 即配备专属安全负责人。我们不仅写代码，更保护价值。",
      aboutTeamTitle: "核心团队",
      ctaTitle: "准备好一起构建未来了吗？",
      ctaSubtitle:
        "无论你要发布新协议、构建 dApp，还是探索资产通证化，我们都能帮助你稳健上线。",
      ctaPrimary: "预约沟通",
      ctaSecondary: "浏览服务",
      contactTitle: "联系我们",
      contactSubtitle: "告诉我们你的项目需求，我们将在 24 小时内回复。",
      contactNameLabel: "姓名",
      contactEmailLabel: "邮箱",
      contactCompanyLabel: "公司",
      contactServiceLabel: "感兴趣的服务",
      contactMessageLabel: "项目需求",
      contactNamePlaceholder: "你的姓名",
      contactEmailPlaceholder: "you@company.com",
      contactCompanyPlaceholder: "你的公司（选填）",
      contactMessagePlaceholder: "请介绍你的项目...",
      contactSendButton: "发送消息",
      contactSendingButton: "发送中...",
      socialTwitter: "Twitter",
      socialGithub: "GitHub",
      socialDiscord: "Discord",
    },
    formErrors: {
      requiredName: "请输入姓名",
      shortName: "姓名至少需要 2 个字符",
      requiredEmail: "请输入邮箱",
      invalidEmail: "请输入有效的邮箱地址",
      requiredMessage: "请输入项目需求",
      shortMessage: "项目需求至少需要 10 个字符",
    },
    formStatus: {
      success: "消息发送成功，我们会尽快联系你。",
      networkError: "网络错误，请稍后重试。",
      unknownError: "发生未知错误",
    },
    api: {
      tooManyRequests: "请求过于频繁，请稍后再试。",
      invalidEmail: "邮箱格式不正确",
      receivedMessage: "已收到你的消息，我们将在 24 小时内与你联系。",
      invalidRequestBody: "请求体无效，请提供合法的 JSON。",
      internalError: "服务器内部错误，请稍后重试。",
      missingRequiredPrefix: "缺少必填字段：",
    },
    seo: {
      rootTitleDefault: "NEXT AI - 区块链软件开发",
      rootTitleTemplate: "%s | NEXT AI",
      rootDescription:
        "NEXT AI 专注构建安全、可扩展的区块链解决方案，涵盖智能合约、dApp、DeFi 协议与 Web3 技术咨询。",
      openGraphLocale: "zh_CN",
      openGraphDescription: "用安全、可扩展的区块链方案构建去中心化未来。",
      keywords: [
        "区块链",
        "智能合约",
        "dApp 开发",
        "DeFi",
        "Web3",
        "Solidity",
        "NFT",
        "加密技术",
        "区块链开发公司",
      ],
      pages: {
        about: {
          title: "关于我们",
          description:
            "认识 NEXT AI 团队：由区块链工程师、密码学研究者与产品专家组成，专注打造去中心化未来。",
        },
        services: {
          title: "服务",
          description:
            "端到端区块链开发服务：智能合约、dApp、DeFi、NFT、安全审计与咨询。",
        },
        portfolio: {
          title: "案例",
          description:
            "来自 50+ 区块链项目的交付案例：DeFi 协议、NFT 平台、DAO 治理、游戏钱包与资产通证化。",
        },
        contact: {
          title: "联系我们",
          description:
            "联系 NEXT AI，告诉我们你的区块链项目，我们会在 24 小时内与你沟通。",
        },
      },
    },
  },
  en: {
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
    company: {
      name: "NEXT AI",
      tagline: "Blockchain Software Development",
      description:
        "We build secure, scalable blockchain solutions that power the decentralized future. From smart contracts to full-stack dApps, our team delivers production-grade Web3 software.",
      email: "slagga@duck.com",
      location: "San Francisco, CA",
    },
    stats: [
      { value: "50+", label: "Projects Delivered" },
      { value: "99.9", label: "Uptime", suffix: "%" },
      { value: "15+", label: "Blockchain Protocols" },
      { value: "24/7", label: "Support" },
    ],
    services: [
      {
        id: "smart-contracts",
        icon: "📜",
        title: "Smart Contract Development",
        description:
          "Secure, gas-optimized smart contracts audited by leading firms. We write Solidity, Rust (Solana), and Move contracts that protect millions in TVL.",
        features: [
          "ERC-20 / ERC-721 / ERC-1155 tokens",
          "DeFi protocols (DEX, lending, yield)",
          "Multi-sig wallets & DAO governance",
          "Formal verification & fuzzing",
        ],
      },
      {
        id: "dapp-development",
        icon: "🖥️",
        title: "dApp Development",
        description:
          "Full-stack decentralized applications with intuitive UX. We build responsive frontends that connect seamlessly to blockchain backends.",
        features: [
          "React / Next.js Web3 frontends",
          "Wallet integration (MetaMask, WalletConnect)",
          "Subgraph indexing (The Graph)",
          "IPFS / Arweave storage",
        ],
      },
      {
        id: "defi-solutions",
        icon: "🏦",
        title: "DeFi Solutions",
        description:
          "Custom decentralized finance platforms from concept to mainnet. Our DeFi products have processed over $2B in total volume.",
        features: [
          "Automated Market Makers (AMM)",
          "Lending & borrowing protocols",
          "Yield aggregators & vaults",
          "Cross-chain bridges",
        ],
      },
      {
        id: "nft-platforms",
        icon: "🎨",
        title: "NFT & Tokenization",
        description:
          "End-to-end NFT platforms and real-world asset tokenization. We've launched collections generating 10,000+ ETH in secondary volume.",
        features: [
          "NFT minting platforms",
          "Marketplace development",
          "RWA tokenization",
          "Dynamic / generative NFTs",
        ],
      },
      {
        id: "security-audit",
        icon: "🔒",
        title: "Security & Auditing",
        description:
          "Comprehensive smart contract security audits and on-chain monitoring. Our team has identified and patched 200+ critical vulnerabilities.",
        features: [
          "Manual code review",
          "Automated scanning (Slither, Mythril)",
          "Economic attack simulations",
          "Post-deployment monitoring",
        ],
      },
      {
        id: "consulting",
        icon: "💡",
        title: "Blockchain Consulting",
        description:
          "Strategic guidance for Web3 adoption. We help enterprises navigate blockchain integration with architecture design and technical roadmaps.",
        features: [
          "Technical architecture design",
          "Tokenomics modeling",
          "Protocol selection advisory",
          "Compliance & regulatory guidance",
        ],
      },
    ],
    portfolio: [
      {
        id: "dex-protocol",
        title: "Cross-Chain DEX Protocol",
        category: "DeFi",
        description:
          "Built a high-performance decentralized exchange supporting 8 blockchains with unified liquidity pools and MEV protection.",
        imageUrl: "/portfolio/dex.jpg",
        tags: ["Solidity", "Rust", "The Graph", "React"],
        results: ["$500M+ Total Volume", "50K+ Active Users", "8 Chain Support"],
      },
      {
        id: "nft-marketplace",
        title: "Enterprise NFT Marketplace",
        category: "NFT",
        description:
          "White-label NFT marketplace for a Fortune 500 gaming company, handling 2M+ mints with zero downtime.",
        imageUrl: "/portfolio/nft.jpg",
        tags: ["ERC-721", "IPFS", "Next.js", "Polygon"],
        results: ["2M+ NFTs Minted", "99.99% Uptime", "200K MAU"],
      },
      {
        id: "defi-lending",
        title: "Institutional DeFi Lending",
        category: "DeFi",
        description:
          "Overcollateralized lending protocol with institutional-grade risk management, supporting $200M+ in active loans.",
        imageUrl: "/portfolio/lending.jpg",
        tags: ["Solidity", "Chainlink", "TypeScript", "AWS"],
        results: ["$200M TVL", "15K Lenders", "Zero Exploits"],
      },
      {
        id: "dao-platform",
        title: "DAO Governance Platform",
        category: "DAO",
        description:
          "Modular governance framework enabling on-chain voting, treasury management, and delegated voting for 30+ DAOs.",
        imageUrl: "/portfolio/dao.jpg",
        tags: ["Solidity", "Snapshot", "IPFS", "Vue.js"],
        results: ["30+ DAOs Served", "100K Votes Cast", "$50M Managed"],
      },
      {
        id: "gaming-wallet",
        title: "Web3 Gaming Wallet SDK",
        category: "Gaming",
        description:
          "Embedded wallet SDK for blockchain games with gasless transactions and social recovery, integrated by 12 game studios.",
        imageUrl: "/portfolio/gaming.jpg",
        tags: ["Rust", "TypeScript", "Solana", "Unity"],
        results: ["12 Studios", "500K+ Wallets", "<1s Transaction"],
      },
      {
        id: "tokenization",
        title: "Real Estate Tokenization",
        category: "Tokenization",
        description:
          "Regulatory-compliant platform for fractional real estate ownership, tokenizing $100M+ in commercial properties.",
        imageUrl: "/portfolio/realestate.jpg",
        tags: ["Solidity", "ERC-3643", "Node.js", "PostgreSQL"],
        results: ["$100M Tokenized", "5K Investors", "4 Jurisdictions"],
      },
    ],
    team: [
      {
        name: "Alex Chen",
        role: "CEO & Co-Founder",
        bio: "Former Core Developer at Ethereum Foundation. 10+ years in distributed systems and cryptography.",
        imageUrl: "/team/alex.jpg",
      },
      {
        name: "Sarah Park",
        role: "CTO & Co-Founder",
        bio: "Ex-Consensys lead engineer. Built 3 protocols with $1B+ TVL. Smart contract security specialist.",
        imageUrl: "/team/sarah.jpg",
      },
      {
        name: "Marcus Rivera",
        role: "Head of DeFi",
        bio: "Previously designed trading systems at Jump Crypto. Expert in AMM design and MEV mitigation.",
        imageUrl: "/team/marcus.jpg",
      },
      {
        name: "Yuki Tanaka",
        role: "Lead Security Researcher",
        bio: "Found 50+ critical bugs across top 20 protocols. Former lead auditor at Trail of Bits.",
        imageUrl: "/team/yuki.jpg",
      },
    ],
    ui: {
      navbarCta: "Get Started",
      navbarToggleAriaLabel: "Toggle navigation menu",
      footerQuickLinks: "Quick Links",
      footerContact: "Contact",
      footerRightsReserved: "All rights reserved.",
      heroBadge: "Leading Blockchain Development Studio",
      heroHeadingBefore: "Build the",
      heroHeadingHighlight: "Decentralized",
      heroHeadingAfter: "Future",
      heroPrimaryCta: "Start Your Project",
      heroSecondaryCta: "View Our Work",
      servicesTitle: "Our Services",
      servicesSubtitle:
        "End-to-end blockchain development from smart contracts to full-stack dApps",
      portfolioTitle: "Featured Work",
      portfolioSubtitle: "Case studies from our portfolio of 50+ blockchain projects",
      portfolioViewAllCta: "View All Projects ->",
      aboutTitle: "About Us",
      aboutSubtitle:
        "A team of blockchain engineers, cryptographers, and product builders",
      aboutStoryTitle: "Our Story",
      aboutStoryBody:
        "NEXT AI was founded in 2021 by a team of engineers who met at the Ethereum Foundation. We saw the gap between cutting-edge blockchain research and production-ready software, and set out to bridge it. Since then, we've shipped 50+ projects across 15 blockchain protocols, earning a reputation for security-first engineering and relentless quality.",
      aboutApproachTitle: "Our Approach",
      aboutApproachBody:
        "We believe blockchain software demands a higher standard. Immutable code must be correct the first time, so we pair test-driven development with formal verification, fuzz testing, and multiple independent audits. Every project gets a dedicated security lead from day one. We don't just write code; we protect value.",
      aboutTeamTitle: "Leadership Team",
      ctaTitle: "Ready to Build the Future?",
      ctaSubtitle:
        "Whether you're launching a new protocol, building a dApp, or exploring tokenization, our team is ready to help you ship with confidence.",
      ctaPrimary: "Schedule a Call",
      ctaSecondary: "Explore Services",
      contactTitle: "Get in Touch",
      contactSubtitle:
        "Ready to build? Tell us about your project and we'll get back to you within 24 hours.",
      contactNameLabel: "Name",
      contactEmailLabel: "Email",
      contactCompanyLabel: "Company",
      contactServiceLabel: "Service Interest",
      contactMessageLabel: "Message",
      contactNamePlaceholder: "Your name",
      contactEmailPlaceholder: "you@company.com",
      contactCompanyPlaceholder: "Your company (optional)",
      contactMessagePlaceholder: "Tell us about your project...",
      contactSendButton: "Send Message",
      contactSendingButton: "Sending...",
      socialTwitter: "Twitter",
      socialGithub: "GitHub",
      socialDiscord: "Discord",
    },
    formErrors: {
      requiredName: "Name is required",
      shortName: "Name must be at least 2 characters",
      requiredEmail: "Email is required",
      invalidEmail: "Please enter a valid email address",
      requiredMessage: "Message is required",
      shortMessage: "Message must be at least 10 characters",
    },
    formStatus: {
      success: "Message sent successfully! We'll be in touch soon.",
      networkError: "Network error. Please try again.",
      unknownError: "Something went wrong",
    },
    api: {
      tooManyRequests: "Too many requests. Please try again later.",
      invalidEmail: "Invalid email format",
      receivedMessage: "Your message has been received. We'll be in touch within 24 hours.",
      invalidRequestBody: "Invalid request body. Please provide valid JSON.",
      internalError: "Internal server error. Please try again later.",
      missingRequiredPrefix: "Missing required fields:",
    },
    seo: {
      rootTitleDefault: "NEXT AI - Blockchain Software Development",
      rootTitleTemplate: "%s | NEXT AI",
      rootDescription:
        "NEXT AI builds secure, scalable blockchain solutions. Smart contracts, dApps, DeFi protocols, and Web3 consulting for the decentralized future.",
      openGraphLocale: "en_US",
      openGraphDescription:
        "Build the decentralized future with secure, scalable blockchain solutions.",
      keywords: [
        "blockchain",
        "smart contracts",
        "dApp development",
        "DeFi",
        "Web3",
        "Solidity",
        "NFT",
        "crypto",
        "blockchain development company",
      ],
      pages: {
        about: {
          title: "About Us",
          description:
            "Meet the NEXT AI team - blockchain engineers, cryptographers, and product builders creating the decentralized future.",
        },
        services: {
          title: "Services",
          description:
            "End-to-end blockchain development services - smart contracts, dApps, DeFi, NFTs, security auditing, and consulting.",
        },
        portfolio: {
          title: "Portfolio",
          description:
            "Case studies from 50+ blockchain projects - DeFi protocols, NFT platforms, DAO governance, gaming wallets, and asset tokenization.",
        },
        contact: {
          title: "Contact",
          description:
            "Get in touch with NEXT AI. Tell us about your blockchain project and we'll get back to you within 24 hours.",
        },
      },
    },
  },
};

export const LOCALE_COOKIE_NAME = "next_ai_locale";

export const DEFAULT_LOCALE: Locale = "en";

const resolveLocaleTag = (tag: string): Locale | null => {
  const normalizedTag = tag.trim().toLowerCase();
  if (normalizedTag.startsWith("en")) {
    return "en";
  }
  if (normalizedTag.startsWith("zh")) {
    return "zh";
  }

  return null;
};

export const resolveLocale = (input?: string): Locale => {
  return input === "zh" ? "zh" : "en";
};

export const resolveLocaleFromAcceptLanguage = (acceptLanguage?: string): Locale => {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const ranges = acceptLanguage.split(",");
  for (const range of ranges) {
    const [languageTag] = range.split(";");
    const resolved = resolveLocaleTag(languageTag ?? "");
    if (resolved) {
      return resolved;
    }
  }

  return DEFAULT_LOCALE;
};

export const ACTIVE_LOCALE: Locale = resolveLocale(process.env.NEXT_PUBLIC_SITE_LOCALE);

export const getSiteContent = (locale: Locale): SiteContent => {
  return SITE_CONTENT[locale];
};

export const getSiteContentFromInput = (input?: string): SiteContent => {
  return SITE_CONTENT[resolveLocale(input)];
};

const content = SITE_CONTENT[ACTIVE_LOCALE];

/** Site-wide navigation links */
export const NAV_LINKS: readonly NavLink[] = content.navLinks;

/** Company information */
export const COMPANY = content.company;

/** Key statistics displayed in hero section */
export const STATS: readonly Stat[] = content.stats;

/** Services offered */
export const SERVICES: readonly Service[] = content.services;

/** Portfolio case studies */
export const PORTFOLIO: readonly PortfolioItem[] = content.portfolio;

/** Team members */
export const TEAM: readonly TeamMember[] = content.team;

/** UI text language pack */
export const UI_TEXT = content.ui;

/** Form validation and status text */
export const FORM_ERRORS = content.formErrors;
export const FORM_STATUS = content.formStatus;

/** API response text */
export const API_TEXT = content.api;

/** SEO language pack */
export const SEO = content.seo;
