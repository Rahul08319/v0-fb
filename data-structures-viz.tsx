"use client"

import { useState, useEffect } from "react"
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bookmark,
  BookmarkPlus,
  Trash2,
  FolderOpen,
} from "lucide-react"

interface OperationStep {
  type: "array" | "linkedList" | "tree" | "graph"
  operation: "insert" | "delete"
  value?: number
  index?: number
  description: string
}

interface BookmarkData {
  id: string
  name: string
  timestamp: number
  step: number
  arrayData: number[]
  linkedListData: number[]
  treeNodes: number[]
  graphEdges: { from: string; to: string }[]
  description: string
}

export function DataStructuresVisualization() {
  // Array animation state
  const [arrayData, setArrayData] = useState([42, 17, 89, 23, 56])
  const [arrayHighlight, setArrayHighlight] = useState(-1)
  const [arrayOperation, setArrayOperation] = useState<"insert" | "delete" | "idle">("idle")

  // Linked List animation state
  const [linkedListData, setLinkedListData] = useState([10, 20, 30])
  const [linkedListHighlight, setLinkedListHighlight] = useState(-1)
  const [linkedListOperation, setLinkedListOperation] = useState<"insert" | "delete" | "idle">("idle")

  // Binary Tree animation state
  const [treeNodes, setTreeNodes] = useState([50, 30, 70, 20, 40, 60, 80])
  const [treeHighlight, setTreeHighlight] = useState(-1)
  const [treeOperation, setTreeOperation] = useState<"insert" | "delete" | "idle">("idle")

  // Graph animation state
  const [graphEdges, setGraphEdges] = useState([
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "C", to: "D" },
    { from: "A", to: "D" },
  ])
  const [graphHighlight, setGraphHighlight] = useState("")

  // Animation control state
  const [isPlaying, setIsPlaying] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(3000)
  const [isManualMode, setIsManualMode] = useState(false)

  // Manual mode state
  const [currentStep, setCurrentStep] = useState(0)
  const [operationHistory, setOperationHistory] = useState<any[]>([])
  const [nextOperation, setNextOperation] = useState<OperationStep | null>(null)
  const [isExecutingStep, setIsExecutingStep] = useState(false)

  // Bookmark state
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([])
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [bookmarkName, setBookmarkName] = useState("")
  const [showBookmarkInput, setShowBookmarkInput] = useState(false)

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("ds-visualization-bookmarks")
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks))
      } catch (error) {
        console.error("Failed to load bookmarks:", error)
      }
    }
  }, [])

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("ds-visualization-bookmarks", JSON.stringify(bookmarks))
  }, [bookmarks])

  // Generate next operation
  const generateNextOperation = (): OperationStep => {
    const operations = ["array", "linkedList", "tree", "graph"]
    const currentOp = operations[currentStep % operations.length]

    switch (currentOp) {
      case "array":
        const arrayIsInsert = Math.random() > 0.5
        if (arrayIsInsert && arrayData.length < 7) {
          const newValue = Math.floor(Math.random() * 100)
          const insertIndex = Math.floor(Math.random() * (arrayData.length + 1))
          return {
            type: "array",
            operation: "insert",
            value: newValue,
            index: insertIndex,
            description: `Insert ${newValue} at index ${insertIndex} in array`,
          }
        } else if (!arrayIsInsert && arrayData.length > 3) {
          const deleteIndex = Math.floor(Math.random() * arrayData.length)
          return {
            type: "array",
            operation: "delete",
            index: deleteIndex,
            description: `Delete element at index ${deleteIndex} from array`,
          }
        }
        break

      case "linkedList":
        const listIsInsert = Math.random() > 0.5
        if (listIsInsert && linkedListData.length < 5) {
          const newValue = Math.floor(Math.random() * 100)
          const insertIndex = Math.floor(Math.random() * (linkedListData.length + 1))
          return {
            type: "linkedList",
            operation: "insert",
            value: newValue,
            index: insertIndex,
            description: `Insert ${newValue} at position ${insertIndex} in linked list`,
          }
        } else if (!listIsInsert && linkedListData.length > 2) {
          const deleteIndex = Math.floor(Math.random() * linkedListData.length)
          return {
            type: "linkedList",
            operation: "delete",
            index: deleteIndex,
            description: `Delete node at position ${deleteIndex} from linked list`,
          }
        }
        break

      case "tree":
        if (treeNodes.length < 10) {
          const newValue = Math.floor(Math.random() * 100)
          return {
            type: "tree",
            operation: "insert",
            value: newValue,
            description: `Insert ${newValue} into binary search tree`,
          }
        }
        break

      case "graph":
        const nodes = ["A", "B", "C", "D"]
        const allPossibleEdges = []
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            allPossibleEdges.push({ from: nodes[i], to: nodes[j] })
          }
        }

        const graphIsAdd = Math.random() > 0.5
        if (graphIsAdd) {
          const availableEdges = allPossibleEdges.filter(
            (edge) =>
              !graphEdges.some(
                (existing) =>
                  (existing.from === edge.from && existing.to === edge.to) ||
                  (existing.from === edge.to && existing.to === edge.from),
              ),
          )
          if (availableEdges.length > 0) {
            const newEdge = availableEdges[Math.floor(Math.random() * availableEdges.length)]
            return {
              type: "graph",
              operation: "insert",
              description: `Add edge between ${newEdge.from} and ${newEdge.to}`,
            }
          }
        } else if (graphEdges.length > 3) {
          const edgeToRemove = graphEdges[Math.floor(Math.random() * graphEdges.length)]
          return {
            type: "graph",
            operation: "delete",
            description: `Remove edge between ${edgeToRemove.from} and ${edgeToRemove.to}`,
          }
        }
        break
    }

    // Fallback operation
    return {
      type: "array",
      operation: "insert",
      value: Math.floor(Math.random() * 100),
      index: arrayData.length,
      description: "Insert element at end of array",
    }
  }

  // Update next operation when step changes
  useEffect(() => {
    if (isManualMode) {
      setNextOperation(generateNextOperation())
    }
  }, [currentStep, isManualMode, arrayData, linkedListData, treeNodes, graphEdges])

  // Bookmark functions
  const saveBookmark = () => {
    if (!bookmarkName.trim()) return

    const bookmark: BookmarkData = {
      id: Date.now().toString(),
      name: bookmarkName.trim(),
      timestamp: Date.now(),
      step: currentStep,
      arrayData: [...arrayData],
      linkedListData: [...linkedListData],
      treeNodes: [...treeNodes],
      graphEdges: [...graphEdges],
      description: nextOperation?.description || "Current state",
    }

    setBookmarks((prev) => [...prev, bookmark])
    setBookmarkName("")
    setShowBookmarkInput(false)
  }

  const loadBookmark = (bookmark: BookmarkData) => {
    setArrayData(bookmark.arrayData)
    setLinkedListData(bookmark.linkedListData)
    setTreeNodes(bookmark.treeNodes)
    setGraphEdges(bookmark.graphEdges)
    setCurrentStep(bookmark.step)
    setOperationHistory([])
    setShowBookmarks(false)

    // Clear any ongoing operations
    setArrayHighlight(-1)
    setArrayOperation("idle")
    setLinkedListHighlight(-1)
    setLinkedListOperation("idle")
    setTreeHighlight(-1)
    setTreeOperation("idle")
    setGraphHighlight("")
  }

  const deleteBookmark = (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId))
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  // Auto animation cycle
  useEffect(() => {
    if (!isPlaying || isManualMode) return

    const interval = setInterval(() => {
      const operations = ["array", "linkedList", "tree", "graph"]
      const currentOp = operations[Math.floor(Date.now() / animationSpeed) % operations.length]

      switch (currentOp) {
        case "array":
          animateArray()
          break
        case "linkedList":
          animateLinkedList()
          break
        case "tree":
          animateTree()
          break
        case "graph":
          animateGraph()
          break
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, animationSpeed, isManualMode])

  const executeStep = async (operation: OperationStep) => {
    if (isExecutingStep) return

    setIsExecutingStep(true)

    // Save current state to history
    const currentState = {
      arrayData: [...arrayData],
      linkedListData: [...linkedListData],
      treeNodes: [...treeNodes],
      graphEdges: [...graphEdges],
      step: currentStep,
    }
    setOperationHistory((prev) => [...prev, currentState])

    switch (operation.type) {
      case "array":
        if (operation.operation === "insert" && operation.value !== undefined && operation.index !== undefined) {
          setArrayOperation("insert")
          setArrayHighlight(operation.index)

          setTimeout(() => {
            setArrayData((prev) => {
              const newArray = [...prev]
              newArray.splice(operation.index!, 0, operation.value!)
              return newArray
            })
            setTimeout(() => {
              setArrayHighlight(-1)
              setArrayOperation("idle")
              setIsExecutingStep(false)
            }, 500)
          }, 500)
        } else if (operation.operation === "delete" && operation.index !== undefined) {
          setArrayOperation("delete")
          setArrayHighlight(operation.index)

          setTimeout(() => {
            setArrayData((prev) => prev.filter((_, i) => i !== operation.index))
            setTimeout(() => {
              setArrayHighlight(-1)
              setArrayOperation("idle")
              setIsExecutingStep(false)
            }, 500)
          }, 500)
        }
        break

      case "linkedList":
        if (operation.operation === "insert" && operation.value !== undefined && operation.index !== undefined) {
          setLinkedListOperation("insert")
          setLinkedListHighlight(operation.index)

          setTimeout(() => {
            setLinkedListData((prev) => {
              const newArray = [...prev]
              newArray.splice(operation.index!, 0, operation.value!)
              return newArray
            })
            setTimeout(() => {
              setLinkedListHighlight(-1)
              setLinkedListOperation("idle")
              setIsExecutingStep(false)
            }, 500)
          }, 500)
        } else if (operation.operation === "delete" && operation.index !== undefined) {
          setLinkedListOperation("delete")
          setLinkedListHighlight(operation.index)

          setTimeout(() => {
            setLinkedListData((prev) => prev.filter((_, i) => i !== operation.index))
            setTimeout(() => {
              setLinkedListHighlight(-1)
              setLinkedListOperation("idle")
              setIsExecutingStep(false)
            }, 500)
          }, 500)
        }
        break

      case "tree":
        if (operation.operation === "insert" && operation.value !== undefined) {
          setTreeOperation("insert")
          setTreeHighlight(0)

          setTimeout(() => {
            setTreeNodes((prev) => [...prev, operation.value!].sort((a, b) => a - b))
            setTimeout(() => {
              setTreeHighlight(-1)
              setTreeOperation("idle")
              setIsExecutingStep(false)
            }, 500)
          }, 500)
        }
        break

      case "graph":
        setTimeout(() => {
          setIsExecutingStep(false)
        }, 1000)
        break
    }

    setCurrentStep((prev) => prev + 1)
  }

  const goToPreviousStep = () => {
    if (operationHistory.length === 0) return

    const previousState = operationHistory[operationHistory.length - 1]
    setArrayData(previousState.arrayData)
    setLinkedListData(previousState.linkedListData)
    setTreeNodes(previousState.treeNodes)
    setGraphEdges(previousState.graphEdges)
    setCurrentStep(previousState.step)

    setOperationHistory((prev) => prev.slice(0, -1))
  }

  const animateArray = () => {
    if (arrayOperation === "idle") {
      const isInsert = Math.random() > 0.5
      if (isInsert && arrayData.length < 7) {
        setArrayOperation("insert")
        const newValue = Math.floor(Math.random() * 100)
        const insertIndex = Math.floor(Math.random() * (arrayData.length + 1))
        setArrayHighlight(insertIndex)

        setTimeout(() => {
          setArrayData((prev) => {
            const newArray = [...prev]
            newArray.splice(insertIndex, 0, newValue)
            return newArray
          })
          setTimeout(() => {
            setArrayHighlight(-1)
            setArrayOperation("idle")
          }, 500)
        }, 500)
      } else if (!isInsert && arrayData.length > 3) {
        setArrayOperation("delete")
        const deleteIndex = Math.floor(Math.random() * arrayData.length)
        setArrayHighlight(deleteIndex)

        setTimeout(() => {
          setArrayData((prev) => prev.filter((_, i) => i !== deleteIndex))
          setTimeout(() => {
            setArrayHighlight(-1)
            setArrayOperation("idle")
          }, 500)
        }, 500)
      }
    }
  }

  const animateLinkedList = () => {
    if (linkedListOperation === "idle") {
      const isInsert = Math.random() > 0.5
      if (isInsert && linkedListData.length < 5) {
        setLinkedListOperation("insert")
        const newValue = Math.floor(Math.random() * 100)
        const insertIndex = Math.floor(Math.random() * (linkedListData.length + 1))
        setLinkedListHighlight(insertIndex)

        setTimeout(() => {
          setLinkedListData((prev) => {
            const newArray = [...prev]
            newArray.splice(insertIndex, 0, newValue)
            return newArray
          })
          setTimeout(() => {
            setLinkedListHighlight(-1)
            setLinkedListOperation("idle")
          }, 500)
        }, 500)
      } else if (!isInsert && linkedListData.length > 2) {
        setLinkedListOperation("delete")
        const deleteIndex = Math.floor(Math.random() * linkedListData.length)
        setLinkedListHighlight(deleteIndex)

        setTimeout(() => {
          setLinkedListData((prev) => prev.filter((_, i) => i !== deleteIndex))
          setTimeout(() => {
            setLinkedListHighlight(-1)
            setLinkedListOperation("idle")
          }, 500)
        }, 500)
      }
    }
  }

  const animateTree = () => {
    if (treeOperation === "idle") {
      const isInsert = Math.random() > 0.5
      if (isInsert && treeNodes.length < 10) {
        setTreeOperation("insert")
        const newValue = Math.floor(Math.random() * 100)

        let currentIndex = 0
        while (currentIndex < treeNodes.length) {
          if (newValue < treeNodes[currentIndex]) {
            currentIndex = currentIndex * 2 + 1
          } else {
            currentIndex = currentIndex * 2 + 2
          }
        }

        setTreeHighlight(currentIndex)
        setTimeout(() => {
          setTreeNodes((prev) => [...prev, newValue].sort((a, b) => a - b))
          setTimeout(() => {
            setTreeHighlight(-1)
            setTreeOperation("idle")
          }, 500)
        }, 500)
      }
    }
  }

  const animateGraph = () => {
    const nodes = ["A", "B", "C", "D"]
    const allPossibleEdges = []

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        allPossibleEdges.push({ from: nodes[i], to: nodes[j] })
      }
    }

    const isAdd = Math.random() > 0.5

    if (isAdd) {
      const availableEdges = allPossibleEdges.filter(
        (edge) =>
          !graphEdges.some(
            (existing) =>
              (existing.from === edge.from && existing.to === edge.to) ||
              (existing.from === edge.to && existing.to === edge.from),
          ),
      )

      if (availableEdges.length > 0) {
        const newEdge = availableEdges[Math.floor(Math.random() * availableEdges.length)]
        setGraphHighlight(`${newEdge.from}-${newEdge.to}`)

        setTimeout(() => {
          setGraphEdges((prev) => [...prev, newEdge])
          setTimeout(() => {
            setGraphHighlight("")
          }, 500)
        }, 500)
      }
    } else if (graphEdges.length > 3) {
      const edgeToRemove = graphEdges[Math.floor(Math.random() * graphEdges.length)]
      setGraphHighlight(`${edgeToRemove.from}-${edgeToRemove.to}`)

      setTimeout(() => {
        setGraphEdges((prev) => prev.filter((edge) => edge !== edgeToRemove))
        setTimeout(() => {
          setGraphHighlight("")
        }, 500)
      }, 500)
    }
  }

  const resetAnimations = () => {
    setArrayData([42, 17, 89, 23, 56])
    setArrayHighlight(-1)
    setArrayOperation("idle")
    setLinkedListData([10, 20, 30])
    setLinkedListHighlight(-1)
    setLinkedListOperation("idle")
    setTreeNodes([50, 30, 70, 20, 40, 60, 80])
    setTreeHighlight(-1)
    setTreeOperation("idle")
    setGraphEdges([
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "C", to: "D" },
      { from: "A", to: "D" },
    ])
    setGraphHighlight("")
    setCurrentStep(0)
    setOperationHistory([])
  }

  return (
    <div className="w-full min-h-[22rem] p-5 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/40 dark:from-[#18181A] dark:via-[#1C1C1E] dark:to-[#121214] text-gray-900 dark:text-gray-100 rounded-2xl transition-all">
      {/* Animation Controls - Apple Frosted Dock */}
      <div className="flex items-center justify-between mb-4 p-2.5 bg-white/70 dark:bg-[#2C2C2E]/70 backdrop-blur-xl rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
        <div className="flex items-center space-x-2">
          {/* Mode Toggle */}
          <button
            onClick={() => setIsManualMode(!isManualMode)}
            className={`flex items-center justify-center px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              isManualMode
                ? "bg-[#AF52DE] text-white shadow-sm"
                : "bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-gray-700 dark:text-gray-300"
            }`}
          >
            <Settings className="w-3.5 h-3.5 mr-1" />
            {isManualMode ? "Manual Step" : "Auto Flow"}
          </button>

          {!isManualMode ? (
            <>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 active:scale-95 ${
                  isPlaying
                    ? "bg-[#FF9500] hover:bg-[#E08500] text-white shadow-sm"
                    : "bg-[#34C759] hover:bg-[#2EB34F] text-white shadow-sm"
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300">{isPlaying ? "Active" : "Paused"}</div>
            </>
          ) : (
            <>
              <button
                onClick={goToPreviousStep}
                disabled={operationHistory.length === 0}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0071E3] hover:bg-[#0077ED] disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white transition-all active:scale-95 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => nextOperation && executeStep(nextOperation)}
                disabled={isExecutingStep || !nextOperation}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#34C759] hover:bg-[#2EB34F] disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white transition-all active:scale-95 shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Step {currentStep} {isExecutingStep && "(…)"}
              </div>
            </>
          )}

          <button
            onClick={resetAnimations}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.14] text-gray-700 dark:text-gray-200 transition-all active:scale-95"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bookmark Controls */}
          {isManualMode && (
            <>
              <button
                onClick={() => setShowBookmarkInput(!showBookmarkInput)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF9500] hover:bg-[#E08500] text-white transition-all shadow-sm"
                title="Save Bookmark"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setShowBookmarks(!showBookmarks)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5856D6] hover:bg-[#4E4CB8] text-white transition-all shadow-sm"
                title="Load Bookmark"
              >
                <FolderOpen className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {!isManualMode && (
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Speed:</span>
              <select
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="px-2 py-1 text-xs bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.1] rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
              >
                <option value={1500}>Fast (1.5s)</option>
                <option value={3000}>Normal (3s)</option>
                <option value={5000}>Slow (5s)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Bookmark Input */}
      {showBookmarkInput && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={bookmarkName}
              onChange={(e) => setBookmarkName(e.target.value)}
              placeholder="Enter bookmark name..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onKeyPress={(e) => e.key === "Enter" && saveBookmark()}
            />
            <button
              onClick={saveBookmark}
              disabled={!bookmarkName.trim()}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white text-sm font-medium rounded transition-all duration-200"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowBookmarkInput(false)
                setBookmarkName("")
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bookmarks List */}
      {showBookmarks && (
        <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg max-h-40 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-indigo-800">Saved Bookmarks</h4>
            <button onClick={() => setShowBookmarks(false)} className="text-indigo-600 hover:text-indigo-800 text-sm">
              Close
            </button>
          </div>
          {bookmarks.length === 0 ? (
            <p className="text-sm text-indigo-600">No bookmarks saved yet.</p>
          ) : (
            <div className="space-y-2">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="flex items-center justify-between p-2 bg-white rounded border border-indigo-200"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{bookmark.name}</div>
                    <div className="text-xs text-gray-500">
                      Step {bookmark.step} • {formatTimestamp(bookmark.timestamp)}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{bookmark.description}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => loadBookmark(bookmark)}
                      className="p-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-all duration-200"
                      title="Load Bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteBookmark(bookmark.id)}
                      className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-all duration-200"
                      title="Delete Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Next Operation Preview */}
      {isManualMode && nextOperation && !showBookmarks && !showBookmarkInput && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm font-medium text-blue-800">Next Operation:</div>
          <div className="text-sm text-blue-600">{nextOperation.description}</div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Animated Array */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center">
            Array
            <span className="ml-2 text-xs text-blue-600">
              {arrayOperation === "insert" ? "+ Inserting" : arrayOperation === "delete" ? "- Deleting" : ""}
            </span>
          </h3>
          <div className="flex space-x-1">
            {arrayData.map((value, index) => (
              <div
                key={`${value}-${index}`}
                className={`w-12 h-12 text-white flex items-center justify-center text-xs font-bold rounded border-2 transition-all duration-500 ${
                  arrayHighlight === index
                    ? "bg-yellow-500 border-yellow-600 scale-110 shadow-lg"
                    : "bg-blue-500 border-blue-600"
                }`}
              >
                {value}
              </div>
            ))}
          </div>
          <div className="flex space-x-1">
            {arrayData.map((_, index) => (
              <div key={index} className="w-12 text-center text-xs text-gray-500">
                [{index}]
              </div>
            ))}
          </div>
        </div>

        {/* Animated Linked List */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center">
            Linked List
            <span className="ml-2 text-xs text-green-600">
              {linkedListOperation === "insert" ? "+ Inserting" : linkedListOperation === "delete" ? "- Deleting" : ""}
            </span>
          </h3>
          <div className="flex items-center space-x-2">
            {linkedListData.map((value, index) => (
              <div key={`${value}-${index}`} className="flex items-center">
                <div className="flex">
                  <div
                    className={`w-8 h-8 text-white flex items-center justify-center text-xs font-bold rounded-l border transition-all duration-500 ${
                      linkedListHighlight === index
                        ? "bg-yellow-500 border-yellow-600 scale-110"
                        : "bg-green-500 border-green-600"
                    }`}
                  >
                    {value}
                  </div>
                  <div
                    className={`w-4 h-8 border rounded-r flex items-center justify-center transition-all duration-500 ${
                      linkedListHighlight === index
                        ? "bg-yellow-400 border-yellow-600"
                        : "bg-green-400 border-green-600"
                    }`}
                  >
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
                {index < linkedListData.length - 1 && (
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            ))}
            <div className="text-xs text-gray-500">NULL</div>
          </div>
        </div>

        {/* Animated Binary Tree */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center">
            Binary Tree
            <span className="ml-2 text-xs text-purple-600">{treeOperation === "insert" ? "+ Inserting" : ""}</span>
          </h3>
          <div className="relative">
            {/* Root */}
            <div className="flex justify-center">
              <div
                className={`w-8 h-8 text-white flex items-center justify-center text-xs font-bold rounded-full border-2 transition-all duration-500 ${
                  treeHighlight === 0 ? "bg-yellow-500 border-yellow-600 scale-125" : "bg-purple-500 border-purple-600"
                }`}
              >
                {treeNodes[0]}
              </div>
            </div>

            {/* Level 1 connections */}
            <svg className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6" viewBox="0 0 80 24">
              <line x1="40" y1="0" x2="20" y2="20" stroke="#6b7280" strokeWidth="1" />
              <line x1="40" y1="0" x2="60" y2="20" stroke="#6b7280" strokeWidth="1" />
            </svg>

            {/* Level 1 */}
            <div className="flex justify-between px-8 mt-2">
              <div
                className={`w-8 h-8 text-white flex items-center justify-center text-xs font-bold rounded-full border-2 transition-all duration-500 ${
                  treeHighlight === 1 ? "bg-yellow-500 border-yellow-600 scale-125" : "bg-purple-500 border-purple-600"
                }`}
              >
                {treeNodes[1]}
              </div>
              <div
                className={`w-8 h-8 text-white flex items-center justify-center text-xs font-bold rounded-full border-2 transition-all duration-500 ${
                  treeHighlight === 2 ? "bg-yellow-500 border-yellow-600 scale-125" : "bg-purple-500 border-purple-600"
                }`}
              >
                {treeNodes[2]}
              </div>
            </div>

            {/* Level 2 connections */}
            <svg className="absolute top-16 left-0 w-full h-6" viewBox="0 0 200 24">
              <line x1="50" y1="0" x2="30" y2="20" stroke="#6b7280" strokeWidth="1" />
              <line x1="50" y1="0" x2="70" y2="20" stroke="#6b7280" strokeWidth="1" />
              <line x1="150" y1="0" x2="130" y2="20" stroke="#6b7280" strokeWidth="1" />
              <line x1="150" y1="0" x2="170" y2="20" stroke="#6b7280" strokeWidth="1" />
            </svg>

            {/* Level 2 */}
            <div className="flex justify-between mt-2">
              {treeNodes.slice(3, 7).map((value, index) => (
                <div
                  key={value}
                  className={`w-8 h-8 text-white flex items-center justify-center text-xs font-bold rounded-full border-2 transition-all duration-500 ${
                    treeHighlight === index + 3
                      ? "bg-yellow-500 border-yellow-600 scale-125"
                      : "bg-purple-500 border-purple-600"
                  }`}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Graph */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">Graph</h3>
          <div className="relative h-24">
            {/* Nodes */}
            <div className="absolute top-2 left-4 w-6 h-6 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded-full border-2 border-red-600">
              A
            </div>
            <div className="absolute top-2 right-4 w-6 h-6 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded-full border-2 border-red-600">
              B
            </div>
            <div className="absolute bottom-2 left-8 w-6 h-6 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded-full border-2 border-red-600">
              C
            </div>
            <div className="absolute bottom-2 right-8 w-6 h-6 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded-full border-2 border-red-600">
              D
            </div>

            {/* Animated Edges */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 96">
              {graphEdges.map((edge, index) => {
                const positions = {
                  A: { x: 30, y: 20 },
                  B: { x: 170, y: 20 },
                  C: { x: 45, y: 76 },
                  D: { x: 155, y: 76 },
                }

                const isHighlighted =
                  graphHighlight === `${edge.from}-${edge.to}` || graphHighlight === `${edge.to}-${edge.from}`

                return (
                  <line
                    key={`${edge.from}-${edge.to}-${index}`}
                    x1={positions[edge.from].x}
                    y1={positions[edge.from].y}
                    x2={positions[edge.to].x}
                    y2={positions[edge.to].y}
                    stroke={isHighlighted ? "#fbbf24" : "#6b7280"}
                    strokeWidth={isHighlighted ? "3" : "2"}
                    className="transition-all duration-500"
                  />
                )
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Algorithm Complexity - Apple Bento Badges */}
      <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center p-2 rounded-xl bg-white/70 dark:bg-[#2C2C2E]/70 border border-black/[0.04] dark:border-white/[0.06] shadow-xs">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Search</div>
            <div className="text-[#34C759] font-bold text-xs mt-0.5">O(log n)</div>
          </div>
          <div className="text-center p-2 rounded-xl bg-white/70 dark:bg-[#2C2C2E]/70 border border-black/[0.04] dark:border-white/[0.06] shadow-xs">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Insert</div>
            <div className="text-[#0071E3] font-bold text-xs mt-0.5">O(1)</div>
          </div>
          <div className="text-center p-2 rounded-xl bg-white/70 dark:bg-[#2C2C2E]/70 border border-black/[0.04] dark:border-white/[0.06] shadow-xs">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Delete</div>
            <div className="text-[#FF9500] font-bold text-xs mt-0.5">O(n)</div>
          </div>
          <div className="text-center p-2 rounded-xl bg-white/70 dark:bg-[#2C2C2E]/70 border border-black/[0.04] dark:border-white/[0.06] shadow-xs">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Space</div>
            <div className="text-[#AF52DE] font-bold text-xs mt-0.5">O(n)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
