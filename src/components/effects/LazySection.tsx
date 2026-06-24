"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Performance wrapper to lazy load heavy below-the-fold sections on client.
 * Using this removes dynamic scripts from executing on initial FCP/LCP phases.
 */
export function LazySection({
  children,
  height = "250px",
}: {
  children: React.ReactNode;
  height?: string;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px 0px" } // trigger loading 150px before entering viewport
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} style={{ minHeight: inView ? "auto" : height }} className="w-full">
      {inView ? children : null}
    </div>
  );
}
