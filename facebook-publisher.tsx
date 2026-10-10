"use client"

import { useState } from "react"
import {
  Facebook,
  CheckCircle2,
  AlertCircle,
  Settings,
  Calendar,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
  TrendingUp,
  RefreshCw,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getCurrentYear, getDynamicTitle, generateMultiYearSchedule } from "@/lib/auto-updater"

interface FacebookAccount {
  id: string
  name: string
  profilePicture: string
  accessToken: string
  pages: FacebookPage[]
}

interface FacebookPage {
  id: string
  name: string
  category: string
  followers: number
  accessToken: string
}

interface PostStatus {
  id: string
  status: "pending" | "published" | "failed" | "scheduled"
  postId?: string
  publishedAt?: string
  scheduledFor?: string
  error?: string
  engagement?: {
    likes: number
    comments: number
    shares: number
    reach: number
  }
}

export default function FacebookPublisher() {
  const currentYear = getCurrentYear()
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [facebookAccount, setFacebookAccount] = useState<FacebookAccount | null>(null)
  const [selectedPage, setSelectedPage] = useState<string>("")
  const [postStatus, setPostStatus] = useState<PostStatus | null>(null)
  const [publishingPost, setPublishingPost] = useState(false)
  const [showMultiYearCalendar, setShowMultiYearCalendar] = useState(false)

  const multiYearSlots = generateMultiYearSchedule(3)

  // Simulate Facebook connection
  const connectToFacebook = async () => {
    setIsConnecting(true)

    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock Facebook account data
    const mockAccount: FacebookAccount = {
      id: "123456789",
      name: "Rahul Developer Studio",
      profilePicture: "/placeholder.svg?height=40&width=40",
      accessToken: "mock_access_token_12345",
      pages: [
        {
          id: "page_001",
          name: "CS Academy Global",
          category: "Education & Research",
          followers: 48920,
          accessToken: "page_token_001",
        },
        {
          id: "page_002",
          name: "Modern Frontend Hub",
          category: "Developer Tools",
          followers: 24350,
          accessToken: "page_token_002",
        },
        {
          id: "page_003",
          name: "Algorithms & Deep Tech",
          category: "Computer Science",
          followers: 68100,
          accessToken: "page_token_003",
        },
      ],
    }

    setFacebookAccount(mockAccount)
    setSelectedPage(mockAccount.pages[0].id)
    setIsConnected(true)
    setIsConnecting(false)
  }

  const publishToFacebook = async (postData: any) => {
    if (!facebookAccount || !selectedPage) return

    setPublishingPost(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1800))

      const mockPostStatus: PostStatus = {
        id: `post_${Date.now()}`,
        status: "published",
        postId: `${selectedPage}_${Date.now()}`,
        publishedAt: new Date().toISOString(),
        engagement: {
          likes: Math.floor(Math.random() * 800) + 120,
          comments: Math.floor(Math.random() * 250) + 30,
          shares: Math.floor(Math.random() * 140) + 15,
          reach: Math.floor(Math.random() * 5400) + 1200,
        },
      }

      setPostStatus(mockPostStatus)
    } catch (error) {
      setPostStatus({
        id: `post_${Date.now()}`,
        status: "failed",
        error: "Failed to publish post. Please check permissions and try again.",
      })
    }

    setPublishingPost(false)
  }

  const schedulePost = async (postData: any, scheduledTime: string) => {
    if (!facebookAccount || !selectedPage) return

    setPublishingPost(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const mockScheduledPost: PostStatus = {
        id: `scheduled_${Date.now()}`,
        status: "scheduled",
        scheduledFor: scheduledTime,
      }

      setPostStatus(mockScheduledPost)
    } catch (error) {
      setPostStatus({
        id: `scheduled_${Date.now()}`,
        status: "failed",
        error: "Failed to schedule post.",
      })
    }

    setPublishingPost(false)
  }

  const getSelectedPageInfo = () => {
    if (!facebookAccount || !selectedPage) return null
    return facebookAccount.pages.find((page) => page.id === selectedPage)
  }

  const samplePost = {
    title: getDynamicTitle("🚀 Master React Hooks & Server Components in 2024"),
    content: `State-of-the-art React patterns for ${currentYear} and beyond!\n\n🎯 Essential Architecture:\n• Server Actions & Dynamic Caching\n• React Compiler Auto-memoization\n• Suspense & Concurrent Transitions\n• TypeSafe Deterministic Primitives\n\n💡 Continuous delivery ensures our technical guidance stays perpetually refreshed every single year!`,
    image: "/placeholder.svg?height=400&width=600&text=React+Architecture+Roadmap",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="apple-card p-6 border border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1877F2] to-[#0052CC] flex items-center justify-center text-white shadow-md shadow-[#1877F2]/20">
              <Facebook className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Facebook Publisher & Multi-Year Engine
                </h2>
                <Badge variant="apple" className="text-[10px]">
                  {currentYear} Active
                </Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                Multi-page deployment, automated recurring schedules, and real-time Graph API simulation.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setShowMultiYearCalendar(!showMultiYearCalendar)}
            variant="outline"
            size="sm"
            className="rounded-xl border-black/[0.08] dark:border-white/[0.1] text-xs font-semibold"
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#0071E3]" />
            {showMultiYearCalendar ? "Hide Future Cadence" : "View Auto-Update Schedule"}
          </Button>
        </div>
      </div>

      {/* Auto-Updating Timeline Showcase (Coming Years) */}
      {showMultiYearCalendar && (
        <div className="apple-card p-6 border border-[#0071E3]/20 bg-[#0071E3]/[0.02] dark:bg-[#0071E3]/[0.05] space-y-4 animate-in fade-in slide-in-from-top-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#0071E3]" />
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Autonomous Multi-Year Publishing Engine
              </h3>
            </div>
            <Badge variant="apple" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
              Continuous Temporal Sync
            </Badge>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            The platform dynamically synthesizes scheduled slots across future years ({currentYear}, {currentYear + 1}, {currentYear + 2}), guaranteeing technical content roadmaps, DSA guides, and copyright tags refresh automatically without manual code updates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {[currentYear, currentYear + 1, currentYear + 2].map((yr) => (
              <div
                key={yr}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{yr} Roadmap</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-semibold">
                    {yr === currentYear ? "Current Year" : "Automated Queue"}
                  </span>
                </div>
                <div className="text-[11px] text-gray-600 dark:text-gray-400 space-y-1">
                  <div>• Q1: DSA Master Traversals ({yr})</div>
                  <div>• Q2: Next-Gen Fullstack Frameworks</div>
                  <div>• Q3: TypeSafe System One Models</div>
                  <div>• Q4: Scalable Cloud Architecture</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connection & Account Deck */}
      <div className="apple-card p-6 border border-black/[0.06] dark:border-white/[0.08]">
        {!isConnected ? (
          <div className="text-center py-6 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-[#1877F2]/10 rounded-3xl flex items-center justify-center mx-auto text-[#1877F2]">
              <Facebook className="w-8 h-8 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Connect Facebook Developer App
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Authenticate with Facebook Graph API to manage multiple academic and tech pages, schedule posts, and monitor audience reach.
              </p>
              <Button
                onClick={connectToFacebook}
                disabled={isConnecting}
                className="rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-semibold px-6 shadow-md shadow-[#1877F2]/20 active:scale-98 transition-all"
              >
                {isConnecting ? (
                  <>
                    <Settings className="w-4 h-4 mr-2 animate-spin" />
                    Authorizing Permissions...
                  </>
                ) : (
                  <>
                    <Facebook className="w-4 h-4 mr-2 fill-current" />
                    Connect Facebook Account
                  </>
                )}
              </Button>
            </div>

            <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Token Encryption: Encrypted OIDC Session via Vercel</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                    Connected: {facebookAccount?.name}
                  </h4>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    OIDC Token Active • Valid through {currentYear + 1}
                  </p>
                </div>
              </div>
              <Badge variant="apple" className="text-[10px] text-emerald-700 dark:text-emerald-400">
                Verified OAuth
              </Badge>
            </div>

            {/* Page Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Target Publication Page
              </label>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#2C2C2E] border border-black/[0.08] dark:border-white/[0.1] rounded-xl text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
              >
                {facebookAccount?.pages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.name} ({page.followers.toLocaleString()} followers • {page.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Page Overview Card */}
            {getSelectedPageInfo() && (
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                    {getSelectedPageInfo()?.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {getSelectedPageInfo()?.category} • {getSelectedPageInfo()?.followers.toLocaleString()} active followers
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-[#0071E3] font-semibold bg-[#0071E3]/10 px-2.5 py-1 rounded-xl">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Reach Index 98.4</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Publishing & Immediate Scheduling */}
      {isConnected && (
        <div className="apple-card p-6 border border-black/[0.06] dark:border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Live Post Dispatcher</h3>
            <span className="text-xs text-gray-400">Automated Year Engine: {currentYear}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-2">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">{samplePost.title}</h4>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {samplePost.content}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Button
              onClick={() => publishToFacebook(samplePost)}
              disabled={publishingPost}
              className="h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md active:scale-98 transition-all"
            >
              {publishingPost ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
                  Broadcasting via Graph API...
                </>
              ) : (
                <>
                  <ExternalLink className="w-3.5 h-3.5 mr-2" />
                  Broadcast Live to Facebook
                </>
              )}
            </Button>

            <Button
              onClick={() => schedulePost(samplePost, new Date(Date.now() + 7200000).toISOString())}
              disabled={publishingPost}
              variant="outline"
              className="h-10 rounded-xl border-black/[0.08] dark:border-white/[0.1] font-semibold text-xs active:scale-98 transition-all"
            >
              <Clock className="w-3.5 h-3.5 mr-2 text-[#0071E3]" />
              Schedule for Upcoming Slot
            </Button>
          </div>

          {/* Simulated Status Logs */}
          {postStatus && (
            <div
              className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-in fade-in slide-in-from-top-2 ${
                postStatus.status === "published"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                  : postStatus.status === "scheduled"
                  ? "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
              }`}
            >
              {postStatus.status === "published" && (
                <>
                  <div className="font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Post Live on Facebook Graph API!</span>
                  </div>
                  <div className="text-[11px] opacity-80">Post ID: {postStatus.postId}</div>
                  {postStatus.engagement && (
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-emerald-200/50 dark:border-emerald-800/50 text-[10px]">
                      <div>❤️ {postStatus.engagement.likes} Likes</div>
                      <div>💬 {postStatus.engagement.comments} Comments</div>
                      <div>🔄 {postStatus.engagement.shares} Shares</div>
                      <div>🚀 {postStatus.engagement.reach} Reach</div>
                    </div>
                  )}
                </>
              )}

              {postStatus.status === "scheduled" && (
                <div className="font-bold flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-[#0071E3]" />
                  <span>Scheduled for: {new Date(postStatus.scheduledFor!).toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
