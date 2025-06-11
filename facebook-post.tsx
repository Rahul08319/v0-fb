import { Heart, MessageCircle, Share, MoreHorizontal, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataStructuresVisualization } from "./data-structures-viz"

export default function FacebookPost() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="CS Academy" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">CS Academy</h3>
            <div className="flex items-center text-sm text-gray-500">
              <span>2 hours ago</span>
              <Globe className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <h2 className="text-xl font-bold text-gray-900 mb-2">🚀 Master Data Structures & Algorithms in 2024</h2>
        <p className="text-gray-700 leading-relaxed">
          Ready to level up your coding skills? Our comprehensive guide covers everything from basic arrays to advanced
          graph algorithms. Whether you're preparing for technical interviews or building scalable applications,
          understanding DSA is crucial for every developer.
          <br />
          <br />💡 What you'll learn:
          <br />• Time & Space Complexity Analysis
          <br />• Dynamic Programming Techniques
          <br />• Tree & Graph Traversal Methods
          <br />• System Design Fundamentals
        </p>
      </div>

      {/* Post Image */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50">
        <DataStructuresVisualization />
      </div>

      {/* Tags */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            #DataStructures
          </span>
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            #Algorithms
          </span>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
            #Programming
          </span>
          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
            #TechInterview
          </span>
          <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
            #ComputerScience
          </span>
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
            #Coding
          </span>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
            <span>1.2K people like this</span>
          </div>
          <div className="flex space-x-4">
            <span>89 comments</span>
            <span>45 shares</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-around p-2">
        <Button variant="ghost" className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50">
          <Heart className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600 font-medium">Like</span>
        </Button>
        <Button variant="ghost" className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50">
          <MessageCircle className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600 font-medium">Comment</span>
        </Button>
        <Button variant="ghost" className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50">
          <Share className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600 font-medium">Share</span>
        </Button>
      </div>
    </div>
  )
}
