"use client";
import React from "react";
import Image from "next/image";

interface AspectRatioImageProps {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g., "16/9", "1/1", "4/3"
}

export default function AspectRatioImage({
  src,
  alt,
  aspectRatio = "16/9",
}: AspectRatioImageProps) {
  // Convert "16/9" -> 16 / 9 number
  const [w, h] = aspectRatio.split("/").map(Number);
  const paddingTop = (h / w) * 100; // padding-top % trick

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-white"
      style={{ paddingTop: `${paddingTop}%` }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} priority />
    </div>
  );
}