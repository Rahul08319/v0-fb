"use client"

import { useState, useEffect } from "react"

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

  // Animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through different operations
      const operations = ["array", "linkedList", "tree", "graph"]
      const currentOp = operations[Math.floor(Date.now() / 3000) % operations.length]

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
  }, [])

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

        // Find insertion point in BST
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

  return (
    <div className="w-full h-80 p-6 bg-gradient-to-br from-blue-50 to-purple-50">
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

      {/* Algorithm Complexity */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs">
          <div className="text-center">
            <div className="font-semibold text-gray-700">Search</div>
            <div className="text-green-600">O(log n)</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">Insert</div>
            <div className="text-blue-600">O(1)</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">Delete</div>
            <div className="text-orange-600">O(n)</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">Space</div>
            <div className="text-purple-600">O(n)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
