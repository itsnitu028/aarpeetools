import React from "react";
import banner4 from "../../assets/banner5.png";
import banner2 from "../../assets/banner6.png";
import banner3 from "../../assets/banner3.png";

// Displays three banners in a single row with hover scale-105 using Tailwind
const Frontpagebanner = () => {
  const items = [
    { src: banner4, alt: "Banner 1" },
    { src: banner2, alt: "Banner 2" },
    { src: banner3, alt: "Banner 3" },
  ];

  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group overflow-hidden rounded-lg bg-white shadow transition-transform duration-300 hover:scale-105"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frontpagebanner;