"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const BUILDINGS: Record<
  number,
  { title: string; image: string; description: string }
> = {
  1: {
    title: "Assembly Factory",
    image: "/factory/factory1.jpg",
    description: "Primary assembly line and final product integration.",
  },
  2: {
    title: "Logistics Warehouse",
    image: "/factory/warehouse1.jpg",
    description: "Storage and distribution hub for materials and shipments.",
  },
  3: {
    title: "Engineering Center",
    image: "/factory/building3.png",
    description: "Research, testing, and design optimization facility.",
  },
  4: {
    title: "Transport Yard",
    image: "/factory/asphalt4.1.png",
    description: "Vehicle loading and internal transport coordination area.",
  },
  5: {
    title: "Quality Control Unit",
    image: "/factory/building5.1.png",
    description: "Inspection and quality assurance department.",
  },
  6: {
    title: "Power & Maintenance",
    image: "/factory/building6.png",
    description: "Utilities, energy management, and servicing center.",
  },
};

export default function BuildingPage() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("building") || 1);
  const building = BUILDINGS[id] || BUILDINGS[1];

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-[#0f1923] text-white"
      initial={{ scale: 1.08, opacity: 0, filter: "blur(8px)" }}
      animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Link
        href="/dashboard"
        className="absolute left-5 top-32 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/20"
      >
        <ArrowLeft size={18} />
        Dashboard
      </Link>

      <div className="relative h-screen w-screen">
        <Image
          src={building.image}
          alt={building.title}
          fill
          className="object-cover opacity-70"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#0f1923] via-[#0f1923]/70 to-transparent" />

        <div className="absolute bottom-10 left-10 max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <h1 className="text-4xl font-bold">{building.title}</h1>
          <p className="mt-3 text-white/80">{building.description}</p>
        </div>
      </div>
    </motion.div>
  );
}