import Link from "next/link";

interface MenuItem {
  name: string;
  link: string;
}

const menuList: MenuItem[] = [
  { name: "Trang chủ", link: "/" },
  { name: "Về chúng tôi", link: "/about-us" },
  { name: "Liên hệ", link: "/contact" },
  { name: "Chính sách bảo mật", link: "/privacy-policy" },
];

export default function FooterMenu() {
  return (
    <ul className="flex flex-wrap gap-6">
      {menuList.map((menu, index) => (
        <li key={index}>
          <Link href={menu.link} className="text-gray-700 hover:text-blue-600">
            {menu.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
