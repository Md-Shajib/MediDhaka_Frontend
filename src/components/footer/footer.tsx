import FooterContact from "./footer_contact";
import LogoSection from "./logo_section";
import QuickLinks from "./quick_links";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#dcebfe] to-[#cee3ff]">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <LogoSection />
          <QuickLinks />
          <FooterContact />
        </div>
        <div className="border-t border-gray-300 mt-8 pt-5 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MediDhaka. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
