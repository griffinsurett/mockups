import { useState, useEffect } from "react";

const images = [
  { src: "/car-detailing-cen-fl/assets/images/gallery/gallery-1.jpg", alt: "Car detailing result" },
  { src: "/car-detailing-cen-fl/assets/images/gallery/gallery-2.jpg", alt: "Luxury vehicle detail" },
  { src: "/car-detailing-cen-fl/assets/images/gallery/gallery-3.jpg", alt: "Exterior detailing" },
  { src: "/car-detailing-cen-fl/assets/images/gallery/gallery-4.jpg", alt: "Fleet detailing" },
  { src: "/car-detailing-cen-fl/assets/images/gallery/gallery-5.jpg", alt: "Detail packages" },
  { src: "/car-detailing-cen-fl/assets/images/gallery/gallery-6.jpg", alt: "Membership detailing" },
];

export default function CtaBannerGallery() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full min-h-80">
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* left-side blend */}
      <div className="absolute inset-0 bg-linear-to-b from-[#050508] via-transparent to-transparent lg:bg-linear-to-r lg:from-[#050508] lg:via-[#050508]/15 lg:via-12% lg:to-transparent lg:to-30% pointer-events-none z-10" />

      {/* dots */}
      <nav className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20" aria-label="Gallery pagination">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? "w-6 h-2.5 bg-[#d39a4d]"
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </nav>
    </div>
  );
}
