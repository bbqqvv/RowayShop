import { Heart } from "lucide-react";
import Link from "next/link";

export default function HeaderFavourite() {
  return (
    <Link href="/favourite">
      <Heart className="w-5 font-semibold" /> {/* New icon */}
    </Link>
  );
}
