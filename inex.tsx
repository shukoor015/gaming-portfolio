import React, { useState, useMemo } from 'react';
import {
  Gamepad2,
  Bug,
  Video,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Play,
  ShieldAlert,
  Sparkles,
  Terminal,
  Layers,
  Sliders,
  Crosshair,
  Clock,
  Award,
  MessageSquare,
  ChevronRight,
  Search,
  Filter,
  X,
  Laptop,
  Headphones,
  Smartphone,
  Fan,
  Eye,
  TrendingUp,
  Zap,
  UserCheck,
  MapPin,
  Code2,
  AlertTriangle
} from 'lucide-react';

// --- PORTFOLIO DATA ---
const PROFILE = {
  name: "Mohammed Abdul Shukoor",
  handle: "shuk1790",
  discordUrl: "https://discord.com/app",
  role: "Indie Game QA Playtester, Bug Hunter & Gameplay Analyst",
  subRole: "B.E. Information Technology | Full-Stack Developer",
  location: "Hyderabad, India",
  status: "OPEN FOR PLAYTESTS & QA AUDITS",
  stats: [
    { label: "Documented Playtests", value: "11+", icon: Gamepad2, color: "text-cyan-400" },
    { label: "Timestamped VODs", value: "1080p/720p", icon: Video, color: "text-purple-400" },
    { label: "Avg. Deep-Dive Session", value: "30–45m", icon: Clock, color: "text-emerald-400" },
    { label: "Critical UI/UX Bugs Caught", value: "24+", icon: Bug, color: "text-rose-400" },
  ]
};

const HARDWARE_SPECS = [
  {
    title: "ASUS Vivobook 14",
    subtitle: "Intel Core Ultra 5 225H",
    category: "Primary PC QA Rig",
    desc: "Real-world mid-tier indie target benchmark. Ideal for catching frame-pacing hitches, shader compilation stutters, and thermal throttling on modern integrated/hybrid architectures.",
    icon: Laptop,
    badge: "PC Benchmark"
  },
  {
    title: "OBS Studio Diagnostics",
    subtitle: "720p / 480p @ 60fps Constant Frame Pacing",
    category: "VOD & Reproduction Pipeline",
    desc: "Hardware-encoded gameplay capture with full microphone commentary, visual cursor tracking, and exact minute:second bug timestamping for developers.",
    icon: Video,
    badge: "Zero-Drop Capture"
  },
  {
    title: "Mivi DuoPods B4",
    subtitle: "Low-Latency Audio Sync",
    category: "Acoustic & Dialogue QA",
    desc: "Dedicated monitoring for missing voice-over lines, unbalanced SFX mixing, and audio-visual desync during heavy particle/swarm combat.",
    icon: Headphones,
    badge: "Audio QA"
  },
  {
    title: "Samsung Galaxy M14 5G",
    subtitle: "Mobile Touch & High-Refresh Testing",
    category: "Mobile & Cross-Platform QA",
    desc: "Extensive experience testing touch target ergonomics, HUD scaling, and competitive shooters (CODM veteran) under sustained load.",
    icon: Smartphone,
    badge: "Mobile Rig"
  },
  {
    title: "Zebronics ZEB-NC3300",
    subtitle: "Active Dual-Fan Thermal Control",
    category: "Sustained Stress Testing",
    desc: "Ensures consistent clock speeds across 30+ minute survival runs so reported frame drops reflect genuine game optimization issues rather than thermal decay.",
    icon: Fan,
    badge: "Thermal Locked"
  }
];

