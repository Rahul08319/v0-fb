/**
 * Auto-Updater & Dynamic Year Engine
 * Automatically computes current and future temporal data so content,
 * scheduled posts, algorithm roadmaps, and copyright statements
 * dynamically update across coming years without manual intervention.
 */

export interface ScheduledPostSlot {
  id: string
  title: string
  topic: string
  targetYear: number
  scheduledDate: string
  category: "algorithms" | "react" | "ai" | "system-design" | "quantum"
  status: "automated" | "queued" | "active"
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
  // Replace any 4-digit year like 2024, 2025 with the dynamic target year
  const updated = baseTitle.replace(/\b20\d{2}\b/g, `${targetYear}`)
  if (updated === baseTitle && !baseTitle.includes(`${targetYear}`)) {
    return `${baseTitle} (${targetYear})`
  }
  return updated
}

/**
 * Generates an automated publishing schedule across coming years
 */
export function generateMultiYearSchedule(yearsCount = 3): ScheduledPostSlot[] {
  const currentYear = getCurrentYear()
  const slots: ScheduledPostSlot[] = []

  const roadmapTopics = [
    {
      topic: "Master Data Structures & Algorithms",
      category: "algorithms" as const,
      monthOffset: 0,
    },
    {
      topic: "Modern React & Next.js Fullstack Architecture",
      category: "react" as const,
      monthOffset: 1,
    },
    {
      topic: "AI Agent Engineering & TypeSafe Primitives",
      category: "ai" as const,
      monthOffset: 3,
    },
    {
      topic: "Distributed Systems & Cloud Scalability",
      category: "system-design" as const,
      monthOffset: 5,
    },
    {
      topic: "Quantum Computing & Advanced Theoretical CS",
      category: "quantum" as const,
      monthOffset: 7,
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
      })
    })
  }

  return slots
}
