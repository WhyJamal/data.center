"use client";

import { useRef } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
    return <audio ref={audioRef} src="/sounds/connecting.mp3" />;
}