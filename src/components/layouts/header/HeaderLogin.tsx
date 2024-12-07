import Link from "next/link";

export default function HeaderLogin() {
  return (
    <Link href="/sign-in">
      <button className="font-semibold text-black hover:text-blue-500 transition">
        Đăng nhập
      </button>
    </Link>
  );
}
