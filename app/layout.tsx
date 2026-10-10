import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F7' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: `EchoPost Studio • Apple-Grade Social & Algorithm Studio (${new Date().getFullYear()})`,
  description: 'High-performance social content generator, interactive data structures visualizer, and multi-page Facebook publisher crafted with Apple Human Interface Guidelines and Liquid Glass aesthetics.',
  keywords: ['Facebook Publisher', 'Data Structures Visualizer', 'Apple Design', 'Next.js 15', 'AI Post Generator', 'TypeSafe AI'],
  authors: [{ name: 'Rahul Kumar', url: 'https://github.com/Rahul08319' }],
  openGraph: {
    title: 'EchoPost Studio • Next-Gen Facebook & Algorithm Studio',
    description: 'Interactive social posting and algorithm visualization platform designed with Apple aesthetics.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] selection:bg-[#0071E3] selection:text-white">
        {children}
      </body>
    </html>
  )
}
