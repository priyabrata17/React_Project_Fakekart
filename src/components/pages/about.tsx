export default function About() {
  const values = [
    {
      title: "Quality First",
      text: "Every product is selected with attention to durability, usefulness and everyday value.",
    },
    {
      title: "Simple Shopping",
      text: "Clean product details, quick browsing and focused categories help customers find what matters.",
    },
    {
      title: "Trusted Experience",
      text: "Product Hub keeps the experience clear, modern and reliable from discovery to checkout.",
    },
  ];

  const steps = ["Discover", "Compare", "Choose"];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-cyan-600 via-blue-700
         to-indigo-800 p-8 md:p-14 mb-12"
        >
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm mb-5">
              About Product Hub
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5">
              Built For Better Product Discovery
            </h1>

            <p className="text-white/80 text-lg leading-relaxed">
              Product Hub is a modern product browsing experience made for
              customers who want clear information, useful categories and a
              smooth way to explore quality products.
            </p>
          </div>

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-10">
            <span className="text-cyan-300 font-semibold">Our Mission</span>

            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5">
              Make every product easy to understand
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-6">
              We focus on a clean interface where product images, prices,
              categories and descriptions are easy to scan. The goal is to keep
              shopping simple without losing the premium feel of the store.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl bg-slate-950 border border-zinc-800 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-cyan-400">
                    0{index + 1}
                  </p>
                  <p className="text-zinc-300 text-sm mt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-10">
            <span className="text-cyan-300 font-semibold">Why Choose Us</span>

            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5">
              A store that feels fast, focused and familiar
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-8">
              Product Hub is designed around the way people actually browse:
              search quickly, filter by category, compare details and move
              forward with confidence.
            </p>

            <div className="space-y-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-zinc-800 bg-slate-950 p-5"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Designed Around Products
          </h2>

          <p className="max-w-3xl mx-auto text-zinc-400 leading-relaxed">
            From the home page to each product detail, the app keeps the same
            bold dark theme, sharp product focus and polished cyan highlights so
            the full experience feels connected.
          </p>
        </section>
      </div>
    </div>
  );
}
