"use client"

import { useState } from "react"
import {
  Wand2,
  ImageIcon,
  RefreshCw,
  Send,
  Sparkles,
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getCurrentYear, getDynamicTitle } from "@/lib/auto-updater"

interface GeneratedPost {
  title: string
  content: string
  hashtags: string[]
  imagePrompt: string
  imageUrl: string
  category: string
  typeSafeCategory: string
  confidence: number
}

export default function AIPostGenerator() {
  const currentYear = getCurrentYear()
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("computer-science")
  const [postingSchedule, setPostingSchedule] = useState("now")
  const [scheduledNotification, setScheduledNotification] = useState<string | null>(null)

  const categories = [
    { id: "computer-science", name: "Computer Science", icon: "💻", typeSafeCat: "computation" },
    { id: "programming", name: "Programming Tips", icon: "🚀", typeSafeCat: "retrieval" },
    { id: "tech-news", name: "Tech Trends", icon: "📱", typeSafeCat: "retrieval" },
    { id: "algorithms", name: "Algorithms", icon: "🧮", typeSafeCat: "computation" },
    { id: "career", name: "Tech Career", icon: "💼", typeSafeCat: "user_interaction" },
    { id: "tutorials", name: "Tutorials", icon: "📚", typeSafeCat: "retrieval" },
  ]

  const samplePosts: Record<string, Omit<GeneratedPost, "typeSafeCategory" | "confidence">> = {
    "computer-science": {
      title: `🔥 The Frontier of Quantum Computing in ${currentYear}`,
      content: `Quantum computing is revolutionizing fundamental problem-solving! 🌟\n\nDid you know that quantum hardware can process polynomial-time simulations exponentially faster than classical machines?\n\n🔹 Qubits exhibit quantum superposition and entanglement\n🔹 Quantum phase estimation accelerates complex molecular discovery\n🔹 Hybrid quantum-classical algorithms are driving near-term industry breakthroughs\n\nMajor research labs are accelerating deployments for ${currentYear} and beyond.\n\nWhat quantum breakthrough are you most anticipating? Drop your thoughts below! 👇`,
      hashtags: [
        "#QuantumComputing",
        "#TechInnovation",
        `#FutureOfTech${currentYear}`,
        "#ComputerScience",
        "#QuantumPhysics",
      ],
      imagePrompt: "Futuristic quantum compute core with laser lattice and holographic qubits",
      imageUrl: "/placeholder.svg?height=400&width=600&text=Quantum+Architecture",
      category: "Computer Science",
    },
    programming: {
      title: `💡 5 Modern TypeScript Patterns for ${currentYear}`,
      content: `Level up your software architecture with these modern TypeScript techniques: ⚡\n\n1️⃣ **Satisfies Operator** — Validate shape without widening inferred literals\n2️⃣ **Template Literal Types** — Build strictly typed event routers\n3️⃣ **Const Type Parameters** — Preserve immutable object schemas without 'as const'\n4️⃣ **Tagged Unions** — Ensure exhaustive pattern matching at compile-time\n5️⃣ **TypeSafe System One Primitives** — Turn natural language judgments into typed booleans and choices\n\nWhich pattern do you use most in production? Share your workflow! 🚀`,
      hashtags: ["#TypeScript", "#CleanCode", "#SoftwareEngineering", "#WebDev", `#Code${currentYear}`],
      imagePrompt: "Minimalist IDE editor showing elegant TypeScript interfaces with subtle glow",
      imageUrl: "/placeholder.svg?height=400&width=600&text=TypeScript+Architecture",
      category: "Programming",
    },
    algorithms: {
      title: `🧠 Mastering Big-O & Space Complexity in ${currentYear}`,
      content: `Demystifying algorithmic scalability in 60 seconds! ⚡\n\n🎯 **Why Asymptotic Analysis Matters:**\nAs data sizes scale to millions of items, an O(N²) quadratic algorithm grinds to a halt while an O(N log N) algorithm breezes through.\n\n📊 **Key Benchmarks:**\n• O(1) — Constant Time (Hash Map lookup)\n• O(log N) — Logarithmic (Binary Search)\n• O(N) — Linear (Single scan)\n• O(N log N) — Quicksort & Mergesort\n\n💡 Pro tip: Always measure both CPU runtime and memory allocations!\n\nWhat algorithmic optimization saved your last project? 👇`,
      hashtags: ["#Algorithms", "#DataStructures", "#BigO", "#TechInterview", "#ComputerScience"],
      imagePrompt: "High-contrast clean complexity graph showing logarithmic and linear curves",
      imageUrl: "/placeholder.svg?height=400&width=600&text=Algorithm+Complexity+Curves",
      category: "Algorithms",
    },
    "tech-news": {
      title: `📱 Apple Liquid Glass & Spatial Web Standards in ${currentYear}`,
      content: `Interface engineering is entering a new era of spatial depth and physical motion! \n\n🔹 **Optical Refraction & Lensing** — Real-time backdrop shaders adapt dynamically to underlying content luminance\n🔹 **Spring Physics over Linear Easing** — Interruptible velocity handoffs make web apps feel tactile and responsive\n🔹 **On-Device System One Models** — Zero-latency semantic routing directly in the browser runtime\n\nHow are you adopting spatial UI principles in your ${currentYear} applications? Share below! ✨`,
      hashtags: ["#AppleDesign", "#LiquidGlass", "#FrontendEngineering", `#WebStandards${currentYear}`, "#UIUX"],
      imagePrompt: "Translucent Liquid Glass spatial layers floating over dark titanium grid",
      imageUrl: "/placeholder.svg?height=400&width=600&text=Liquid+Glass+UI",
      category: "Tech Trends",
    },
    career: {
      title: `💼 Staff Engineer System Design Roadmap for ${currentYear}`,
      content: `Transitioning from Senior to Staff Engineer requires shifting from code execution to architectural leverage: 🎯\n\n1️⃣ **Bounded Contexts & API Contracts** — Design interfaces that allow 10+ teams to ship independently\n2️⃣ **Observability & SLO Discipline** — Measure p99 tail latency, error budgets, and durable queue backpressure\n3️⃣ **Deterministic AI Orchestration** — Combine TypeSafe Choice primitives with idempotent workflow steps\n\nWhat engineering principle made the biggest impact on your career? 👇`,
      hashtags: ["#SoftwareArchitecture", "#StaffEngineer", "#TechCareer", `#SystemDesign${currentYear}`, "#EngineeringLeadership"],
      imagePrompt: "Distributed cloud topology blueprint with glowing telemetry nodes",
      imageUrl: "/placeholder.svg?height=400&width=600&text=System+Design+Blueprint",
      category: "Tech Career",
    },
    tutorials: {
      title: `📚 Building Durable Full-Stack Apps with Next.js & TypeSafe (${currentYear})`,
      content: `Step-by-step architectural guide to building crash-safe, high-throughput web applications: 🛠️\n\n✅ **Step 1:** Configure React Server Components for zero-bundle-size data fetching\n✅ **Step 2:** Wire TypeSafe System One Choice primitives for sub-15ms semantic classification\n✅ **Step 3:** Add perpetual temporal scheduling so your content & roadmaps auto-update every year\n\nBookmark this guide for your next production deployment! 🚀`,
      hashtags: ["#NextJS", "#React19", "#TypeSafeAI", "#FullStackTutorial", `#WebDev${currentYear}`],
      imagePrompt: "Interactive code sandbox showing live React Server Components and TypeSafe pipeline",
      imageUrl: "/placeholder.svg?height=400&width=600&text=FullStack+Architecture",
      category: "Tutorials",
    },
  }

  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>({
    ...samplePosts["computer-science"],
    typeSafeCategory: "computation",
    confidence: 0.94,
  })

  const generatePost = async () => {
    setIsGenerating(true)
    setScheduledNotification(null)

    await new Promise((resolve) => setTimeout(resolve, 1400))

    const catObj = categories.find((c) => c.id === selectedCategory) || categories[0]
    const basePost = samplePosts[selectedCategory] || samplePosts["computer-science"]

    setGeneratedPost({
      ...basePost,
      title: getDynamicTitle(basePost.title),
      typeSafeCategory: catObj.typeSafeCat,
      confidence: +(0.88 + Math.random() * 0.1).toFixed(2),
    })

    setIsGenerating(false)
  }

  const schedulePost = () => {
    const timeLabel =
      postingSchedule === "now"
        ? "immediate publication"
        : postingSchedule === "1hour"
        ? "today in 1 hour"
        : postingSchedule === "tomorrow"
        ? "tomorrow at 9:00 AM"
        : `scheduled peak slot in ${currentYear}`

    setScheduledNotification(`✅ Post queued for ${timeLabel}! Track progress in Publisher & Analytics.`)
    setTimeout(() => {
      setScheduledNotification(null)
    }, 4500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner - Apple Liquid Glass */}
      <div className="apple-card p-6 border border-black/[0.06] dark:border-white/[0.08] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                AI Post Synthesis Studio
              </h2>
              <Badge variant="apple" className="ml-2 text-[10px]">
                {currentYear} Edition
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Generate technically rigorous, aesthetically refined developer posts with TypeSafe Choice categorization.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071E3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071E3]"></span>
            </span>
            <span className="text-xs text-gray-500 font-medium">TypeSafe Jev Engine Active</span>
          </div>
        </div>
      </div>

      {/* Control Surface */}
      <div className="apple-card p-6 border border-black/[0.06] dark:border-white/[0.08]">
        <div className="space-y-5">
          {/* Category Chips Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
              Select Topic Domain
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-semibold transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? "bg-[#0071E3] text-white border-[#0071E3] shadow-md shadow-[#0071E3]/20"
                        : "bg-white/60 dark:bg-[#2C2C2E]/60 hover:bg-white dark:hover:bg-[#2C2C2E] border-black/[0.06] dark:border-white/[0.08] text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-xl mb-1">{category.icon}</span>
                    <span className="truncate w-full text-center">{category.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Schedule & Generate Action Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Posting Schedule
              </label>
              <select
                value={postingSchedule}
                onChange={(e) => setPostingSchedule(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#2C2C2E] border border-black/[0.08] dark:border-white/[0.1] rounded-xl text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
              >
                <option value="now">Immediate Publish</option>
                <option value="1hour">Queued (+1 Hour)</option>
                <option value="tomorrow">Tomorrow Morning (9:00 AM)</option>
                <option value="peak">Optimal Peak Slot ({currentYear})</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-end">
              <Button
                onClick={generatePost}
                disabled={isGenerating}
                className="w-full h-10 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs tracking-tight shadow-md active:scale-98 transition-all"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Synthesizing with TypeSafe Primitives...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate & Classify Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {scheduledNotification && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{scheduledNotification}</span>
        </div>
      )}

      {/* Generated Post Preview */}
      {generatedPost && (
        <div className="apple-card p-6 border border-black/[0.06] dark:border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-[#0071E3]" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Synthesized Post Preview</h3>
            </div>

            {/* TypeSafe Choice Classification Badge */}
            <div className="flex items-center space-x-2">
              <Badge variant="apple" className="text-[11px] gap-1.5 py-1">
                <Cpu className="w-3 h-3 text-[#0071E3]" />
                <span className="text-gray-500 dark:text-gray-400">TypeSafe Choice:</span>
                <span className="font-bold text-gray-900 dark:text-white">{generatedPost.typeSafeCategory}</span>
                <span className="text-[#34C759]">({(generatedPost.confidence * 100).toFixed(0)}%)</span>
              </Badge>
            </div>
          </div>

          {/* Social Card Mockup */}
          <div className="max-w-xl mx-auto bg-white dark:bg-[#1C1C1E] rounded-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-lg overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06]">
              <div className="flex items-center space-x-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-gradient-to-tr from-[#0071E3] to-[#AF52DE] text-white text-xs font-bold">
                    CS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">CS Academy Studio</h4>
                  <div className="flex items-center text-[10px] text-gray-400 space-x-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>Dynamic Year Scheduled: {currentYear}</span>
                  </div>
                </div>
              </div>
              <Badge variant="apple" className="text-[10px]">
                {generatedPost.category}
              </Badge>
            </div>

            <div className="p-4 space-y-2.5">
              <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">
                {generatedPost.title}
              </h3>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {generatedPost.content}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {generatedPost.hashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold text-[#0071E3] dark:text-[#5AC8FA] hover:underline cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated Post Banner */}
            <div className="relative h-44 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-6 text-center">
              <div className="space-y-1.5">
                <Layers className="w-8 h-8 text-[#0071E3] mx-auto animate-pulse" />
                <div className="text-xs font-bold text-white tracking-wide uppercase">
                  {generatedPost.imagePrompt}
                </div>
                <div className="text-[10px] text-white/60">Automated High-Resolution Canvas • {currentYear}</div>
              </div>
            </div>

            {/* Bottom Publishing Actions */}
            <div className="p-3 bg-gray-50 dark:bg-black/40 flex items-center justify-between border-t border-black/[0.04] dark:border-white/[0.06]">
              <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center space-x-1.5">
                <span>Predicted Engagement:</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">2.4K+ Developers</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={generatePost}
                  className="h-8 px-2.5 text-xs text-gray-600 dark:text-gray-300 rounded-xl"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Regenerate
                </Button>

                <Button
                  size="sm"
                  onClick={schedulePost}
                  className="h-8 px-3 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  {postingSchedule === "now" ? "Publish Live" : "Queue Post"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
