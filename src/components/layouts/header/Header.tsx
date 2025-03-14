import HeaderLogo from "./HeaderLogo";
import HeaderLogin from "./HeaderLogin";
import HeaderFavourite from "./HeaderFavourite";
import HeaderCart from "./HeaderCart";
import HeaderSearch from "./HeadeSearch";
import LogoutButton from "./LogoutButton";
export default function Header() {
  return (
      <nav className="sticky top-0 z-50 w-full py-3 px-4 md:px-14 border-b flex justify-between items-center bg-white dark:bg-gray-800">
        {/* Left section: Logo and Menu */}
        <div className="flex items-center space-x-6">
          <HeaderLogo />
          <HeaderSearch />
        </div>

        {/* Right section: Cart, Favourite, and Login */}
        <div className="flex items-center space-x-6">
          <HeaderCart />
          <HeaderFavourite />
          <HeaderLogin />
          <LogoutButton />
        </div>
      </nav>
  );
}
