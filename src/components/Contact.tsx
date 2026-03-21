import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const packages = ["Bronze", "Silver", "Gold"];
const garageSizes = ["1–1.5 Car", "2 Car", "3+ Car"];

export default function Contact({
  id,
  selectedPackage = "",
}: {
  id?: string;
  selectedPackage?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [packageValue, setPackageValue] = useState(selectedPackage);
  const revealRef = useScrollReveal();

  useEffect(() => {
    setPackageValue(selectedPackage);
  }, [selectedPackage]);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setIsRateLimited(false);

    const formData = new FormData(formRef.current!);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          package: formData.get("package"),
          garageSize: formData.get("garageSize"),
          message: formData.get("message"),
        }),
      });

      if (res.status === 429) {
        setIsRateLimited(true);
        return;
      }
      if (!res.ok) throw new Error("Failed");

      setIsSent(true);
      formRef.current?.reset();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={id} aria-labelledby="contact-heading">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <span className="inline-block w-fit rounded-full border border-brand-green px-4 py-1.5 mb-1.5 text-sm font-medium text-brand-green">
          Get in Touch
        </span>
        <h2
          id="contact-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-brand-black sm:text-4xl"
        >
          Book Your <span className="text-brand-green">Rescue</span>
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-brand-grey">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>

        <form
          ref={formRef}
          onSubmit={sendEmail}
          aria-label="Contact form"
          className="mt-10 flex flex-col gap-6"
          noValidate
        >
          <div ref={revealRef} className="reveal flex flex-col gap-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-brand-black"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Jane Smith"
                  autoComplete="name"
                  aria-required="true"
                  required
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-brand-black outline-none focus:border-brand-green"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-brand-black"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="jane@email.com"
                  autoComplete="email"
                  aria-required="true"
                  required
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-brand-black outline-none focus:border-brand-green"
                />
              </div>
            </div>

            {/* Package + Garage Size */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="package"
                  className="text-sm font-medium text-brand-black"
                >
                  Package
                </label>
                <select
                  id="package"
                  name="package"
                  value={packageValue}
                  onChange={(e) => setPackageValue(e.target.value)}
                  aria-required="true"
                  required
                  className="accent-brand-green rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-brand-black outline-none focus:border-brand-green"
                >
                  <option value="">Select a package...</option>
                  {packages.map((pkg) => (
                    <option key={pkg} value={pkg}>
                      {pkg}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="garageSize"
                  className="text-sm font-medium text-brand-black"
                >
                  Garage Size
                </label>
                <select
                  id="garageSize"
                  name="garageSize"
                  aria-required="true"
                  required
                  className="accent-brand-green rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-brand-black outline-none focus:border-brand-green"
                >
                  <option value="">Select a size...</option>
                  {garageSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-brand-black"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                autoComplete="off"
                placeholder="Tell us about your garage..."
                aria-required="true"
                required
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-brand-black outline-none focus:border-brand-green"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            aria-label="Book a Rescue"
            className="self-start rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-brand-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Book a Rescue"}
          </button>

          {isSent && (
            <p
              role="status"
              className="rounded-lg bg-green-50 px-6 py-3 text-sm text-green-800"
            >
              Thanks! We'll be in touch within 24 hours.
            </p>
          )}
          {isRateLimited && (
            <p
              role="alert"
              className="rounded-lg bg-yellow-50 px-6 py-3 text-sm text-yellow-800"
            >
              Too many submissions. Please wait a few minutes and try again.
            </p>
          )}
          {isError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-6 py-3 text-sm text-red-700"
            >
              Something went wrong. Please try again or call us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
