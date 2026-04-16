import Image from "next/image";

import { SignInCard } from "@/features/auth/sign-in-card";

export default function SignInPage() {
  return (
    <div className="w-full max-w-5xl bg-white/10 rounded-2xl shadow-2xl overflow-hidden flex">
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/images/photo_2024-08-09_11-33-27-800x600.webp"
          alt=""
          width={800}
          height={600}
          className="w-full h-full"
        />
      </div>
      <SignInCard />
    </div>
  );
}
