import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const plans = [
  {
    pkg: "Bronze",
    subtitle: "Essential Clean & Clear",
    color: "#D0A234",
    pricing: { small: "$200", medium: "$300", large: "$500" },
    includes: [
      "Complete floor sweeping & industrial vacuuming",
      "Cobweb & dust removal (walls, ceiling, corners)",
      "Basic surface wiping & debris removal",
      "Trash/recycling sorting & bagging",
      "Light item reorganization using existing storage",
      "Door track cleaning",
    ],
  },
  {
    pkg: "Silver",
    subtitle: "Deep Clean & Organize",
    color: "#BCC6CC",
    pricing: { small: "$400", medium: "$600", large: "$1,000" },
    includes: [
      "Everything in Bronze, plus:",
      "Pressure washing of entire garage floor",
      "Wall washing – spot cleaning & degreasing",
      "Window cleaning (interior & exterior)",
      "Light fixture deep cleaning",
      "Oil stain treatment with cleaners",
      "Basic organizing consultation",
      "Junk removal – up to 10–15 bags or small items",
      "Workbench/shelf surface cleaning",
    ],
  },
  {
    pkg: "Gold",
    subtitle: "Complete Transformation",
    color: "#EFBF04",
    pricing: { small: "$600", medium: "$900", large: "$1,500" },
    includes: [
      "Everything in Silver, plus:",
      "Ceiling deep clean – full washing & treatment",
      "Full wall pressure washing or degreasing",
      "All built-in storage detailed cleaning",
      "Professional organizing system installation (materials extra)",
      "Premium junk removal – up to full truck load",
      "Garage door interior/exterior cleaning",
      "Weatherstripping cleaning & inspection",
      "Before/after photo documentation",
    ],
  },
];

function PricingCard({
  pkg,
  subtitle,
  color,
  pricing,
  includes,
  onSelectPackage,
}: (typeof plans)[number] & { onSelectPackage?: (pkg: string) => void }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      aria-label={`${pkg} package`}
      style={{ borderTopColor: color }}
      className="flex flex-col gap-4 rounded-xl border border-gray-200 border-t-4 bg-brand-white"
    >
      {/* Sentinel – sits at the natural position of the header */}
      <div ref={sentinelRef} className="h-0" aria-hidden="true" />

      {/* Sticky header */}
      <div
        style={stuck ? { borderBottomColor: color } : undefined}
        className={`sticky top-16 z-10 rounded-t-xl bg-brand-white px-6 pt-6 pb-2 transition-all duration-200 ${
          stuck ? "border-b-6 shadow-sm" : ""
        }`}
      >
        <span className="text-2xl font-bold text-brand-green">{pkg}</span>
        <p className="text-sm font-medium text-brand-grey">{subtitle}</p>
      </div>

      {/* Pricing table */}
      <div className="mx-6 rounded-lg bg-brand-fff p-8 text-sm">
        <p className="mb-2 font-semibold text-brand-black">
          Pricing by garage size
        </p>
        <ul className="flex flex-col gap-1 text-brand-grey">
          <li className="flex justify-between">
            <span>1–1.5 car</span>
            <span className="font-semibold text-brand-black">
              {pricing.small}
            </span>
          </li>
          <li className="flex justify-between">
            <span>2 car</span>
            <span className="font-semibold text-brand-black">
              {pricing.medium}
            </span>
          </li>
          <li className="flex justify-between">
            <span>3+ car</span>
            <span className="font-semibold text-brand-black">
              {pricing.large}
            </span>
          </li>
        </ul>
      </div>

      {/* Includes */}
      <ul
        className="mx-6 flex flex-col gap-2"
        aria-label={`What's included in ${pkg}`}
      >
        {includes.map((item) => (
          <li
            key={item}
            className="flex items-start px-5 gap-2 text-sm text-brand-grey"
          >
            <span className="mt-0.5 text-brand-green" aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto px-6 pb-6">
        <button
          type="button"
          aria-label={`Book the ${pkg} package`}
          onClick={() => {
            onSelectPackage?.(pkg);
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="block w-full rounded-lg bg-brand-green py-2.5 text-center text-sm font-semibold text-brand-black transition-opacity hover:opacity-90"
        >
          Book {pkg}
        </button>
      </div>
    </article>
  );
}

export default function Pricing({
  id,
  onSelectPackage,
}: {
  id?: string;
  onSelectPackage?: (pkg: string) => void;
}) {
  const ref = useScrollReveal();

  return (
    <section id={id} aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <span className="inline-block w-fit rounded-full border border-brand-green px-4 py-2 mb-1.5 text-sm font-medium text-brand-green">
          Transparent Pricing
        </span>
        <h2
          id="pricing-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl"
        >
          Choose Your <span className="text-brand-green">Package</span>
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-brand-grey">
          Every job is different — pick the level that fits your garage.
        </p>

        <div
          ref={ref}
          className="reveal mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.pkg}
              {...plan}
              onSelectPackage={onSelectPackage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
