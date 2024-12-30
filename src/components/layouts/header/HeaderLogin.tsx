import { UserRound } from "lucide-react";
import Link from "next/link";

export default function HeaderLogin() {
  return (
    <Link href={`/account`}>
      <UserRound className="w-5 font-semibold" /> {/* New icon */}
    </Link>
  );
}
