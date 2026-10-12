/**
 *  FBPostForge Autonomous Multi-Year Dynamic Engine
 * 
 * Automatically computes current and future temporal data so content,
 * scheduled posts, algorithm roadmaps, copyright notices, and tech ecosystem
 * benchmarks dynamically update across coming years without manual intervention.
 */

export interface ScheduledPostSlot {
  id: string
  title: string
  topic: string
  targetYear: number
  scheduledDate: string
  category: "algorithms" | "react" | "ai" | "system-design" | "quantum"
  status: "automated" | "queued" | "active"
  reachEstimate: string
}

export interface TechEcosystemMilestone {
  year: number
  framework: string
  version: string
  headline: string
  focusArea: string
}

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

export function getCopyrightNotice(startYear = 2024): string {
  const current = getCurrentYear()
  if (current <= startYear) return `© ${startYear}`
  return `© ${startYear}–${current}`
}

/**
 * Ensures technical titles stay fresh for the current and future years.
 * Replaces outdated years with current/target year dynamically.
 */
export function getDynamicTitle(baseTitle: string, offset = 0): string {
  const targetYear = getCurrentYear() + offset
  const updated = baseTitle.replace(/\b20\d{2}\b/g, `${targetYear}`)
  if (updated === baseTitle && !baseTitle.includes(`${targetYear}`)) {
    return `${baseTitle} (${targetYear})`
  }
  return updated
}

/**
 * Returns an array of target years starting from the current year.
 */
export function getTargetYears(count = 5): number[] {
  const base = getCurrentYear()
  return Array.from({ length: count }, (_, i) => base + i)
}

/**
 * Generates projected technology milestones dynamically for coming years.
 */
export function getPerpetualTechRoadmap(count = 5): TechEcosystemMilestone[] {
  const baseYear = getCurrentYear()
  const milestones: TechEcosystemMilestone[] = [
    {
      year: baseYear,
      framework: "Next.js",
      version: "v15.2+",
      headline: "React 19 Server Actions & Fluid Compute",
      focusArea: "App Router & TypeSafe Jev Integration",
    },
    {
      year: baseYear + 1,
      framework: "Next.js",
      version: "v16.0",
      headline: "Turbopack Default Bundler & Cache Components",
      focusArea: "Zero-Latency Dynamic Partial Prerendering",
    },
    {
      year: baseYear + 2,
      framework: "React",
      version: "v20.0",
      headline: "Autonomous Compiler & Quantum Re-renders",
      focusArea: "Hardware-Accelerated React Native & Web Surfaces",
    },
    {
      year: baseYear + 3,
      framework: "TypeScript",
      version: "v6.0",
      headline: "Native WASM Type Checking & Semantic Units",
      focusArea: "Compile-Time TypeSafe System One Inference",
    },
    {
      year: baseYear + 4,
      framework: "Web Standards",
      version: `ECMA-${baseYear + 4}`,
      headline: "Native Client AI Inference & Liquid Glass CSS",
      focusArea: "Global High-Performance Edge Runtime Mesh",
    },
  ]
  return milestones.slice(0, count)
}

/**
 * Generates an automated publishing schedule across coming years.
 */
export function generateMultiYearSchedule(yearsCount = 5): ScheduledPostSlot[] {
  const currentYear = getCurrentYear()
  const slots: ScheduledPostSlot[] = []

  const roadmapTopics = [
    {
      topic: "Master Data Structures & Algorithms",
      category: "algorithms" as const,
      monthOffset: 0,
      reach: "48.2k reach",
    },
    {
      topic: "Modern React & Next.js Fullstack Architecture",
      category: "react" as const,
      monthOffset: 2,
      reach: "39.5k reach",
    },
    {
      topic: "AI Agent Engineering & TypeSafe Primitives",
      category: "ai" as const,
      monthOffset: 4,
      reach: "62.1k reach",
    },
    {
      topic: "Distributed Systems & Cloud Scalability",
      category: "system-design" as const,
      monthOffset: 7,
      reach: "31.8k reach",
    },
    {
      topic: "Quantum Computing & Advanced Theoretical CS",
      category: "quantum" as const,
      monthOffset: 10,
      reach: "27.4k reach",
    },
  ]

  for (let y = 0; y < yearsCount; y++) {
    const year = currentYear + y
    roadmapTopics.forEach((item, index) => {
      const scheduledDate = new Date(year, item.monthOffset, 15, 10, 0, 0)
      slots.push({
        id: `auto_${year}_${index}`,
        title: `🚀 ${item.topic} in ${year}`,
        topic: item.topic,
        targetYear: year,
        scheduledDate: scheduledDate.toISOString(),
        category: item.category,
        status: y === 0 && index === 0 ? "active" : "automated",
        reachEstimate: item.reach,
      })
    })
  }

  return slots
}
