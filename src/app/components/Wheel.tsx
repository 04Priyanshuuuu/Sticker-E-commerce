"use client";
import React, { useEffect, useRef, useState } from "react";

interface CarouselItem {
  src: string;
  label: string;
}

const images: CarouselItem[] = [
  { src: "/1.jpg", label: "Don" },
  { src: "/2.jpg", label: "Don" },
  { src: "/3.jpg", label: "Don" },
  { src: "/4.jpg", label: "Don" },
  { src: "/5.jpg", label: "Don" },
  { src: "/6.jpg", label: "Don" },
  { src: "/7.jpg", label: "Don" },
  { src: "/8.jpg", label: "Don" },
  { src: "/9.jpg", label: "Don" },
  { src: "/10.jpg", label: "Don" },
];

const Carousel3D: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [rotationY, setRotationY] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const count = images.length;
  const theta = 360 / count;
  const radius = 400;

  // Position images in a circle
  useEffect(() => {
    const cards = trackRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card, i) => {
        const angle = theta * i;
        (
          card as HTMLElement
        ).style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
      });
    }
  }, [theta]);

  // Update carousel rotation
  const updateRotation = (newRotation: number) => {
    setRotationY(newRotation);
    if (trackRef.current) {
      trackRef.current.style.transform = `rotateY(${newRotation}deg)`;
    }
  };

  // Mouse drag handling
  useEffect(() => {
    let isDragging = false;
    let startX = 0;

    const scene = sceneRef.current;
    if (!scene) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDragging = true;
      startX = e.pageX;
      scene.style.cursor = "grabbing";
    };

    const handleMouseUp = () => {
      isDragging = false;
      scene.style.cursor = "grab";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.pageX - startX;
      startX = e.pageX;
      updateRotation(rotationY + delta * 0.3);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      updateRotation(rotationY + e.deltaY * 0.2);
    };

    scene.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    scene.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scene.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      scene.removeEventListener("wheel", handleWheel);
    };
  }, [rotationY]);

  // Handle card click
  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    updateRotation(-theta * index);
  };

  // Deselect when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".carousel-card")) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black overflow-hidden">
      <div
        ref={sceneRef}
        className="relative w-[400px] h-[400px] max-w-full cursor-grab"
        style={{ transform: "translateY(180px)" }}
      >
        <div
          ref={trackRef}
          className="absolute w-full h-full transition-transform duration-500 transform-style-3d"
          style={{ transformOrigin: "center center center" }}
        >
          {images.map((image, i) => (
            <div
              key={i}
              className={`carousel-card absolute w-40 h-52 bg-neutral-900 text-gray-300 p-2 rounded-lg shadow-lg text-center transition-transform duration-300 transform-style-3d cursor-pointer ${
                activeIndex === i
                  ? "scale-[1.06] border-2 border-cyan-400 shadow-[0_0_10px_#00fff7,0_0_20px_#00fff7] z-20"
                  : "hover:scale-110 hover:z-10"
              }`}
              onClick={() => handleCardClick(i)}
            >
              <img
                src={image.src}
                alt={image.label}
                className="w-full h-40 object-cover rounded-md"
              />
              <p className="mt-2 text-sm text-gray-400">{image.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel3D;
