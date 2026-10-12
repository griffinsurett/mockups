import { useState, useEffect } from "react";

interface GalleryItem {
  src: string;
  alt: string;
}

export default function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const [spv, setSpv] = useState(4);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSpv(w >= 1024 ? 4 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, items.length - spv);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [maxIndex]);

  const translatePct = (index / items.length) * 100;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${(items.length / spv) * 100}%`,
          transform: `translateX(-${translatePct}%)`,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-none relative group overflow-hidden border-r border-gray-900/50 last:border-r-0"
            style={{ width: `${100 / items.length}%` }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-87.5 lg:h-100 object-cover group-hover:scale-105 transition-transform duration-700 block"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
