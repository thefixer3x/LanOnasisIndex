"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import "./logo-carousel.css"

interface LogoCarouselProps {
  logos: { src: string; alt: string; href?: string; fallback?: string }[]
  className?: string
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export function LogoCarousel({
  logos = [],
  className,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
}: LogoCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [start, setStart] = React.useState(false)

  React.useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return
    
    // Add event listeners for resize to handle responsive behavior
    const onResize = () => {
      if (!scrollerRef.current || !containerRef.current) return
      
      const scrollerContent = Array.from(scrollerRef.current.children)
      
      // If we don't have enough logos to scroll, duplicate them
      if (scrollerContent.length <= 8) {
        const duplicateContent = [...scrollerContent].map((item) => item.cloneNode(true))
        duplicateContent.forEach((item) => {
          scrollerRef.current?.appendChild(item)
        })
      }
      
      setStart(true)
    }

    // Call once on mount
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Direction is now handled via CSS classes

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full overflow-hidden mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)",
        className,
        pauseOnHover && "group"
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-8 py-4 logo-scroller",
          start && "animate-scroll",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          direction === "right" ? "scroll-right" : "scroll-left"
        )}
        data-speed={speed}
      >
        {logos.map((logo, idx) => (
          <div
            className="mx-6 flex h-20 w-[150px] items-center justify-center"
            key={idx}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-14"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain transition-all duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  className="logo-fallback h-14 w-full items-center justify-center rounded bg-blue-600/10 text-blue-300 font-bold text-sm"
                >
                  {logo.fallback || logo.alt.substring(0, 2).toUpperCase()}
                </div>
              </a>
            ) : (
              <>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain transition-all duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  className="logo-fallback h-14 w-full items-center justify-center rounded bg-blue-600/10 text-blue-300 font-bold text-sm"
                >
                  {logo.fallback || logo.alt.substring(0, 2).toUpperCase()}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-8 py-4 logo-scroller",
          start && "animate-scroll",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          direction === "right" ? "scroll-right" : "scroll-left"
        )}
        data-speed={speed}
      >
        {logos.map((logo, idx) => (
          <div
            className="mx-6 flex h-20 w-[150px] items-center justify-center"
            key={`duplicate-${idx}`}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-14"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain transition-all duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  className="logo-fallback h-14 w-full items-center justify-center rounded bg-blue-600/10 text-blue-300 font-bold text-sm"
                >
                  {logo.fallback || logo.alt.substring(0, 2).toUpperCase()}
                </div>
              </a>
            ) : (
              <>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain transition-all duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  className="logo-fallback h-14 w-full items-center justify-center rounded bg-blue-600/10 text-blue-300 font-bold text-sm"
                >
                  {logo.fallback || logo.alt.substring(0, 2).toUpperCase()}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
