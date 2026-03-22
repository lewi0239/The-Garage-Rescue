import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About({ id }: { id?: string }) {
  const ref = useScrollReveal();

  return (
    <section id={id} aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div
          ref={ref}
          className="reveal grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center"
        >
          {/* Text */}
          <div className="flex flex-col gap-6">
            <span className="inline-block w-fit rounded-full border border-brand-green-btn px-4 py-1.5 mb-1.5 text-sm font-medium text-brand-green-btn">
              Professional cleaning & organization
            </span>
            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight text-brand-black sm:text-4xl"
            >
              We Rescue Garages.
              <br />
              <span className="text-brand-green">You Get Your Space Back.</span>
            </h2>
            <p className="text-lg leading-relaxed text-brand-grey">
              Is your garage more of a storage nightmare than a functional
              space? We get it — and we're here to fix that. Garage Rescue is an
              Ottawa-based team that cleans out the clutter, hauls away the
              junk, and transforms your garage into a space you'll actually want
              to use.
            </p>
            <p className="text-lg leading-relaxed text-brand-grey">
              No job is too big or too messy. Whether it's years of accumulated
              stuff or a quick refresh, we show up, we sort it out, and we leave
              you with a garage that works for you — not against you.
            </p>
            <a
              href="#contact"
              aria-label="Book a garage rescue"
              className="self-start rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-brand-black transition-opacity hover:opacity-90"
            >
              Book a Rescue
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6" aria-label="Key stats">
            {[
              { stat: "100%", label: "Satisfaction Guaranteed" },
              { stat: "Free", label: "No-Obligation Quotes" },
              { stat: "Ottawa", label: "Locally Owned & Operated" },
              { stat: "Same Week", label: "Booking Available" },
            ].map(({ stat, label }) => (
              <div
                key={label}
                className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-brand-fff shadow-md overflow-hidden p-6"
              >
                <span className="text-3xl font-bold text-brand-green">
                  {stat}
                </span>
                <span className="text-sm font-medium text-brand-grey">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
