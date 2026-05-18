import { useRef, useState, useEffect } from "react";

interface Props {
  before: string;
  after: string;
  label?: string;
  className?: string;
}

export default function BeforeAfterSlider({ before, after, label, className = "" }: Props) {
  const [dividerPct, setDividerPct] = useState(0.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  const onPointerMove = (clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDividerPct(clamp(clientX - rect.left, 0, rect.width) / rect.width);
  };

  const stopDrag = () => (isDragging.current = false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => onPointerMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => { if (e.touches.length) onPointerMove(e.touches[0].clientX); };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden select-none ${className}`}>
      <div className="relative pb-[66%]">
        {/* After (right) */}
        <img
          src={after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 0 0 ${dividerPct * 100}%)` }}
          draggable={false}
        />
        {/* Before (left) */}
        <img
          src={before}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${(1 - dividerPct) * 100}% 0 0)` }}
          draggable={false}
        />

        {/* Labels */}
        <span className="absolute top-3 left-3 z-10 bg-black/60 text-white text-[10px] font-black tracking-[0.2em] uppercase px-2.5 py-1">BEFORE</span>
        <span className="absolute top-3 right-3 z-10 bg-black/60 text-white text-[10px] font-black tracking-[0.2em] uppercase px-2.5 py-1">AFTER</span>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 z-20"
          style={{ left: `${dividerPct * 100}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/80 pointer-events-none" />
          <button
            type="button"
            aria-label="Drag to compare"
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 flex items-center justify-center cursor-ew-resize touch-none shadow-lg"
            style={{ background: "linear-gradient(to right, #d39a4d, #fdd78c)" }}
            onMouseDown={(e) => { e.stopPropagation(); isDragging.current = true; }}
            onTouchStart={(e) => { e.stopPropagation(); isDragging.current = true; }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Label below */}
      {label && (
        <div className="bg-black border-t border-white/10 px-4 py-3 text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</p>
        </div>
      )}
    </div>
  );
}
