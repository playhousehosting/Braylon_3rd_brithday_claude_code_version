import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: "Braylon's Construction Birthday",
  description: "Celebrate Braylon's 3rd birthday – RSVP, food signup, construction game, and more!",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Braylon's Construction Birthday",
    description: "Join the ultimate construction-themed birthday party for Braylon!",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground font-sans">
        <Providers>
          <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="font-extrabold text-xl text-yellow-500 tracking-wide drop-shadow">
                BRAYLON<span className="text-orange-600">•</span>BUILD
              </div>
            </div>
          </header>
          {children}
        <footer className="mt-20 border-t border-border bg-gray-950 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© 2025 Braylon&apos;s Construction Birthday. All fun reserved.</p>
            <nav className="flex gap-6">
              <a href="#rsvp" className="hover:text-yellow-400 transition-colors">RSVP</a>
              <a href="#weather" className="hover:text-yellow-400 transition-colors">Weather</a>
              <a href="#games" className="hover:text-yellow-400 transition-colors">Learning Game</a>
              <a href="#photos" className="hover:text-yellow-400 transition-colors">Photos</a>
            </nav>
          </div>
        </footer>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}