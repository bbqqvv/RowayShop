import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import HeaderLogin from "./HeaderLogin";

export default function Header() {
  return (
    <nav className="py-3 px-4 md:px-14 border-b flex items-center justify-between bg-white dark:bg-gray-800">
      <HeaderLogo />
      <HeaderMenu />
      <HeaderLogin />
    </nav>
  );
}
