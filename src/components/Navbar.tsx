import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];


export default function NavBar() {
  return (
    <Disclosure
      as="nav"
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-brand-black/10 bg-brand-fff"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Mobile: hamburger */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              aria-label="Toggle navigation menu"
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-brand-grey hover:bg-brand-black/5 hover:text-brand-black focus:outline-2 focus:outline-brand-green"
            >
              <Bars3Icon className="size-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          {/* Logo + desktop links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a href="#hero" aria-label="Go to top of page" className="flex shrink-0 items-center">
              <img
                alt="Garage Rescue logo"
                src="/gr-logo.png"
                width={777}
                height={230}
                fetchPriority="high"
                className="h-14 w-auto object-contain"
              />
            </a>
            <div className="hidden sm:ml-8 sm:flex sm:items-center">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="rounded-md px-4 py-2 text-sm font-medium text-brand-grey transition-colors hover:text-brand-black"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex sm:items-center">
            <a
              href="#contact"
              aria-label="Book a Rescue"
              className="rounded-lg bg-brand-green-btn px-4 py-2 text-sm font-semibold text-brand-black transition-opacity hover:opacity-90"
            >
              Book a Rescue
            </a>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 border-t border-brand-black/10 px-4 pb-4 pt-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-brand-grey transition-colors hover:text-brand-black"
            >
              {item.name}
            </DisclosureButton>
          ))}
          <a
            href="#contact"
            aria-label="Book a Rescue"
            className="mt-2 block rounded-lg bg-brand-green-btn px-4 py-2 text-center text-sm font-semibold text-brand-black"
          >
            Book a Rescue
          </a>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
