"use client"

import { useEffect, useState, useRef, useTransition } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Start progress animation
  function startProgress() {
    if (timerRef.current) clearInterval(timerRef.current)
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current)

    setIsLoading(true)
    setProgress(15)

    // Increment progress smoothly
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 50) return prev + 15
        if (prev < 80) return prev + 5
        if (prev < 92) return prev + 1
        return prev
      })
    }, 200)

    // Safety timeout: auto-hide after 8 seconds in case navigation was cancelled
    safetyTimeoutRef.current = setTimeout(() => {
      completeProgress()
    }, 8000)
  }

  // Complete progress animation
  function completeProgress() {
    if (timerRef.current) clearInterval(timerRef.current)
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current)

    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setProgress(0)
      }, 200)
    }, 250)
  }

  // Whenever pathname or searchParams change, the navigation has completed!
  useEffect(() => {
    if (isLoading) {
      completeProgress()
    }
  }, [pathname, searchParams])

  // Global click interceptor for internal links
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // Don't trigger for right-click, modified clicks (Ctrl, Cmd, Shift, Alt)
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }

      // Find closest anchor tag
      const target = e.target as HTMLElement | null
      const anchor = target?.closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      const targetAttr = anchor.getAttribute("target")
      const download = anchor.getAttribute("download")

      // Ignore external, download, or new-tab links
      if (!href || targetAttr === "_blank" || download !== null) return
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return

      // Ignore pure hash anchors on the same page (e.g. href="#features")
      if (href.startsWith("#")) return

      try {
        const url = new URL(anchor.href, window.location.href)
        const currentUrl = new URL(window.location.href)

        // Ignore different origins
        if (url.origin !== currentUrl.origin) return

        // Ignore same URL (same pathname, search, and hash)
        if (url.pathname === currentUrl.pathname && url.search === currentUrl.search && url.hash === currentUrl.hash) {
          return
        }

        // Valid internal navigation: trigger feedback immediately!
        startProgress()
      } catch {
        // Invalid URL, ignore
      }
    }

    function handlePopState() {
      startProgress()
    }

    function handleCustomStart() {
      startProgress()
    }

    function handleCustomEnd() {
      completeProgress()
    }

    document.addEventListener("click", handleClick, { capture: true })
    window.addEventListener("popstate", handlePopState)
    window.addEventListener("navigation-start", handleCustomStart)
    window.addEventListener("navigation-end", handleCustomEnd)

    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("navigation-start", handleCustomStart)
      window.removeEventListener("navigation-end", handleCustomEnd)
      if (timerRef.current) clearInterval(timerRef.current)
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current)
    }
  }, [])

  if (!isLoading && progress === 0) return null

  return (
    <>
      {/* Top glowing progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none">
        <div
          className="h-[3px] bg-gradient-to-r from-primary via-emerald-500 to-amber-500 shadow-[0_0_10px_rgba(234,88,12,0.5)] transition-all duration-200 ease-out"
          style={{
            width: `${progress}%`,
            opacity: isLoading ? 1 : 0,
            transitionProperty: "width, opacity",
          }}
        />
      </div>

      {/* Floating feedback badge ("Opening page...") */}
      <div
        className="fixed top-3 right-4 z-[99999] pointer-events-none transition-all duration-300"
        style={{
          opacity: isLoading ? 1 : 0,
          transform: isLoading ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur-md border border-primary/30 shadow-lg text-xs font-semibold text-foreground">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
          <span>Opening page...</span>
        </div>
      </div>
    </>
  )
}