const PLAYTEST_VAULT = [
  {
    id: "teem",
    title: "TEEM",
    developer: "vizyn",
    genre: "Roguelite / Bullet Heaven",
    subGenre: "Swarm Action Roguelike",
    playtime: "30+ Mins",
    videoUrl: "https://youtu.be/Vk2NV2H505Q",
    timestampHighlight: "UI Collision Bug @ 6:11",
    rating: "High Potential / Needs Target Priority Polish",
    accent: "from-amber-500/20 via-orange-600/10 to-transparent",
    borderAccent: "hover:border-amber-400/60",
    tags: ["UI Overlap Bug", "Swarm AI", "Boss Balance", "Tutorial Pacing"],
    devPrompt: "Is the core gameplay loop fun? Difficulty-wise, without difficulty modifiers, I'm prioritizing game knowledge over mechanical skill.. where did you feel the difficulty sat?",
    summary: "Tested core swarm mechanics, mutation evolution cards, and early-game survival curves. Caught a direct UI collision in the tutorial at 6:11 where the instructional popup obstructed the 'Gore' Evolve card.",
    positives: [
      "Core swarm consumption and evolution loop is immediately gripping and distinct.",
      "Mutation risk/reward trade-offs (e.g., Gore opening wounds vs +5% enemy HP) feel meaningful."
    ],
    bugsAndFriction: [
      "[UI BUG @ 6:11] Tutorial 'Evolve' lesson popup (lesson 10 of 16) directly overlaps the 'GORE' and 'GORGE' mutation selection cards, obscuring stat text.",
      "[AI TARGETING] Swarm auto-attacks nearby bees and splits up across multiple beetles instead of prioritizing the specific enemy the player wants to burst down.",
      "[BALANCE SPIKE] The 'Vampiric' enemy variant feels significantly more punishing than the actual stage boss without clear counter-play signposting.",
      "[SPAWN DENSITY] Early bee spawn rates in the first few minutes overwhelm the player before core movement clicks."
    ],
    recommendations: [
      "Pause or throttle enemy waves during active tutorial text steps so players can read mutation cards without taking damage.",
      "Add a soft fading light vignette or warning transition as the player approaches the arena border.",
      "Expand the tutorial to explicitly demonstrate attack-dodging windows and target-focus mechanics."
    ]
  },
  {
    id: "orbit-core",
    title: "Orbit Core",
    developer: "Nelson V.",
    genre: "Roguelite / Bullet Heaven",
    subGenre: "Mech Bullet Heaven",
    playtime: "30 Mins",
    videoUrl: "https://youtu.be/cjcYoV_1n5s",
    timestampHighlight: "30-Min Blind Test VOD",
    rating: "Polished Core / Needs Mid-Run Objectives",
    accent: "from-cyan-500/20 via-blue-600/10 to-transparent",
    borderAccent: "hover:border-cyan-400/60",
    tags: ["Boss Add-Spawns", "Stat Clarity", "Progression Loop", "Steam Demo"],
    devPrompt: "Play the demo for about 20 minutes without looking anything up: 1. First moment you felt lost. 2. The moment it clicked. 3. Why you stopped when you did.",
    summary: "Exceeded the requested 20-minute blind test with a full 30-minute recorded run. Evaluated mech combat readability, boss wave scaling, and long-term retention hooks.",
    positives: [
      "Visual polish, mech responsiveness, and minute-one combat feel very strong.",
      "The core loop clicked almost immediately without needing external guides."
    ],
    bugsAndFriction: [
      "[STAT CLARITY] The 'critt' (critical hit) mechanic and how it scales with mech upgrades was never clearly communicated in-game.",
      "[DIFFICULTY SPIKE] Boss encounters become chaotic due to excessive simultaneous standard robot spawns crowding the arena during boss patterns.",
      "[RETENTION DROP] Stopped at the 30-minute mark because the loop became repetitive once the primary wave pattern repeated without new objectives."
    ],
    recommendations: [
      "Implement a Task Timeline: after eliminating X bots or defeating the stage boss, let players call an extraction ship to travel to a new planet.",
      "Add map-based NPC Quests: approach stranded characters who request salvaged robot parts in exchange for specialized rewards.",
      "Introduce a Buildable Assistant Robot: collect chassis parts across the map to assemble an autonomous ally mech that fights alongside your army."
    ]
  },
  {
    id: "seagrid-nightfall",
    title: "Seagrid Nightfall",
    developer: "AthenaStudio",
    genre: "Strategy / Turn-Based",
    subGenre: "Turn-Based Pirate Tactics",
    playtime: "Full Demo Run",
    videoUrl: "https://youtu.be/CUiUXb2uJ24",
    timestampHighlight: "UI Glitch @ 8:23–9:10 (Peak 9:01)",
    rating: "Charming Tactics / Needs Onboarding Context",
    accent: "from-purple-500/20 via-indigo-600/10 to-transparent",
    borderAccent: "hover:border-purple-400/60",
    tags: ["UI Dismissal Bug", "Turn-Based Grid", "Onboarding", "Steam Demo"],
    devPrompt: "Did you have fun? What didn't you like? Did you get stuck or feel confused at any point? Was anything unclear, visually unappealing, inconsistent, or out of place?",
    summary: "Commanded three pirates in tactical grid combat. Documented a reproducible UI dismissal bug with the golden rhombus hint overlay between 8:23 and 9:10.",
    positives: [
      "Tactical combat becomes genuinely fun and rewarding once the match flow clicks.",
      "The enemy victory celebration dance animation was hilarious and added huge personality."
    ],
    bugsAndFriction: [
      "[UI BUG @ 8:23 - 9:10] When a hint appears above the golden rhombus popup (clearly visible at 9:01), clicking directly on the rhombus popup fails to close it. It only dismisses if the player clicks the upper hint box first.",
      "[ONBOARDING GAP] Graduated from the tutorial still feeling unsure about core turn mechanics; it took playing through one full match for the rules to naturally click."
    ],
    recommendations: [
      "Add brief character capability intros during the tutorial explaining each pirate's unique skill and why their movement range covers a specific number of grid tiles.",
      "Consider adding voice-acted barks or dialogue audio to elevate character charm."
    ]
  },
  {
    id: "remanence",
    title: "Remanence",
    developer: "Remanence (eggs-and-effort)",
    genre: "FPS / Action",
    subGenre: "Zero-Gravity Space FPS",
    playtime: "Full Build Audit",
    videoUrl: "https://youtu.be/-Yd7z1gKbK8",
    timestampHighlight: "Recoil & Frame Pacing Audit",
    rating: "Great Zero-G Vibe / Needs Weapon Tuning",
    accent: "from-emerald-500/20 via-teal-600/10 to-transparent",
    borderAccent: "hover:border-emerald-400/60",
    tags: ["Zero-G FPS", "Recoil Scaling", "Frame Drops", "Map Pickups"],
    devPrompt: "I'd like to know whether the tutorial was enough to establish gameplay knowledge and whether you want to see any changes or edits.",
    summary: "Evaluated zero-gravity movement onboarding, weapon recoil curves across sensitivity settings, and frame stability on Intel Core Ultra hardware.",
    positives: [
      "Tutorial pacing is spot-on: concise, informative, and never drags.",
      "Zero-gravity spatial graphics and movement atmosphere feel very immersive."
    ],
    bugsAndFriction: [
      "[GUNPLAY FRICTION] Weapon recoil feels overly punishing and makes tracking targets difficult in zero-G, even after manually raising mouse sensitivity.",
      "[PERFORMANCE] Experienced intermittent frame drops during combat encounters, which compounded aiming difficulty."
    ],
    recommendations: [
      "Dampen initial weapon kick or smooth out recoil recovery so zero-G gunfights reward aim skill.",
      "Add map-spawned weapon pickups scattered across sectors—mirroring how the shield pickup currently works—to incentivize arena movement and add loadout variety."
    ]
  },
  {
    id: "viscera",
    title: "Viscera",
    developer: "hoonshank",
    genre: "FPS / Action",
    subGenre: "Brutal 2D Arena Fighter & Management",
    playtime: "33 Mins",
    videoUrl: "https://youtu.be/9GFQCLNLB1Y",
    timestampHighlight: "33-Min Combat & AI Stress Test",
    rating: "Raw Concept / Critical Onboarding Needed",
    accent: "from-rose-500/20 via-red-600/10 to-transparent",
    borderAccent: "hover:border-rose-400/60",
    tags: ["1v4 AI Aggression", "Missing Tutorial", "Menu Flow Bug", "Browser/Itch"],
    devPrompt: "What do you think of the animation and art style? How did you find the combat and enemy AI? How was the economy? How long did you play for?",
    summary: "33-minute deep dive into the 2D arena combat and roster management prototype. Identified severe early-game 1v4 AI swarming and missing navigation flows.",
    positives: [
      "Gritty, brutal 2D gladiator management premise has a strong hook that kept me experimenting for 33 minutes."
    ],
    bugsAndFriction: [
      "[AI & SQUAD SELECTION] Enemy AI moves extremely fast and immediately surrounds the player in 1v4 scenarios, while the UI does not clearly explain how to deploy 4 friendly fighters to match them.",
      "[NO TUTORIAL] Complete absence of onboarding left controls, combat stances, and the management economy opaque even after 30+ minutes.",
      "[NAVIGATION LOCK] No option to return to the Main Menu to restart a run once inside a session."
    ],
    recommendations: [
      "Add a 60-second interactive control & squad-selection primer before the first arena bout.",
      "Implement an Escape/Pause menu with a 'Return to Main Menu / Restart Run' button.",
      "Refine character keyframe animations to better telegraph incoming AI strikes."
    ]
  },
  {
    id: "leifs-garden-tower",
    title: "Leif's Garden Tower",
    developer: "Shroomy",
    genre: "Management / Sim",
    subGenre: "Cozy Garden & Shop Economy Sim",
    playtime: "30+ Mins",
    videoUrl: null,
    timestampHighlight: "Economy Soft-Lock Discovery",
    rating: "Cozy Loop / Economy Dead-End Fixed",
    accent: "from-lime-500/20 via-emerald-600/10 to-transparent",
    borderAccent: "hover:border-lime-400/60",
    tags: ["Economy Soft-Lock", "One-Way Room Bug", "UI Contrast", "Pacing"],
    devPrompt: "I would love to know how the first 30 minutes of gameplay feels, does the economy make sense? What needs improved? Is there anything you don't understand?",
    summary: "Audited the first 30 minutes of shop-to-greenhouse conversion economy, plant growth timers, and UI ergonomics.",
    positives: [
      "Charming aesthetic and relaxing core premise that hooks you right away."
    ],
    bugsAndFriction: [
      "[ECONOMY SOFT-LOCK] Misassigning a room on the first run drains all starting capital into bankruptcy. While you can convert a Plant Shop into a Greenhouse, there is no option to revert a Greenhouse back into a Plant Shop.",
      "[PACING DOWNTIME] Once all seeds are planted, waiting for growth timers leaves the player with nothing active to do.",
      "[UI CONTRAST] The green 'X' close button blends into the green botanical UI background, and menus don't close when clicking outside the frame.",
      "[AUDIO & CLARITY] Rare petal acquisition/usage is unexplained, and Leaf dialogue voice audio only plays on a few lines."
    ],
    recommendations: [
      "Add an emergency high-interest Loan System so players who misallocate early rooms can recover instead of restarting.",
      "Introduce purchasable shop upgrades like UV Grow Lights to accelerate plant growth and garden customization items to fill downtime.",
      "Allow click-outside-to-close on all modals and increase contrast on the 'X' button."
    ]
  },
  {
    id: "planetary-breach",
    title: "Planetary Breach & Ore Economy",
    developer: "Indie Strategy Dev",
    genre: "Strategy / Turn-Based",
    subGenre: "Space Conquest & Trading Sim",
    playtime: "Tutorial + Easy Campaign",
    videoUrl: null,
    timestampHighlight: "Net Income & Tooltip Audit",
    rating: "Great 'P' Overlay / Needs Economy Tooltips",
    accent: "from-sky-500/20 via-indigo-600/10 to-transparent",
    borderAccent: "hover:border-sky-400/60",
    tags: ["Economy Readability", "Difficulty Spike", "Boarding Loop", "Tooltips"],
    devPrompt: "Did you figure out how to capture a planet (breach it, then land a boarding party), and where did you get stuck? Was anything about money confusing?",
    summary: "Tested planetary breaching, boarding party deployment, and interplanetary ore arbitrage.",
    positives: [
      "Tutorial length is goldilocks—teaches breaching and landing a boarding party clearly.",
      "Pressing 'P' to inspect which planet pays premium rates for ore is a standout, unique trading mechanic."
    ],
    bugsAndFriction: [
      "[ECONOMY CONFUSION] Aside from manually selling ore, passive planetary income constantly fluctuates between + and - without any breakdown of why a world's revenue shifted.",
      "[UNEXPLAINED STATS] Planetary submenu actions like 'Investing', 'Movement Speed', and 'Expand' lack tooltips explaining their mechanical payoff.",
      "[POST-TUTORIAL WALL] Immediate difficulty spike right after the tutorial, compounded by alternative weapons being locked to the full version."
    ],
    recommendations: [
      "Add a hover ledger over the credits counter showing exact +Income sources and -Upkeep drains per captured world.",
      "Unlock at least one secondary weapon archetype in the demo so players can test build variety against post-tutorial enemies."
    ]
  }
];

