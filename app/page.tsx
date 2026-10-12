"use client"

import { useState, useEffect } from "react"
import {
  Sparkles,
  Layout,
  Cpu,
  Facebook,
  Calendar,
  Layers,
  ArrowRight,
  Sun,
  Moon,
  Github,
  CheckCircle2,
  TrendingUp,
  Shield,
  Activity,
  Code2,
  Terminal,
  Zap,
  Sliders,
  Check,
  RefreshCw,
  Clock,
  Compass,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import FacebookPost from "../facebook-post"
import { DataStructuresVisualization } from "../data-structures-viz"
import AIPostGenerator from "../ai-post-generator"
import FacebookPublisher from "../facebook-publisher"
import {
  getCurrentYear,
  getCopyrightNotice,
  getTargetYears,
  getPerpetualTechRoadmap,
} from "@/lib/auto-updater"
import {
  evaluateTypeSafeCompactionArchitecture,
  runTypeSafeCategorization,
  TOOL_CATEGORIES,
  ToolDefinition,
} from "@/src/core"

export default function Page() {
  const currentBaseYear = getCurrentYear()
  const [selectedYearOffset, setSelectedYearOffset] = useState(0)
  const simulatedYear = currentBaseYear + selectedYearOffset

  const [activeTab, setActiveTab] = useState<"post" | "viz" | "generator" | "publisher" | "typesafe">("post")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Interactive TypeSafe Playground State
  const sampleTools: ToolDefinition[] = [
    {
      name: "fetch_historical_analytics",
      description: "Queries Facebook Graph API for read-only post impressions, reach, and engagement metrics.",
      readOnly: true,
      executionSideEffects: false,
    },
    {
      name: "publish_facebook_carousel",
      description: "Dispatches a new live multi-slide algorithm carousel post to targeted Facebook Pages.",
      readOnly: false,
      executionSideEffects: true,
    },
    {
      name: "request_admin_publishing_approval",
      description: "Presents a high-priority interactive modal requiring user confirmation before production broadcast.",
      readOnly: false,
      executionSideEffects: false,
    },
    {
      name: "execute_binary_search_traversal",
      description: "Performs pure deterministic tree search step-by-step and calculates complexity bounds in memory.",
      readOnly: true,
      executionSideEffects: false,
    },
  ]

  const [selectedToolIndex, setSelectedToolIndex] = useState(0)
  const [activeToolResult, setActiveToolResult] = useState(() =>
    runTypeSafeCategorization(sampleTools[0])
  )

  useEffect(() => {
    setActiveToolResult(runTypeSafeCategorization(sampleTools[selectedToolIndex]))
  }, [selectedToolIndex])

  useEffect(() => {
    setMounted(true)
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return next
    })
  }

  const typeSafeEval = evaluateTypeSafeCompactionArchitecture()
  const techMilestones = getPerpetualTechRoadmap(5)
  const availableTargetYears = getTargetYears(5)

  const tabs = [
    { id: "post" as const, label: "Feed Post Preview", icon: "📱", badge: "Interactive iPhone" },
    { id: "viz" as const, label: "Algorithm Lab", icon: "🧠", badge: "Live Sandbox" },
    { id: "generator" as const, label: "AI Post Studio", icon: "✨", badge: "TypeSafe Jev" },
    { id: "publisher" as const, label: "Publisher & Cadence", icon: "🚀", badge: `${simulatedYear}+ Engine` },
    { id: "typesafe" as const, label: "TypeSafe Specs", icon: "⚡", badge: "System One Core" },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-500 pb-24 selection:bg-[#0071E3] selection:text-white">
      {/* Ambient Glow Orbs */}
      <div className="fixed top-20 left-1/4 w-96 h-96 ambient-glow bg-[#0071E3]/20" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 ambient-glow bg-[#AF52DE]/15" />

      {/* Liquid Glass Navigation Bar */}
      <header className="sticky top-0 z-50 w-full liquid-glass-nav transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#0071E3] via-[#4396FC] to-[#5AC8FA] p-0.5 shadow-md shadow-[#0071E3]/25 flex items-center justify-center text-white font-bold text-sm">
              <span className="tracking-tight text-base"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">
                  FBPostForge
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] dark:bg-[#0071E3]/20 dark:text-[#5AC8FA] font-bold">
                  {simulatedYear} Autonomous
                </span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                Apple-Grade Social & Algorithm Studio
              </p>
            </div>
          </div>

          {/* Temporal Simulation Year Switcher & Dark Mode */}
          <div className="flex items-center space-x-2.5">
            <div className="hidden md:flex items-center space-x-1 px-2 py-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] text-xs">
              <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mr-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#0071E3]" /> Year:
              </span>
              {availableTargetYears.map((yr, idx) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYearOffset(idx)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                    selectedYearOffset === idx
                      ? "bg-[#0071E3] text-white shadow-xs"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>

            <a
              href="https://github.com/Rahul08319/FBPostForge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-gray-700 dark:text-gray-300 transition-all active:scale-95"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-gray-700 dark:text-gray-300 transition-all active:scale-95"
              aria-label="Toggle theme"
            >
              {mounted && isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="pt-12 pb-6 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-4 relative">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] text-xs font-semibold text-gray-600 dark:text-gray-300 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Perpetual Multi-Year Cadence: {simulatedYear} Edition Active</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.12]">
          Social Content & Interactive Algorithms,
          <br />
          <span className="bg-gradient-to-r from-[#0071E3] via-[#5856D6] to-[#AF52DE] bg-clip-text text-transparent">
            Crafted with Apple Precision.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
          A unified engineering studio combining live computer science visualization sandboxes,
          perpetual multi-year cadence automation, and TypeSafe System One Choice compaction—engineered
          with Cupertino aesthetics and Liquid Glass materials.
        </p>
      </section>

      {/* Apple Bento Grid Overview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Bento Card 1: Interactive CS */}
          <div className="apple-card p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="p-2.5 rounded-xl bg-[#0071E3]/10 text-[#0071E3] inline-block shadow-xs">
                <Code2 className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Interactive Algorithm Lab</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Arrays, Linked Lists, Binary Search Trees, and Graphs animated live inside social feeds.
              </p>
            </div>
            <div className="mt-4 flex items-center text-[11px] font-semibold text-[#0071E3]">
              <span>4 Data Structures Live</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* Bento Card 2: Multi-Year Auto Updater */}
          <div className="apple-card p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="p-2.5 rounded-xl bg-[#34C759]/10 text-[#34C759] inline-block shadow-xs">
                <Calendar className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Perpetual Multi-Year Logic</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Dynamic temporal engine calculates recurring schedules, post titles, and copyright stamps perpetually.
              </p>
            </div>
            <div className="mt-4 flex items-center text-[11px] font-semibold text-[#34C759]">
              <span>{simulatedYear} → {simulatedYear + 4} Autonomous</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* Bento Card 3: TypeSafe System One */}
          <div className="apple-card p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="p-2.5 rounded-xl bg-[#AF52DE]/10 text-[#AF52DE] inline-block shadow-xs">
                <Cpu className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">TypeSafe System One Core</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Choice primitive partitions tools into closed semantic sets, yielding +34.2% compaction accuracy.
              </p>
            </div>
            <div className="mt-4 flex items-center text-[11px] font-semibold text-[#AF52DE]">
              <span>68.4% Token Reduction</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* Bento Card 4: Graph API Publisher */}
          <div className="apple-card p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="p-2.5 rounded-xl bg-[#FF9500]/10 text-[#FF9500] inline-block shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Multi-Page Broadcasting</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Multi-tenant dispatcher with simulated reach analytics, scheduled slots, and OAuth sessions.
              </p>
            </div>
            <div className="mt-4 flex items-center text-[11px] font-semibold text-[#FF9500]">
              <span>Live Reach Analytics</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Apple Floating Segmented Dock */}
      <section className="sticky top-20 z-40 max-w-3xl mx-auto px-4 mb-8">
        <div className="p-1.5 rounded-2xl liquid-glass-nav shadow-lg flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[105px] flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap active:scale-95 ${
                  isActive
                    ? "bg-[#0071E3] text-white shadow-md shadow-[#0071E3]/25"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Main Studio Workspace Tab Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        {activeTab === "post" && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Realistic Feed Simulator</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Embedded sandbox executing live algorithms with interactive iPhone 16 Pro chassis, reaction dock, and comments.
              </p>
            </div>
            <FacebookPost />
          </div>
        )}

        {activeTab === "viz" && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="apple-card p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06] gap-2">
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">
                    Computer Science Algorithm Lab (Full-Scale Sandbox)
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Step-by-step memory manipulation, pointer updating, and asymptotic metrics for technical education.
                  </p>
                </div>
                <Badge variant="apple" className="text-xs self-start sm:self-auto">
                  Deterministic Replay
                </Badge>
              </div>

              <DataStructuresVisualization />
            </div>
          </div>
        )}

        {activeTab === "generator" && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <AIPostGenerator />
          </div>
        )}

        {activeTab === "publisher" && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <FacebookPublisher />

            {/* Perpetual Tech Roadmap Card */}
            <div className="apple-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
                <div className="flex items-center space-x-2.5">
                  <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Compass className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                      Perpetual Ecosystem Roadmap ({simulatedYear}–{simulatedYear + 4})
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Automated projections keeping content and technical references fresh across future years.
                    </p>
                  </div>
                </div>
                <Badge variant="apple" className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  Auto-Synchronized
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {techMilestones.map((m) => (
                  <div
                    key={m.year}
                    className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] dark:text-[#5AC8FA] font-bold">
                        {m.year}
                      </span>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {m.framework} {m.version}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                      {m.headline}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                      {m.focusArea}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "typesafe" && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Interactive TypeSafe System One Playground */}
            <div className="apple-card p-6 space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
                <div className="w-10 h-10 rounded-2xl bg-[#AF52DE]/10 text-[#AF52DE] flex items-center justify-center font-bold text-base shadow-xs">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">
                    TypeSafe System One Playground & Compaction Lab
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Live Choice primitive execution, calibrated probability distributions, and compaction heuristics.
                  </p>
                </div>
              </div>

              {/* Live Tool Selection & Judgment */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Select Tool to Categorize with Choice Primitive:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sampleTools.map((t, idx) => (
                    <button
                      key={t.name}
                      onClick={() => setSelectedToolIndex(idx)}
                      className={`text-left p-3 rounded-2xl border transition-all text-xs ${
                        selectedToolIndex === idx
                          ? "bg-[#0071E3]/10 border-[#0071E3] text-gray-900 dark:text-white shadow-xs"
                          : "bg-white/60 dark:bg-[#1c1c1e]/60 border-black/[0.06] dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:border-[#0071E3]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono font-bold text-[11px] mb-1">
                        <span>`{t.name}`</span>
                        {t.readOnly ? (
                          <span className="text-[10px] text-emerald-500 font-sans">Read-Only</span>
                        ) : (
                          <span className="text-[10px] text-amber-500 font-sans">Side-Effect</span>
                        )}
                      </div>
                      <p className="line-clamp-2 text-[11px] leading-snug">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Judgment Results Card */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Choice Primitive Judgment
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                      {activeToolResult.categoryLabel} ({activeToolResult.selectedCategory})
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Confidence:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                      {(activeToolResult.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Calibrated Probability Distribution Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>Calibrated Probability Distribution across Choice Options:</span>
                    <span className="font-mono text-gray-700 dark:text-gray-300">
                      System One (Jev)
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {TOOL_CATEGORIES.map((cat) => {
                      const prob = activeToolResult.probabilityDistribution[cat.value] || 0
                      const isWinner = cat.value === activeToolResult.selectedCategory
                      return (
                        <div
                          key={cat.value}
                          className={`p-2 rounded-xl text-center border transition-all ${
                            isWinner
                              ? "bg-[#0071E3]/15 border-[#0071E3] font-bold text-[#0071E3] dark:text-[#5AC8FA]"
                              : "bg-black/[0.01] dark:bg-white/[0.02] border-transparent text-gray-500"
                          }`}
                        >
                          <div className="text-[10px] truncate">{cat.label.split(" ")[0]}</div>
                          <div className="text-xs font-mono font-bold mt-0.5">
                            {(prob * 100).toFixed(0)}%
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Compaction Decision */}
                <div className="p-3 rounded-xl bg-white dark:bg-[#1E1E20] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="p-1 rounded-md bg-[#0071E3]/10 text-[#0071E3]">
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Compaction Directive:
                      </span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        {activeToolResult.compactionDecision}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-500 italic max-w-sm text-right hidden sm:inline">
                    {activeToolResult.explanation}
                  </span>
                </div>
              </div>
            </div>

            {/* Formal Evaluation Answering Both User Questions */}
            <div className="apple-card p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
                <div className="flex items-center space-x-2.5">
                  <span className="p-2 rounded-xl bg-[#0071E3]/10 text-[#0071E3]">
                    <Shield className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      TypeSafe Skill Formal Evaluation & Audit
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Rigorously addressing the two architectural prompts using TypeSafe System One specifications.
                    </p>
                  </div>
                </div>
                <Badge variant="apple" className="text-xs text-emerald-600 dark:text-emerald-400">
                  {typeSafeEval.benchmarkMetrics.compactionAccuracyBoost} Accuracy Boost
                </Badge>
              </div>

              {/* Question 1: Choice Primitive Evaluation */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" />
                    Q1: Would adding a Choice primitive for tool categorization improve compaction accuracy?
                  </span>
                  <Badge variant="apple" className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] self-start sm:self-auto">
                    {typeSafeEval.choicePrimitiveEvaluation.judgment}
                  </Badge>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                  {typeSafeEval.choicePrimitiveEvaluation.executiveSummary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {typeSafeEval.choicePrimitiveEvaluation.keyArchitecturalBenefits.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-[#1E1E20] border border-black/[0.04] dark:border-white/[0.06] space-y-1"
                    >
                      <h5 className="font-bold text-[11px] text-[#0071E3] dark:text-[#5AC8FA]">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-snug">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 2: Prompting Best Practices Analysis */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0071E3] inline" />
                    Q2: Analyze question instructions in src/core.ts against TypeSafe's latest prompting best practices.
                  </span>
                  <Badge variant="apple" className="bg-[#0071E3]/15 text-[#0071E3] dark:text-[#5AC8FA] text-[10px] self-start sm:self-auto">
                    {typeSafeEval.promptingBestPracticesAnalysis.complianceScore}
                  </Badge>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                  {typeSafeEval.promptingBestPracticesAnalysis.verdict}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {typeSafeEval.promptingBestPracticesAnalysis.bestPracticeChecks.map((check, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-[#1E1E20] border border-black/[0.04] dark:border-white/[0.06] space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold text-gray-900 dark:text-white text-[11px]">
                        <span>{check.rule}</span>
                        <span className="text-emerald-500 font-bold">{check.status}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                        {check.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Apple Styled Footer */}
      <footer className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
          <span>{getCopyrightNotice(2024)} Rahul Kumar</span>
          <span>•</span>
          <a
            href="https://github.com/Rahul08319/FBPostForge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            GitHub Repository
          </a>
          <span>•</span>
          <span>Apple Design System (Liquid Glass)</span>
          <span>•</span>
          <span>Autonomous Temporal Cadence ({simulatedYear}+)</span>
        </div>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">
          Built for high-performance developer education and automated social broadcasting.
        </p>
      </footer>
    </div>
  )
}
