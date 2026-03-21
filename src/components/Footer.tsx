import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdPhone, MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-gray-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-6">
            <img
              src="/gr-logo.png"
              alt="Garage Rescue logo"
              width={777}
              height={230}
              className="h-12 w-auto object-contain"
            />
            <p className="max-w-xs text-sm text-gray-500">
              Reclaim your space. Professional garage organization solutions.
            </p>
          </div>

          {/* Column 2 — socials */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold tracking-widest text-gray-900">
              Socials
            </h3>
            <div className="flex gap-4" aria-label="Social media links">
              <a
                href="https://www.facebook.com/profile.php?id=61580727951830"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="text-gray-500 transition-colors hover:text-gray-900"
              >
                <FaFacebook size={32} aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/thegaragerescue?igsh=MTh1cWhmeWJqOW9obQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
                className="text-gray-500 transition-colors hover:text-gray-900"
              >
                <FaInstagram size={32} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold tracking-widest text-gray-900">
              Contact Us
            </h3>
            <ul
              className="flex flex-col gap-3"
              aria-label="Contact information"
            >
              <li>
                <a
                  href="tel:+16479149791"
                  aria-label="Brodie: (647) 914 9791"
                  className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
                >
                  <MdPhone size={16} aria-hidden="true" />
                  Brodie: (647) 914 9791
                </a>
              </li>
              <li>
                <a
                  href="tel:+16138895987"
                  aria-label="Isaac: (613) 889 5987"
                  className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
                >
                  <MdPhone size={16} aria-hidden="true" />
                  Isaac: (613) 889 5987
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@thegaragerescue.com"
                  aria-label="sales@thegaragerescue.com"
                  className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
                >
                  <MdEmail size={16} aria-hidden="true" />
                  sales@thegaragerescue.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6">
          <p className="text-center text-xs text-brand-grey">
            &copy; {new Date().getFullYear()} Garage Rescue. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