const ADDITIONAL_CREDITS = [
  { game: "Four Dragons Down", dev: "Indie Collaborator", focus: "Combat Flow & First-Session QA" },
  { game: "Cook to Zero", dev: "Indie Collaborator", focus: "Time-Management Pacing & UI Clarity" },
  { game: "Despiry", dev: "Indie Collaborator", focus: "Atmosphere, Onboarding & Bug Sweep" },
  { game: "Gulovacka vol.2", dev: "Indie Collaborator", focus: "Mechanics Stress-Test & Feedback Report" },
];

const DEV_COLLABORATORS = [
  "vizyn (TEEM)",
  "Nelson V. (Orbit Core)",
  "AthenaStudio (Seagrid Nightfall)",
  "Shroomy (Leif's Garden Tower)",
  "hoonshank (Viscera)",
  "Remanence Dev",
  "Bobddadoo",
  "Aju Mathew",
  "Fabrizio",
  "Drakandes",
  "Tahsin"
];

const GENRE_FILTERS = [
  "All",
  "Roguelite / Bullet Heaven",
  "FPS / Action",
  "Strategy / Turn-Based",
  "Management / Sim"
];

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReport, setActiveReport] = useState(PLAYTEST_VAULT[0]);
  const [modalReport, setModalReport] = useState(null);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const filteredVault = useMemo(() => {
    return PLAYTEST_VAULT.filter((item) => {
      const matchesGenre = selectedGenre === "All" || item.genre === selectedGenre;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGenre && matchesSearch;
    });
  }, [selectedGenre, searchQuery]);

  // Safe clipboard copy utility that falls back to execCommand when iframe permissions block navigator.clipboard
  const safeCopyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      // Fallback handled below when Clipboard API is blocked by permissions policy
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "-9999px";
      textArea.style.left = "-9999px";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      return false;
    }
  };

  const handleCopyDiscord = async () => {
    await safeCopyText(PROFILE.handle);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#04060d] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      {/* Custom Gaming Keyframe Animations & Effects */}
      <style>{`
        @keyframes swingJoystick {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(7deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(4deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(14px) rotate(-5deg); }
        }
        @keyframes scanlineMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        @keyframes neonPulse {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.7)) drop-shadow(0 0 25px rgba(168, 85, 247, 0.5)); }
          50% { filter: drop-shadow(0 0 22px rgba(0, 240, 255, 1)) drop-shadow(0 0 45px rgba(236, 72, 153, 0.8)); }
        }
        @keyframesvisorBlink {
          0%, 92%, 100% { opacity: 1; }
          95% { opacity: 0.2; }
        }
        .animate-swing-joystick {
          transform-origin: top center;
          animation: swingJoystick 4.5s ease-in-out infinite;
        }
        .animate-float-gaming {
          animation: floatSlow 5s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: floatReverse 6s ease-in-out infinite;
        }
        .animate-neon-glow {
          animation: neonPulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* HANGING NEON JOYSTICK ON RIGHT SIDE OF SCREEN */}
      <div className="fixed top-0 right-4 sm:right-10 lg:right-16 z-30 pointer-events-none hidden sm:flex flex-col items-center animate-swing-joystick">
        {/*Glowing Power Cord*/}
        <div className="w-1.5 h-24 lg:h-36 bg-gradient-to-b from-cyan-400 via-purple-500 to-fuchsia-500 shadow-[0_0_15px_#00f0ff] relative">
          <div className="w-3 h-4 bg-slate-800 border border-cyan-400 rounded-sm absolute -bottom-2 -left-[3px]" />
        </div>
        {/* Hanging Cyberpunk Gamepad SVG */}
        <svg
          width="120"
          height="90"
          viewBox="0 0 120 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-neon-glow -mt-1"
        >
          {/* Controller Grips & Body */}
          <path
            d="M25 20 H95 C108 20 116 32 112 52 L106 74 C103 84 91 86 84 76 L74 62 H46 L36 76 C29 86 17 84 14 74 L8 52 C4 32 12 20 25 20 Z"
            fill="#0b1124"
            stroke="url(#padGrad)"
            strokeWidth="3.5"
          />
          {/* Top Bumper Neon Trim */}
          <path d="M35 20 Q60 12 85 20" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
          {/* D-Pad */}
          <path d="M32 36 H38 V42 H44 V48 H38 V54 H32 V48 H26 V42 H32 V36 Z" fill="#00f0ff" />
          {/* Analog Sticks */}
          <circle cx="48" cy="55" r="7" fill="#1e293b" stroke="#a855f7" strokeWidth="2.5" />
          <circle cx="72" cy="55" r="7" fill="#1e293b" stroke="#00f0ff" strokeWidth="2.5" />
          {/* Action Buttons (XYAB) */}
          <circle cx="86" cy="37" r="3.5" fill="#f43f5e" />
          <circle cx="94" cy="44" r="3.5" fill="#10b981" />
          <circle cx="78" cy="44" r="3.5" fill="#38bdf8" />
          <circle cx="86" cy="51" r="3.5" fill="#fbbf24" />
          {/* Center Touchbar */}
          <rect x="51" y="27" width="18" height="8" rx="2" fill="#00f0ff" fillOpacity="0.25" stroke="#00f0ff" strokeWidth="1.2" />
          <defs>
            <linearGradient id="padGrad" x1="0" y1="0" x2="120" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
        </svg>
        <span className="mt-1 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/50 text-[9px] font-mono text-cyan-300 uppercase tracking-widest shadow-[0_0_12px_rgba(0,240,255,0.4)]">
          PLAYER_1 // READY
        </span>
      </div>

      {/* FLOATING PIXEL BOSS & ARCADE OBJECTS IN BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Perspective Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage: `linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
            backgroundSize: '56px 56px'
          }}
        />
        {/* Animated Laser Scanline */}
        <div
          className="w-full h-32 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent absolute top-0 left-0"
          style={{ animation: 'scanlineMove 9s linear infinite' }}
        />

        {/* Floating Pixel Alien Invader Left */}
        <div className="absolute top-[28%] left-[3%] opacity-25 hidden xl:block animate-float-gaming">
          <svg width="84" height="64" viewBox="0 0 11 8" fill="none" className="drop-shadow-[0_0_15px_#a855f7]">
            <path
              d="M2 0H3V1H2V0ZM8 0H9V1H8V0ZM3 1H4V2H3V1ZM7 1H8V2H7V1ZM2 2H9V3H2V2ZM1 3H3V4H1V3ZM4 3H7V4H4V3ZM8 3H10V4H8V3ZM0 4H11V6H0V4ZM0 6H1V7H0V6ZM2 6H3V7H2V6ZM8 6H9V7H8V6ZM10 6H11V7H10V6ZM3 7H5V8H3V7ZM6 7H8V8H6V7Z"
              fill="#c084fc"
            />
          </svg>
        </div>

        {/* Floating Cyber D20 / Loot Cube Right */}
        <div className="absolute top-[62%] right-[3%] opacity-30 hidden xl:block animate-float-reverse">
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_20px_#00f0ff]">
            <polygon points="50,5 95,28 95,72 50,95 5,72 5,28" stroke="#00f0ff" strokeWidth="3" fill="#061226" />
            <line x1="50" y1="5" x2="50" y2="50" stroke="#a855f7" strokeWidth="2" />
            <line x1="95" y1="28" x2="50" y2="50" stroke="#00f0ff" strokeWidth="2" />
            <line x1="5" y1="28" x2="50" y2="50" stroke="#00f0ff" strokeWidth="2" />
            <line x1="50" y1="95" x2="50" y2="50" stroke="#f43f5e" strokeWidth="2" />
            <circle cx="50" cy="50" r="6" fill="#00f0ff" />
          </svg>
        </div>

        {/* Glowing Nebula Orbs */}
        <div className="absolute top-[-10%] left-[12%] w-[560px] h-[560px] bg-cyan-500/20 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] right-[5%] w-[520px] h-[520px] bg-fuchsia-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[25%] w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[150px]" />
      </div>

      {/* Top Sticky Telemetry Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#06080f]/85 border-b border-cyan-500/25 shadow-[0_4px_30px_rgba(0,240,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.35)]">
              <Gamepad2 className="w-5 h-5 text-cyan-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-white text-base sm:text-lg">
                  SHUK<span className="text-cyan-400">1790</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/40 rounded-md">
                  LVL 99 // QA BOSS HUNTER
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Mohammed Abdul Shukoor • Indie Game Bug Hunter & Analyst
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-300">
            <a href="#vault" className="hover:text-cyan-400 transition-colors">Playtest Vault</a>
            <a href="#methodology" className="hover:text-cyan-400 transition-colors">QA Powers</a>
            <a href="#rig" className="hover:text-cyan-400 transition-colors">Battle Rig</a>
            <a href="#discord-hq" className="hover:text-cyan-400 transition-colors">Discord HQ</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={PROFILE.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCopyDiscord}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all cursor-pointer"
              title="Copies shuk1790 & opens Discord"
            >
              <MessageSquare className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span className="font-mono">
                {copiedDiscord ? "Copied: shuk1790!" : `Discord: ${PROFILE.handle}`}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-200" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-20">
        
        {/* HERO SECTION WITH ANIMATED CYBER-GAMER CHARACTER & ARCADE HUD */}
        <section className="relative rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-br from-[#0b1124]/95 via-[#070b18]/95 to-[#130924]/95 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_0_70px_rgba(0,240,255,0.15)]">
          {/* Glowing Arcade Frame Corners */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cyan-400 rounded-tl-3xl pointer-events-none shadow-[-5px_-5px_20px_rgba(0,240,255,0.5)]" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-fuchsia-500 rounded-br-3xl pointer-events-none shadow-[5px_5px_20px_rgba(217,70,239,0.5)]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Top Player Status Bar */}
              <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-mono shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE // {PROFILE.status}</span>
                <span className="text-slate-500">|</span>
                <span className="text-cyan-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {PROFILE.location}
                </span>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-fuchsia-400">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                  ULTRA PRO MAX QA OPERATIVE // BOSS-LEVEL BUG HUNTER
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.06]">
                  I Break Your Game{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.35)]">
                    Before Players Do.
                  </span>
                </h1>
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Yo! I’m <strong className="text-white font-bold">{PROFILE.name}</strong> (<code className="text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-400/50 font-mono">@{PROFILE.handle}</code>). 
                I dive into indie builds blind, hunt down <span className="text-cyan-300 font-semibold">UI collisions</span>, <span className="text-fuchsia-300 font-semibold">economy dead-ends</span>, and <span className="text-amber-300 font-semibold">brutal AI spikes</span>, and deliver timestamped 60FPS OBS gameplay recordings so you can ship a legendary game.
              </p>

              {/* High-Voltage Gaming Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#discord-hq"
                  onClick={handleCopyDiscord}
                  className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 shadow-[0_0_35px_rgba(0,240,255,0.5)] hover:shadow-[0_0_50px_rgba(0,240,255,0.85)] hover:scale-[1.02] transition-all"
                >
                  <MessageSquare className="w-5 h-5 fill-slate-950" />
                  <span>DM ME ON DISCORD: {PROFILE.handle}</span>
                </a>

                <a
                  href="#vault"
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-sm sm:text-base bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border-2 border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all"
                >
                  <Video className="w-5 h-5 text-fuchsia-400" />
                  <span>Watch 5 Playtest VODs</span>
                </a>
              </div>

              {/* Collaborator Ticker */}
              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> INDIE DEVS & STUDIOS IN MY PARTY:
                </p>
                <div className="flex flex-wrap gap-2">
                  {DEV_COLLABORATORS.map((dev, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900/95 text-slate-200 border border-purple-500/30 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                    >
                      {dev}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Animated Cyber-Assassin Character & Live Boss HUD */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-[#060914]/95 border-2 border-fuchsia-500/40 p-5 sm:p-6 shadow-[0_0_60px_rgba(168,85,247,0.2)] space-y-5 overflow-hidden">
                {/* Animated Cyber-Ninja / Mecha QA Avatar Illustration */}
                <div className="relative rounded-2xl bg-gradient-to-b from-indigo-950/60 via-slate-950 to-slate-950 border border-cyan-500/30 p-4 flex items-center gap-4 overflow-hidden">
                  {/* Floating Gaming Avatar SVG */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 animate-float-gaming">
                    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                      {/* Outer Hex Shield */}
                      <polygon
                        points="60,4 110,30 110,90 60,116 10,90 10,30"
                        fill="#091326"
                        stroke="url(#avatarGrad)"
                        strokeWidth="4"
                      />
                      {/* Mecha Helmet & Hood */}
                      <path
                        d="M32 45 C32 24 88 24 88 45 L92 78 C92 92 78 102 60 102 C42 102 28 92 28 78 Z"
                        fill="#1e1b4b"
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                      />
                      {/* Glowing Cyber Horns / Headset Mic */}
                      <path d="M26 52 L14 40 L24 66 Z" fill="#f43f5e" />
                      <path d="M94 52 L106 40 L96 66 Z" fill="#00f0ff" />
                      {/* Glowing Neon Visor */}
                      <path
                        d="M36 54 L60 63 L84 54 L80 68 L60 74 L40 68 Z"
                        fill="#00f0ff"
                      />
                      {/* Visor Targeting Reticle */}
                      <circle cx="72" cy="61" r="4" fill="#f43f5e" />
                      {/* Cyber Mask Grille */}
                      <path d="M46 82 H74 M50 89 H70" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="avatarGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#00f0ff" />
                          <stop offset="50%" stopColor="#d946ef" />
                          <stop offset="100%" stopColor="#f43f5e" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Character Stats & HP/XP Bars */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-cyan-300 tracking-wider">
                        CHAR // SHUK1790
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/50 text-[10px] font-mono text-amber-300 font-bold">
                        RANK: S+
                      </span>
                    </div>

                    {/* HP Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-emerald-400">HP // PATIENCE AGAINST BUGS</span>
                        <span className="text-white">999 / 999</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden p-0.5">
                        <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_10px_#10b981]" />
                      </div>
                    </div>

                    {/* XP Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-fuchsia-400">ULTIMATE // TIMESTAMP PRECISION</span>
                        <span className="text-white">MAXED</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden p-0.5">
                        <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 shadow-[0_0_10px_#d946ef]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Metric Boxes */}
                <div className="grid grid-cols-2 gap-3">
                  {PROFILE.stats.map((stat, i) => {
                    const IconComp = stat.icon;
                    return (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/50 transition-all flex flex-col justify-between group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase text-slate-400">
                            {stat.label}
                          </span>
                          <IconComp className={`w-4 h-4 ${stat.color} group-hover:scale-125 transition-transform`} />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-white mt-2">
                          {stat.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Featured Real Bug Catch Preview */}
                <div className="rounded-xl bg-gradient-to-br from-rose-950/50 via-slate-900/95 to-slate-900 border border-rose-500/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                      CRITICAL HIT // VERIFIED BUG CATCH
                    </span>
                    <span className="text-[11px] font-mono text-amber-300">
                      TEEM • @ 06:11 VOD
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    “Tutorial <span className="text-amber-300 font-medium">Evolve popup (Lesson 10/16)</span> collides directly with the <span className="text-rose-300 font-medium">GORE Big Bite</span> card, blocking the 25% wound damage stat.”
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Screenshot + VOD Attached
                    </span>
                    <a
                      href="https://youtu.be/Vk2NV2H505Q"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-cyan-300 hover:text-cyan-200 underline flex items-center gap-1"
                    >
                      Watch @ 6:11 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: QA METHODOLOGY & WHAT I TEST FOR */}
        <section id="methodology" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">
                DIAGNOSTIC PROTOCOL // HOW I ANALYZE YOUR BUILD
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                4-Pillar Indie QA Architecture
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Developers don’t just need “it was fun.” You need actionable answers on where players get confused, why the economy breaks, and exact timestamps of UI glitches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Eye,
                badge: "01 // ONBOARDING",
                title: "First-30-Min Blind UX",
                desc: "I record my genuine first impression without external guides—pinpointing the exact moment mechanics click or where tutorial popups overwhelm the player.",
                accent: "border-cyan-500/30 hover:border-cyan-400"
              },
              {
                icon: TrendingUp,
                badge: "02 // ECONOMY & FLOW",
                title: "Economy & Soft-Lock Audits",
                desc: "Testing edge-case spending (like irreversible Greenhouse conversions in Leif's Garden Tower or unexplained +/- planetary income swings) to prevent run-ending dead ends.",
                accent: "border-purple-500/30 hover:border-purple-400"
              },
              {
                icon: Layers,
                badge: "03 // INTERFACE",
                title: "UI Collision & Contrast Checks",
                desc: "Catching overlapping tutorial cards (TEEM @ 6:11), non-dismissible hint popups (Seagrid Nightfall @ 9:01), and camouflaged close buttons.",
                accent: "border-emerald-500/30 hover:border-emerald-400"
              },
              {
                icon: Zap,
                badge: "04 // COMBAT & AI",
                title: "Difficulty & Target Priority",
                desc: "Evaluating swarm target-splitting, 1v4 AI surrounding speed (Viscera), zero-G recoil scaling (Remanence), and boss add-spawn density (Orbit Core).",
                accent: "border-amber-500/30 hover:border-amber-400"
              }
            ].map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className={`rounded-2xl bg-slate-900/60 backdrop-blur-md border ${pillar.accent} p-6 transition-all duration-300 flex flex-col justify-between group`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                        {pillar.badge}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span>Timestamped Report</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE PLAYTEST VAULT */}
        <section id="vault" className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">
                <Video className="w-4 h-4" /> VERIFIED CASE STUDIES & GAMEPLAY RECORDINGS
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                The Playtest Vault
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Click any game report below to inspect the developer's prompt, my exact findings, bug timestamps, and watch the YouTube gameplay VOD.
              </p>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search game, dev, or bug tag..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Genre Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> FILTER:
            </span>
            {GENRE_FILTERS.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedGenre === genre
                    ? "bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    : "bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Vault Split View: Interactive Cards + Active Report Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left List: Game Cards (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredVault.map((report) => {
                const isSelected = activeReport?.id === report.id;
                return (
                  <div
                    key={report.id}
                    onClick={() => setActiveReport(report)}
                    className={`group relative rounded-2xl p-5 transition-all duration-200 cursor-pointer border bg-gradient-to-br ${
                      report.accent
                    } ${
                      isSelected
                        ? "border-cyan-400 bg-slate-900/95 shadow-[0_0_30px_rgba(0,240,255,0.15)]"
                        : `border-slate-800/90 bg-slate-900/60 ${report.borderAccent}`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                          {report.subGenre}
                        </span>
                        <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                          {report.title}
                        </h3>
                        <p className="text-xs text-slate-400">
                          Dev: <span className="text-slate-200 font-medium">{report.developer}</span> • {report.playtime}
                        </p>
                      </div>

                      {report.videoUrl ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0">
                          <Play className="w-3 h-3 fill-rose-400 text-rose-400" /> VOD
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shrink-0">
                          <Bug className="w-3 h-3" /> Report
                        </span>
                      )}
                    </div>

                    {/* Highlight Pill */}
                    <div className="mb-3 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800/90 text-xs font-mono text-amber-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{report.timestampHighlight}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                      {report.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {report.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalReport(report);
                        }}
                        className="text-xs font-semibold text-cyan-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <span>Full QA Breakdown</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {report.videoUrl && (
                        <a
                          href={report.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 transition-colors"
                        >
                          <Video className="w-3.5 h-3.5" />
                          Watch Gameplay
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Inspector Panel: Detailed QA Dossier (5 Cols Sticky) */}
            {activeReport && (
              <div className="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl bg-[#080d1a] border border-cyan-500/40 p-6 shadow-[0_0_50px_rgba(0,240,255,0.1)] space-y-5">
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        ACTIVE QA DOSSIER
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {activeReport.playtime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white mt-1.5">
                      {activeReport.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Developer: <span className="text-cyan-300 font-semibold">{activeReport.developer}</span> • {activeReport.subGenre}
                    </p>
                  </div>

                  {activeReport.videoUrl && (
                    <a
                      href={activeReport.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Open YouTube VOD
                    </a>
                  )}
                </div>

                {/* Developer Question Answered */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                    DEVELOPER TESTING PROMPT:
                  </p>
                  <p className="text-xs italic text-slate-300 leading-relaxed">
                    “{activeReport.devPrompt}”
                  </p>
                </div>

                {/* Positives */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> What Worked Well (Positives)
                  </h4>
                  <ul className="space-y-1.5">
                    {activeReport.positives.map((pos, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{pos}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bugs & Friction */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Bug className="w-4 h-4" /> Bugs, Glitches & Friction Points Caught
                  </h4>
                  <ul className="space-y-2">
                    {activeReport.bugsAndFriction.map((bug, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-slate-200 bg-rose-950/25 border border-rose-500/25 rounded-xl p-2.5 leading-relaxed"
                      >
                        {bug}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actionable Design Suggestions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Actionable Suggestions Proposed
                  </h4>
                  <ul className="space-y-1.5">
                    {activeReport.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">→</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Additional Playtest Credits Bar */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
                  EXTENDED PLAYTEST LOG // ADDITIONAL INDIE CREDITS
                </span>
                <h3 className="text-lg font-bold text-white">
                  More Indie Titles Tested by shuk1790
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                100% Completion & Feedback Delivered
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {ADDITIONAL_CREDITS.map((credit, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-white text-sm">{credit.game}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{credit.focus}</p>
                  </div>
                  <Award className="w-5 h-5 text-cyan-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: HARDWARE BENCHMARK RIG & RECORDING SPECS */}
        <section id="rig" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">
                HARDWARE TELEMETRY // BENCHMARK ENVIRONMENT
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                Testing Rig & Capture Pipeline
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Every playtest is executed on consistent, thermally controlled hardware so frame-drop reports and audio sync notes are reliable and reproducible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HARDWARE_SPECS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 p-6 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                      <IconComp className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-xs font-mono text-purple-300">{item.subtitle}</p>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                    {item.category}
                  </div>
                </div>
              );
            })}

            {/* Bonus Card: Why Mid-Tier Testing Matters */}
            <div className="rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-purple-950/30 border border-cyan-500/30 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  DEVELOPER ADVANTAGE
                </span>
                <h3 className="text-lg font-bold text-white">
                  Why Intel Core Ultra 5 Testing Matters for Steam Demos
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Most Steam Next Fest players aren’t running RTX 4090s. Testing on an <strong className="text-white">ASUS Vivobook 14 (Core Ultra 5 225H)</strong> surfaces real-world frame drops, mouse sensitivity scaling issues under load, and UI legibility on 14-inch 1080p displays.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-300">
                <span>OBS 720p/60fps Ready</span>
                <span>YouTube Unlisted VODs</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: ULTRA GAMING DISCORD PORTAL (REPLACED FORM & REMOVED REDDIT) */}
        <section
          id="discord-hq"
          className="relative rounded-3xl bg-gradient-to-r from-[#0d1229] via-[#170e30] to-[#09192b] border-2 border-cyan-400/50 p-8 sm:p-12 overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.2)]"
        >
          {/* Floating Decorative Gaming Objects inside Portal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-300 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> READY TO SQUAD UP? // SEND YOUR BUILD
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Drop Me a Message Directly on{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Discord
                </span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                No complicated forms needed. Just add or DM me on Discord at{" "}
                <span className="text-cyan-300 font-mono font-bold bg-cyan-950/90 px-2.5 py-1 rounded-lg border border-cyan-400/50">
                  {PROFILE.handle}
                </span>{" "}
                with your Steam key or Itch.io build link, and tell me what you want tested!
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href={PROFILE.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCopyDiscord}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-base bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-slate-950 shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-5 h-5 fill-slate-950" />
                  <span>Open Discord & Message {PROFILE.handle}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={handleCopyDiscord}
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl font-mono font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border-2 border-cyan-400/50 transition-all cursor-pointer"
                >
                  {copiedDiscord ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-300">Copied: {PROFILE.handle}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>Copy Username: {PROFILE.handle}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Animated Neon Arcade Trophy / Controller Badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative p-6 rounded-3xl bg-slate-950/80 border-2 border-fuchsia-500/40 shadow-[0_0_50px_rgba(217,70,239,0.25)] flex flex-col items-center text-center space-y-3 animate-float-gaming">
                <svg width="110" height="90" viewBox="0 0 120 90" fill="none" className="animate-neon-glow">
                  <path
                    d="M25 20 H95 C108 20 116 32 112 52 L106 74 C103 84 91 86 84 76 L74 62 H46 L36 76 C29 86 17 84 14 74 L8 52 C4 32 12 20 25 20 Z"
                    fill="#111827"
                    stroke="#00f0ff"
                    strokeWidth="3.5"
                  />
                  <path d="M32 36 H38 V42 H44 V48 H38 V54 H32 V48 H26 V42 H32 V36 Z" fill="#d946ef" />
                  <circle cx="86" cy="37" r="4" fill="#f43f5e" />
                  <circle cx="94" cy="44" r="4" fill="#10b981" />
                  <circle cx="78" cy="44" r="4" fill="#00f0ff" />
                  <circle cx="86" cy="51" r="4" fill="#fbbf24" />
                </svg>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    DISCORD TAG
                  </p>
                  <p className="text-2xl font-black font-mono text-cyan-300 tracking-wide">
                    {PROFILE.handle}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-mono text-emerald-300">
                  ● Fast Response for Indie Devs
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL FOR FULL QA REPORT INSPECTION */}
      {modalReport && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setModalReport(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#080d1a] border border-cyan-400/50 p-6 sm:p-8 shadow-2xl space-y-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400">
                  COMPLETE QA REPORT // {modalReport.subGenre}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {modalReport.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Developer: <span className="text-white font-medium">{modalReport.developer}</span> • Playtime: {modalReport.playtime}
                </p>
              </div>
              <button
                onClick={() => setModalReport(null)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <p className="text-[10px] font-mono uppercase text-purple-400">
                DEVELOPER QUESTION ANSWERED:
              </p>
              <p className="text-xs sm:text-sm italic text-slate-200">
                “{modalReport.devPrompt}”
              </p>
            </div>

            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
              <div>
                <h4 className="text-xs font-mono uppercase text-emerald-400 mb-2">
                  ✓ Positives & Highlights
                </h4>
                <ul className="space-y-1.5">
                  {modalReport.positives.map((p, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-rose-400 mb-2">
                  ⚠ Bugs, Glitches & Balance Friction
                </h4>
                <ul className="space-y-2">
                  {modalReport.bugsAndFriction.map((b, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-200 bg-rose-950/30 border border-rose-500/30 p-3 rounded-xl"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-cyan-400 mb-2">
                  ★ Proposed Game Design & UI Improvements
                </h4>
                <ul className="space-y-1.5">
                  {modalReport.recommendations.map((r, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              {modalReport.videoUrl ? (
                <a
                  href={modalReport.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-rose-500 hover:bg-rose-400 text-white transition-all"
                >
                  <Video className="w-4 h-4" />
                  Watch Uncut Gameplay Recording on YouTube
                </a>
              ) : (
                <span className="text-xs font-mono text-slate-400">
                  Written Structured QA Audit Delivered
                </span>
              )}

              <button
                onClick={() => setModalReport(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#04060b] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Mohammed Abdul Shukoor</span>
            <span>•</span>
            <span className="font-mono text-cyan-400">Discord: {PROFILE.handle}</span>
          </div>
          <p className="font-mono text-[11px] text-slate-500">
            INDIE GAME QA PLAYTESTER & BUG HUNTER PORTFOLIO // HYDERABAD, IN
          </p>
        </div>
      </footer>
    </div>
  );
}