"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname(); 

  useEffect(() => {
    if (pathname === "/dashboard") { 
      audioRef.current?.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction");
      });
    }
  }, [pathname]); 

  return <audio ref={audioRef} src="/sounds/connecting.mp3" />;
}