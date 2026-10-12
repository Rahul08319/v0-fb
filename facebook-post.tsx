"use client"

import { useState } from "react"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Globe,
  Sparkles,
  Send,
  Check,
  TrendingUp,
  Smartphone,
  Tablet,
  Laptop,
  Wifi,
  Battery,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataStructuresVisualization } from "./data-structures-viz"
import { getCurrentYear, getDynamicTitle } from "@/lib/auto-updater"

export default function FacebookPost() {
  const currentYear = getCurrentYear()
  const [likes, setLikes] = useState(1248)
  const [isLiked, setIsLiked] = useState(false)
  const [activeReaction, setActiveReaction] = useState<string | null>(null)
  const [showReactionDock, setShowReactionDock] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [copiedShare, setCopiedShare] = useState(false)
  const [deviceMode, setDeviceMode] = useState<"iphone" | "ipad" | "desktop">("iphone")
  const [islandExpanded, setIslandExpanded] = useState(false)

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alex Morgan",
      avatar: "AM",
      text: "The interactive tree traversal visualization is insane! Best explanation of recursion I've seen.",
      time: "45m ago",
      likes: 19,
    },
    {
      id: 2,
      author: "Sophia Chen",
      avatar: "SC",
      text: `Essential roadmap for technical interviews in ${currentYear}. Bookmarking this immediately!`,
      time: "20m ago",
      likes: 8,
    },
  ])

  const reactions = [
    { id: "like", emoji: "👍", label: "Like", color: "text-[#0071E3]" },
    { id: "love", emoji: "❤️", label: "Love", color: "text-rose-500" },
    { id: "care", emoji: "🥰", label: "Care", color: "text-amber-500" },
    { id: "haha", emoji: "😆", label: "Haha", color: "text-amber-400" },
    { id: "wow", emoji: "😮", label: "Wow", color: "text-purple-500" },
    { id: "sad", emoji: "😢", label: "Sad", color: "text-blue-400" },
    { id: "angry", emoji: "😡", label: "Angry", color: "text-red-600" },
  ]

  const handleSelectReaction = (rId: string) => {
    setActiveReaction(rId)
    if (!isLiked) {
      setLikes((prev) => prev + 1)
      setIsLiked(true)
    }
    setShowReactionDock(false)
  }

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1)
      setIsLiked(false)
      setActiveReaction(null)
    } else {
      setLikes((prev) => prev + 1)
      setIsLiked(true)
      setActiveReaction("like")
    }
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "You",
        avatar: "ME",
        text: commentText.trim(),
        time: "Just now",
        likes: 0,
      },
    ])
    setCommentText("")
  }

  const handleShare = () => {
    setCopiedShare(true)
    setTimeout(() => setCopiedShare(false), 2500)
  }

  const postCard = (
    <div className="w-full bg-white dark:bg-[#1C1C1E] transition-colors duration-300">
      {/* Header with Glass Feel */}
      <div className="flex items-center justify-between p-4 border-b border-black/[0.04] dark:border-white/[0.06]">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-11 h-11 ring-2 ring-[#0071E3]/20 ring-offset-2 ring-offset-white dark:ring-offset-black">
              <AvatarImage src="/placeholder.svg?height=44&width=44" alt="CS Academy" />
              <AvatarFallback className="bg-gradient-to-tr from-[#0071E3] to-[#5AC8FA] text-white font-semibold text-sm">
                CS
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-black" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 dark:text-white tracking-tight">CS Academy Pro</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#0071E3]/10 text-[#0071E3] dark:bg-[#0071E3]/20 dark:text-[#5AC8FA]">
                Verified
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-1 mt-0.5">
              <span>Updated for {currentYear}</span>
              <span>•</span>
              <Globe className="w-3 h-3 inline" />
              <span>Public</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`h-8 w-8 p-0 rounded-full transition-transform active:scale-90 ${
              isBookmarked
                ? "text-[#0071E3] bg-[#0071E3]/10"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Post Text Content */}
      <div className="px-5 pt-4 pb-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2.5 tracking-tight flex items-center justify-between">
          <span>{getDynamicTitle("🚀 Master Data Structures & Algorithms in 2024")}</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 shadow-sm">
            <TrendingUp className="w-3.5 h-3.5" /> Trending
          </span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          Elevate your technical intuition with tactile computer science intuition. Interactive visual simulations
          allow you to observe memory representations, pointer re-linking, tree balancing, and graph traversals in real-time.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#0071E3] shadow-sm shadow-[#0071E3]/40" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">Memory Allocation Tracks</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">Deterministic Step Replay</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/40" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">O(1) & O(log N) Diagnostics</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/40" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">Dynamic Multi-Year Synced</span>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer Section */}
      <div className="relative border-y border-black/[0.06] dark:border-white/[0.08] bg-slate-50/60 dark:bg-black/40">
        <div className="absolute top-3 right-3 z-10 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/85 dark:bg-black/85 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] text-[11px] font-semibold text-gray-700 dark:text-gray-200 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#0071E3] animate-spin" />
          <span>Live Interactive Sandbox</span>
        </div>
        <DataStructuresVisualization />
      </div>

      {/* Apple-styled Topic Tags */}
      <div className="px-5 py-3 border-b border-black/[0.04] dark:border-white/[0.06]">
        <div className="flex flex-wrap gap-1.5">
          {["#DataStructures", "#Algorithms", "#ComputerScience", "#InteractiveLearning", `#CS${currentYear}`].map((tag) => (
            <span
              key={tag}
              className="inline-block bg-[#0071E3]/[0.08] dark:bg-[#0071E3]/20 text-[#0071E3] dark:text-[#5AC8FA] text-xs px-2.5 py-1 rounded-full font-medium hover:bg-[#0071E3]/[0.15] transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Engagement Stats Counter */}
      <div className="px-5 py-2.5 border-b border-black/[0.04] dark:border-white/[0.06]">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#0071E3] to-[#5AC8FA] flex items-center justify-center text-[10px] text-white shadow-sm">
                👍
              </span>
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-[10px] text-white shadow-sm">
                ❤️
              </span>
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {likes.toLocaleString()} reactions
            </span>
          </div>
          <div className="flex space-x-3 font-medium">
            <button onClick={() => setShowComments(!showComments)} className="hover:underline">
              {comments.length} comments
            </button>
            <span>•</span>
            <span>148 shares</span>
          </div>
        </div>
      </div>

      {/* Reaction Hover Dock (iOS Touch Bar style) */}
      <div className="relative px-3 py-1.5">
        {showReactionDock && (
          <div
            className="absolute -top-12 left-4 z-40 flex items-center space-x-1.5 px-3 py-1.5 reaction-dock"
            onMouseLeave={() => setShowReactionDock(false)}
          >
            {reactions.map((r) => (
              <button
                key={r.id}
                onClick={() => handleSelectReaction(r.id)}
                className="text-xl hover:scale-135 transform transition-transform duration-150 active:scale-95 p-1"
                title={r.label}
              >
                {r.emoji}
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons with Apple Spring Animation */}
        <div className="flex items-center justify-between">
          <div
            className="flex-1"
            onMouseEnter={() => setShowReactionDock(true)}
          >
            <Button
              variant="ghost"
              onClick={handleLikeToggle}
              className={`w-full flex items-center justify-center space-x-2 py-2 rounded-xl transition-all duration-200 apple-btn-active ${
                isLiked
                  ? "text-rose-600 bg-rose-50 dark:bg-rose-950/30 scale-[1.02]"
                  : "text-gray-600 dark:text-gray-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              }`}
            >
              <Heart className={`w-4 h-4 transition-transform duration-200 ${isLiked ? "fill-current scale-125" : ""}`} />
              <span className="font-semibold text-xs">
                {activeReaction ? activeReaction.toUpperCase() : isLiked ? "Loved" : "Like"}
              </span>
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => setShowComments(!showComments)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl transition-all apple-btn-active ${
              showComments
                ? "text-[#0071E3] bg-[#0071E3]/10 dark:bg-[#0071E3]/20"
                : "text-gray-600 dark:text-gray-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-semibold text-xs">Comment</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all apple-btn-active"
          >
            {copiedShare ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-xs text-emerald-600 dark:text-emerald-400">Copied Link</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span className="font-semibold text-xs">Share</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="border-t border-black/[0.04] dark:border-white/[0.06] p-4 bg-black/[0.01] dark:bg-white/[0.02]">
          <div className="space-y-3 mb-4 max-h-56 overflow-y-auto pr-1">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-2.5 text-xs">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-[10px] bg-gray-200 dark:bg-gray-800 font-semibold">
                    {comment.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-black/[0.03] dark:bg-white/[0.05] rounded-2xl p-2.5 border border-black/[0.03] dark:border-white/[0.05]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">{comment.author}</span>
                    <span className="text-[10px] text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-normal">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.1] rounded-full px-3.5 py-1.5 text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/40"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!commentText.trim()}
              className="h-8 w-8 p-0 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white flex items-center justify-center disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full flex flex-col items-center">
      {/* Device Viewport Selector */}
      <div className="flex items-center space-x-2 mb-6 p-1.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.1] shadow-sm">
        <button
          onClick={() => setDeviceMode("iphone")}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            deviceMode === "iphone"
              ? "bg-white dark:bg-[#1C1C1E] text-[#0071E3] shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>iPhone 16 Pro</span>
        </button>
        <button
          onClick={() => setDeviceMode("ipad")}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            deviceMode === "ipad"
              ? "bg-white dark:bg-[#1C1C1E] text-[#0071E3] shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>iPad Canvas</span>
        </button>
        <button
          onClick={() => setDeviceMode("desktop")}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            deviceMode === "desktop"
              ? "bg-white dark:bg-[#1C1C1E] text-[#0071E3] shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Desktop Studio</span>
        </button>
      </div>

      {/* Render according to device selection */}
      {deviceMode === "iphone" ? (
        <div className="iphone-frame">
          <div className="iphone-screen">
            {/* Screen Specular Glare */}
            <div className="screen-glare" />

            {/* Dynamic Island */}
            <div
              className="dynamic-island cursor-pointer"
              onClick={() => setIslandExpanded(!islandExpanded)}
            >
              <div className="dynamic-island-sensor" />
              <div className="flex items-center space-x-2 text-[10px] text-white font-medium">
                {islandExpanded ? (
                  <span className="text-[#5AC8FA] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-spin" /> FBPostForge Live
                  </span>
                ) : (
                  <span className="tracking-tighter">CS • 2026</span>
                )}
              </div>
              <div className="dynamic-island-camera" />
            </div>

            {/* iOS Status Bar */}
            <div className="pt-2.5 pb-1 px-6 flex items-center justify-between text-[11px] font-semibold text-gray-900 dark:text-white bg-white/70 dark:bg-black/70 backdrop-blur-sm z-30 relative">
              <span>9:41</span>
              <div className="flex items-center space-x-1.5">
                <Wifi className="w-3 h-3" />
                <span className="text-[10px] font-bold">5G</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feed Scroll Content */}
            <div className="max-h-[720px] overflow-y-auto">{postCard}</div>

            {/* Home Indicator */}
            <div className="w-full py-2 flex justify-center bg-white dark:bg-[#1C1C1E] border-t border-black/[0.04] dark:border-white/[0.04]">
              <div className="w-32 h-1 bg-black/30 dark:bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      ) : deviceMode === "ipad" ? (
        <div className="w-full max-w-3xl p-5 rounded-[36px] bg-gradient-to-b from-[#2a2a2c] to-[#1a1a1c] shadow-2xl border border-white/10">
          <div className="rounded-[28px] overflow-hidden bg-white dark:bg-[#1C1C1E] shadow-inner">
            <div className="py-2 px-6 flex items-center justify-between text-xs text-gray-400 bg-black/10 border-b border-black/5 dark:border-white/5">
              <span className="font-semibold text-gray-600 dark:text-gray-300">iPad Pro Studio Surface</span>
              <span>120Hz ProMotion</span>
            </div>
            {postCard}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl apple-card overflow-hidden">{postCard}</div>
      )}
    </div>
  )
}
