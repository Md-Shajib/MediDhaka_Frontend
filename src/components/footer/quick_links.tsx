import Link from "next/link";
import { FOOTER_LINKS } from "@/constant/footer";

export default function QuickLinks() {
  return (
    <>
      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-3">
          Quick Links
        </h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          {FOOTER_LINKS.map((link, idx) => (
            <li key={idx}>
              <Link href={link.href} className="hover:text-blue-600 transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
