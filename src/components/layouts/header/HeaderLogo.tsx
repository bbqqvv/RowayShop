import Link from "next/link";
import Image from 'next/image';

export default function HeaderLogo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Trang chủ - Logo Công ty"
        width={150}  // Giá trị tuỳ chỉnh
        height={50}  // Giá trị tuỳ chỉnh
        className="h-6 md:h-8"
      />

    </Link>
  );
}
