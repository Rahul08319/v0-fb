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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import FacebookPost from "../facebook-post"
import { DataStructuresVisualization } from "../data-structures-viz"
import AIPostGenerator from "../ai-post-generator"
import FacebookPublisher from "../facebook-publisher"
import { getCurrentYear, getCopyrightNotice } from "@/lib/auto-updater"
import { evaluateTypeSafeCompactionArchitecture } from "@/src/core"

export default function Page() {
  const currentYear = getCurrentYear()
  const [activeTab, setActiveTab] = useState<"post" | "viz" | "generator" | "publisher" | "typesafe">("post")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

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

  const tabs = [
    { id: "post" as const, label: "Feed Post Preview", icon: "📱", badge: "Interactive" },
    { id: "viz" as const, label: "Algorithm Lab", icon: "🧠", badge: "Live Sandbox" },
    { id: "generator" as const, label: "AI Post Studio", icon: "✨", badge: "TypeSafe Jev" },
    { id: "publisher" as const, label: "Publisher & Cadence", icon: "🚀", badge: `${currentYear}+ Engine` },
    { id: "typesafe" as const, label: "TypeSafe Specs", icon: "⚡", badge: "Compaction Core" },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-500 pb-24">
      {/* Liquid Glass Navigation Bar */}
      <header className="sticky top-0 z-50 w-full liquid-glass-nav border-b border-black/[0.06] dark:border-white/[0.08] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0071E3] via-[#4396FC] to-[#5AC8FA] p-0.5 shadow-sm shadow-[#0071E3]/20 flex items-center justify-center text-white font-bold text-sm">
              <span className="tracking-tight">v0</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">
                  EchoPost Studio
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] dark:bg-[#0071E3]/20 dark:text-[#5AC8FA] font-semibold">
                  v0-fb • {currentYear}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                Apple-Grade Social & Algorithm Studio
              </p>
            </div>
          </div>

          {/* Quick Actions & Dark Mode Toggle */}
          <div className="flex items-center space-x-2.5">
            <a
              href="https://github.com/Rahul08319/v0-fb"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-gray-700 dark:text-gray-300 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
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
      <section className="pt-12 pb-8 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Dynamic Year Engine Synchronized: {currentYear} Edition</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
          Social Publishing & Interactive CS,
          <br />
          <span className="bg-gradient-to-r from-[#0071E3] via-[#5856D6] to-[#AF52DE] bg-clip-text text-transparent">
            Crafted with Apple Precision.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
          A unified content platform combining embedded algorithm sandboxes, automated multi-year scheduling cadences,
          and TypeSafe System One categorization—engineered with Cupertino aesthetics and Liquid Glass materials.
        </p>
      </section>

      {/* Apple Bento Grid Overview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Bento Card 1: Interactive CS */}
          <div className="apple-card p-5 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="p-2.5 rounded-xl bg-[#0071E3]/10 text-[#0071E3] inline-block">
                <Code2 className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Embedded Algorithm Lab</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Arrays, Linked Lists, Binary Search Trees, and Graphs animated live inside social feeds.
              </p>
            </div>
            <div className="mt-4 flex items-center text-[11px] font-semibold text-[#0071E3]">
              <span>4 Data Structures</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* Bento Card 2: Multi-Year Auto Updater */}
          <div className="apple-card p-5 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="p-2.5 rounded-xl bg-[#34C759]/10 text-[#34C759] inline-block">
                <Calendar className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Multi-Year Automation</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Temporal engine computes dynamic publication titles, roadmaps, and copyright stamps across coming years.
              </p>
            </div>
            <div className="mt-4 flex items-center text-[11px] font-semibold text-[#34C759]">
              <span>{currentYear} → {currentYear + 3} Autonomous</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* Bento Card 3: TypeSafe System One */}
          <div className="apple-card p-5 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="p-2.5 rounded-xl bg-[#AF52DE]/10 text-[#AF52DE] inline-block">
                <Cpu className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">TypeSafe AI Primitives</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Choice primitive partitions tools and content into closed semantic sets, maximizing compaction accuracy.
              </p>
            </div>
            <div className="mt-4 flex items-center text-[11px] font-semibold text-[#AF52DE]">
              <span>Calibrated Confidence</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* Bento Card 4: Graph API Publisher */}
          <div className="apple-card p-5 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between">
            <div className="space-y-2">
              <span className="p-2.5 rounded-xl bg-[#FF9500]/10 text-[#FF9500] inline-block">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Multi-Page Broadcasting</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Multi-tenant page switcher with simulated reach analytics, scheduling cues, and OIDC auth sessions.
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
                className={`flex-1 min-w-[100px] flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap active:scale-95 ${
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

      {/* Studio Workspace Tab Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        {activeTab === "post" && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Realistic Facebook Feed Integration</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Embedded sandbox executing live algorithms with interactive reactions, comments, and dynamic year cadence.
              </p>
            </div>
            <FacebookPost />
          </div>
        )}

        {activeTab === "viz" && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="apple-card p-6 border border-black/[0.06] dark:border-white/[0.08] space-y-4">
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
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <FacebookPublisher />
          </div>
        )}

        {activeTab === "typesafe" && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* TypeSafe Skill Evaluation Card */}
            <div className="apple-card p-6 border border-black/[0.06] dark:border-white/[0.08] space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-base">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">
                    TypeSafe System One Architecture & Evaluation
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Formal assessment of Choice primitive compaction accuracy and prompt instruction best practices.
                  </p>
                </div>
              </div>

              {/* Question 1: Choice Primitive Evaluation */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    1. Compaction Accuracy with Choice Primitive
                  </span>
                  <Badge variant="apple" className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px]">
                    Substantial Improvement
                  </Badge>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  {typeSafeEval.choicePrimitiveEvaluation.question}
                </p>
                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  {typeSafeEval.choicePrimitiveEvaluation.rationale.map((r, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-[#0071E3] font-bold mt-0.5">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 2: Prompting Best Practices Analysis */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    2. Question Instructions in src/core.ts Compliance
                  </span>
                  <Badge variant="apple" className="bg-[#0071E3]/15 text-[#0071E3] dark:text-[#5AC8FA] text-[10px]">
                    {typeSafeEval.promptingBestPracticesAnalysis.complianceScore}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {typeSafeEval.promptingBestPracticesAnalysis.bestPracticeChecks.map((check, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-[#2C2C2E] border border-black/[0.04] dark:border-white/[0.06] space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold text-gray-900 dark:text-white text-[11px]">
                        <span>{check.rule}</span>
                        <span className="text-emerald-500">{check.status}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-snug">{check.detail}</p>
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
            href="https://github.com/Rahul08319/v0-fb"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            GitHub Repository
          </a>
          <span>•</span>
          <span>Apple Design System (Liquid Glass)</span>
          <span>•</span>
          <span>Autonomous Temporal Cadence ({currentYear}+)</span>
        </div>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">
          Built for high-performance developer education and automated social broadcasting.
        </p>
      </footer>
    </div>
  )
}
