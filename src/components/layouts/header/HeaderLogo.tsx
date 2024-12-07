import Link from "next/link";

export default function HeaderLogo() {
    return (
      <Link href="/">
        <img className="h-6 md:h-8" src="/logo.png" alt="Trang chủ - Logo Công ty" />
      </Link>
    );
  }
  