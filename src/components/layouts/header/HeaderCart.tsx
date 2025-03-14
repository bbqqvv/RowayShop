import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderCart() {
  return (
    <Link href="/cart">
      <ShoppingCart className="w-5 font-semibold" /> {/* New icon */}
    </Link>
  );
}
