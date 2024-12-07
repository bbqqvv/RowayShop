import FooterMenu from "./FooterMenu";
import FooterCopyright from "./FooterCopyright";
import FooterSocialLinks from "./FooterSocialLinks";

export default function Footer() {
  return (
    <footer className="py-6 px-10 bg-gray-100 border-t">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <FooterMenu />
        <FooterCopyright />
      </div>
      <FooterSocialLinks />
    </footer>
  );
}
