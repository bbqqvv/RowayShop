import { UserRound } from "lucide-react";
import Link from "next/link";

export default function HeaderLogin() {
  return (
    <Link href="/sign-in">
      <UserRound className="w-5 font-semibold" /> {/* New icon */}
    </Link>
  );
}
