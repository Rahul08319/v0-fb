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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataStructuresVisualization } from "./data-structures-viz"
import { getCurrentYear, getDynamicTitle } from "@/lib/auto-updater"

export default function FacebookPost() {
  const currentYear = getCurrentYear()
  const [likes, setLikes] = useState(1248)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [copiedShare, setCopiedShare] = useState(false)
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

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1)
      setIsLiked(false)
    } else {
      setLikes((prev) => prev + 1)
      setIsLiked(true)
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

  return (
    <div className="max-w-2xl mx-auto apple-card bg-white/90 dark:bg-[#1C1C1E]/90 border border-black/[0.08] dark:border-white/[0.1] shadow-xl overflow-hidden transition-all duration-300">
      {/* Post Header with Glass Feel */}
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
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#0071E3]/10 text-[#0071E3] dark:bg-[#0071E3]/20 dark:text-[#5AC8FA]">
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
            className={`h-8 w-8 p-0 rounded-full ${
              isBookmarked ? "text-[#0071E3] bg-[#0071E3]/10" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
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
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Trending
          </span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          Elevate your technical proficiency with hands-on computer science intuition. Interactive visual simulations
          allow you to observe memory representations, pointer re-linking, tree balancing, and graph traversals in real-time.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
            <span className="text-gray-600 dark:text-gray-300">Continuous Visual Execution</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-gray-600 dark:text-gray-300">Deterministic Step Replay</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-gray-600 dark:text-gray-300">O(1) & O(log N) Comparative Tracks</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-gray-600 dark:text-gray-300">Dynamic State Serialization</span>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer Section */}
      <div className="relative border-y border-black/[0.06] dark:border-white/[0.08] bg-slate-50/50 dark:bg-black/40">
        <div className="absolute top-3 right-3 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1] text-[11px] font-medium text-gray-700 dark:text-gray-200 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#0071E3] animate-spin" />
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
            <span className="font-medium text-gray-700 dark:text-gray-300">{likes.toLocaleString()} reactions</span>
          </div>
          <div className="flex space-x-3 font-medium">
            <button onClick={() => setShowComments(!showComments)} className="hover:underline">
              {comments.length} comments
            </button>
            <span>•</span>
            <span>124 shares</span>
          </div>
        </div>
      </div>

      {/* Action Buttons with Apple Spring Animation */}
      <div className="flex items-center justify-between px-3 py-1.5">
        <Button
          variant="ghost"
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl transition-all duration-200 ${
            isLiked
              ? "text-rose-600 bg-rose-50 dark:bg-rose-950/30 scale-[1.02]"
              : "text-gray-600 dark:text-gray-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform duration-200 ${isLiked ? "fill-current scale-125" : ""}`} />
          <span className="font-semibold text-xs">{isLiked ? "Loved" : "Like"}</span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => setShowComments(!showComments)}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl transition-all ${
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
          className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
        >
          {copiedShare ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold text-xs text-emerald-600 dark:text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span className="font-semibold text-xs">Share</span>
            </>
          )}
        </Button>
      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="px-5 py-4 border-t border-black/[0.04] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.02] space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Discussion</h4>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-2.5 text-xs">
                <Avatar className="w-7 h-7 mt-0.5">
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-[10px]">
                    {comment.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-white dark:bg-[#2C2C2E] p-2.5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">{comment.author}</span>
                    <span className="text-[10px] text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex items-center space-x-2 pt-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a constructive thought..."
              className="flex-1 bg-white dark:bg-[#2C2C2E] border border-black/[0.08] dark:border-white/[0.1] rounded-full px-3.5 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!commentText.trim()}
              className="rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white h-8 px-3 text-xs"
            >
              <Send className="w-3.5 h-3.5 mr-1" />
              Post
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
