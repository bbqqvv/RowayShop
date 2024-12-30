"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

export default function HeaderFavourite() {
  return (
    <Link href="/favourites" className="relative">
      <Heart className="w-5 font-semibold" />
      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center"></span>
    </Link>
  );
}
