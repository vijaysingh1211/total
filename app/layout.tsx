import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CareerGuide AI - Find Your Ideal Career Path",
  description: "Discover career paths that match your skills and interests with AI-powered guidance",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="border-b bg-white">
              <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">CareerGuide AI</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                  <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                    Home
                  </Link>
                  <Link href="/assessment" className="text-gray-600 hover:text-green-600 transition-colors">
                    Assessment
                  </Link>
                  <Link href="/chat" className="text-gray-600 hover:text-green-600 transition-colors">
                    Career Chat
                  </Link>
                </nav>
                <div className="md:hidden">{/* Mobile menu button would go here */}</div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t bg-white py-6">
              <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} CareerGuide AI. All rights reserved.</p>
                <p className="mt-2">Helping you find your ideal career path with AI-powered guidance.</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
