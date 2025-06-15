"use client"

import { useState } from "react"
import { Wand2, ImageIcon, RefreshCw, Send, Sparkles, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface GeneratedPost {
  title: string
  content: string
  hashtags: string[]
  imagePrompt: string
  imageUrl: string
  category: string
}

export default function AIPostGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("computer-science")
  const [postingSchedule, setPostingSchedule] = useState("now")

  const categories = [
    { id: "computer-science", name: "Computer Science", icon: "💻" },
    { id: "programming", name: "Programming Tips", icon: "🚀" },
    { id: "tech-news", name: "Tech News", icon: "📱" },
    { id: "algorithms", name: "Algorithms", icon: "🧮" },
    { id: "career", name: "Tech Career", icon: "💼" },
    { id: "tutorials", name: "Tutorials", icon: "📚" },
  ]

  const samplePosts = {
    "computer-science": {
      title: "🔥 The Future of Quantum Computing is Here!",
      content: `Quantum computing is revolutionizing how we approach complex problems! 🌟

Did you know that quantum computers can solve certain problems exponentially faster than classical computers? Here's what makes them special:

🔹 Quantum bits (qubits) can exist in multiple states simultaneously
🔹 Quantum entanglement allows instant correlation between particles
🔹 Superposition enables parallel processing at unprecedented scales

Major tech companies like IBM, Google, and Microsoft are investing billions in quantum research. We're seeing breakthroughs in:
• Cryptography and security
• Drug discovery and molecular modeling  
• Financial modeling and optimization
• Machine learning and AI

The quantum advantage is real, and it's coming faster than we think! 🚀

What aspect of quantum computing excites you most? Drop your thoughts below! 👇`,
      hashtags: [
        "#QuantumComputing",
        "#TechInnovation",
        "#FutureOfTech",
        "#ComputerScience",
        "#QuantumPhysics",
        "#TechTrends",
      ],
      imagePrompt: "Futuristic quantum computer with glowing qubits and holographic displays",
      imageUrl: "/placeholder.svg?height=400&width=600&text=Quantum+Computer+Visualization",
      category: "Computer Science",
    },
    programming: {
      title: "💡 5 Python Tricks That Will Blow Your Mind",
      content: `Python developers, this one's for you! Here are 5 mind-blowing tricks that will level up your coding game: 🐍✨

1️⃣ **List Comprehensions with Conditions**
   [x for x in range(10) if x % 2 == 0]
   
2️⃣ **Dictionary Comprehensions**
   {k: v**2 for k, v in {'a': 1, 'b': 2}.items()}
   
3️⃣ **Unpacking with Asterisk**
   first, *middle, last = [1, 2, 3, 4, 5]
   
4️⃣ **Enumerate for Index + Value**
   for i, value in enumerate(['a', 'b', 'c']):
   
5️⃣ **F-strings for Clean Formatting**
   f"Hello {name}, you have {count} messages"

These tricks will make your code cleaner, more readable, and more Pythonic! 🎯

Which trick surprised you the most? Share your favorite Python tricks in the comments! 👇`,
      hashtags: ["#Python", "#Programming", "#CodingTips", "#PythonTricks", "#CleanCode", "#SoftwareDevelopment"],
      imagePrompt: "Python code snippets with colorful syntax highlighting on a modern IDE",
      imageUrl: "/placeholder.svg?height=400&width=600&text=Python+Code+Tricks",
      category: "Programming",
    },
    algorithms: {
      title: "🧠 Understanding Big O Notation in 60 Seconds",
      content: `Big O Notation simplified! Here's everything you need to know: ⚡

🎯 **What is Big O?**
It describes how algorithm performance scales with input size.

📊 **Common Complexities:**
• O(1) - Constant: Array access
• O(log n) - Logarithmic: Binary search  
• O(n) - Linear: Simple loop
• O(n²) - Quadratic: Nested loops
• O(2ⁿ) - Exponential: Recursive fibonacci

🚀 **Why It Matters:**
- Helps choose the right algorithm
- Predicts performance at scale
- Essential for technical interviews
- Guides optimization decisions

💡 **Pro Tip:** Focus on the worst-case scenario and drop constants!

Example: If your algorithm does 3n + 5 operations, that's O(n).

Understanding Big O is crucial for writing efficient code that scales! 📈

What's your favorite algorithm optimization story? Share below! 👇`,
      hashtags: ["#BigO", "#Algorithms", "#DataStructures", "#ComputerScience", "#Programming", "#TechInterview"],
      imagePrompt: "Big O complexity chart with colorful graphs showing different algorithm performances",
      imageUrl: "/placeholder.svg?height=400&width=600&text=Big+O+Complexity+Chart",
      category: "Algorithms",
    },
  }

  const generatePost = async () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Get sample post based on category
    const posts = Object.values(samplePosts)
    const randomPost = posts[Math.floor(Math.random() * posts.length)]

    // Add some variation to make it feel more dynamic
    const variations = [
      "🔥 Hot Topic Alert! ",
      "🚀 Breaking: ",
      "💡 Did You Know? ",
      "🌟 Trending Now: ",
      "⚡ Quick Insight: ",
    ]

    const randomVariation = variations[Math.floor(Math.random() * variations.length)]

    setGeneratedPost({
      ...randomPost,
      title: randomVariation + randomPost.title.replace(/^[🔥💡🧠]+\s*/u, ""),
    })

    setIsGenerating(false)
  }

  const schedulePost = () => {
    alert(`Post scheduled for ${postingSchedule === "now" ? "immediate posting" : postingSchedule}! 
    
Note: This is a demo. In a real implementation, this would:
1. Connect to Facebook Graph API
2. Handle authentication and permissions
3. Schedule the post using Facebook's scheduling features
4. Track post performance and engagement`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span>AI Facebook Post Generator</span>
          </CardTitle>
          <p className="text-gray-600">Generate engaging Facebook posts with AI-powered content and images</p>
        </CardHeader>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Posting Schedule</label>
              <select
                value={postingSchedule}
                onChange={(e) => setPostingSchedule(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="now">Post Now</option>
                <option value="1hour">In 1 Hour</option>
                <option value="tomorrow">Tomorrow 9 AM</option>
                <option value="peak">Peak Engagement Time</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={generatePost}
                disabled={isGenerating}
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Post Preview */}
      {generatedPost && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-blue-500" />
              <span>Generated Post Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Facebook Post Mockup */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
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
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Just now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{generatedPost.title}</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">{generatedPost.content}</div>
              </div>

              {/* Post Image */}
              <div className="relative">
                <img
                  src={generatedPost.imageUrl || "/placeholder.svg"}
                  alt="Generated post image"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  AI Generated
                </div>
              </div>

              {/* Hashtags */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {generatedPost.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement Preview */}
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>👍 ❤️ 🔥</span>
                    <span>AI predicts 1.5K+ reactions</span>
                  </div>
                  <div className="flex space-x-4">
                    <span>200+ comments</span>
                    <span>150+ shares</span>
                  </div>
                </div>
              </div>

              {/* Separator before action buttons */}
              <div className="border-t border-gray-200"></div>

              {/* Action Buttons */}
              <div className="flex items-center justify-around p-3 bg-gray-50">
                <Button
                  variant="ghost"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">👍</span>
                  <span className="text-gray-700 font-medium">Like</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">💬</span>
                  <span className="text-gray-700 font-medium">Comment</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">📤</span>
                  <span className="text-gray-700 font-medium">Share</span>
                </Button>
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex justify-center space-x-4 mt-6">
              <Button onClick={generatePost} variant="outline" className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate</span>
              </Button>

              <Button onClick={schedulePost} className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600">
                <Send className="w-4 h-4" />
                <span>{postingSchedule === "now" ? "Post Now" : "Schedule Post"}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features Info */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">🤖 AI Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Smart Content Generation</h4>
                  <p className="text-sm text-gray-600">
                    AI creates engaging, relevant content based on your selected category
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Automatic Image Creation</h4>
                  <p className="text-sm text-gray-600">Generates relevant images that match your content perfectly</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Hashtag Optimization</h4>
                  <p className="text-sm text-gray-600">Suggests trending hashtags to maximize reach and engagement</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Engagement Prediction</h4>
                  <p className="text-sm text-gray-600">AI predicts potential likes, comments, and shares</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Smart Scheduling</h4>
                  <p className="text-sm text-gray-600">Posts at optimal times for maximum audience reach</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Multi-Category Support</h4>
                  <p className="text-sm text-gray-600">Covers various tech topics from CS to career advice</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
