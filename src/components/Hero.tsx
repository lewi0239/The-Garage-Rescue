export default function Hero({ id }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="hero-heading"
      className="flex min-h-[90vh] animate-fade-in items-center bg-brand-fff"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <span className="inline-block w-fit rounded-full border border-brand-green px-4 py-1.5 mb-1.5 text-sm font-medium text-brand-green">
              Ottawa's Garage Experts
            </span>
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-brand-black sm:text-5xl lg:text-6xl"
            >
              Reclaim <span className="text-brand-green">Your Space</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-brand-black">
              Transform your cluttered garage into an organized, functional
              space. We design and install custom storage solutions tailored to
              your needs.
            </p>
            <a
              href="#contact"
              aria-label="Book a Rescue"
              className="self-start rounded-lg bg-brand-green-btn px-6 py-3 text-sm font-semibold text-brand-black transition-opacity hover:opacity-90"
            >
              Book a Rescue
            </a>
          </div>

          {/* Hero illustration */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/hero.svg"
              alt="Garage Rescue shield illustration"
              width={201}
              height={229}
              className="h-auto w-64 drop-shadow-[8px_10px_6px_rgba(0,0,0,0.45)] sm:w-80 lg:w-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
