import { toast } from "sonner";

export default function ContactUs() {
  const contactCards = [
    {
      title: "Email",
      value: "support@producthub.com",
      text: "Send product questions or order support requests anytime.",
    },
    {
      title: "Phone",
      value: "+91 1122335555",
      text: "Talk with our support team during business hours.",
    },
    {
      title: "Location",
      value: "Kolkata, India",
      text: "Serving customers with a modern online shopping experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-cyan-600 via-blue-700
         to-indigo-800 p-8 md:p-14 mb-12"
        >
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm mb-5">
              Contact Us
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5">
              We Are Here To Help
            </h1>

            <p className="text-white/80 text-lg leading-relaxed">
              Have a question about a product, category or order? Reach out and
              the Product Hub team will help you with clear and friendly
              support.
            </p>
          </div>

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 hover:border-cyan-500/50 transition"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-300 mb-4">
                {card.title}
              </span>

              <h2 className="text-xl font-bold text-white mb-3">
                {card.value}
              </h2>

              <p className="text-zinc-400 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-10">
            <span className="text-cyan-300 font-semibold">Support Hours</span>

            <h2 className="text-3xl font-bold text-white mt-3 mb-5">
              Quick replies for better shopping
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-8">
              Our team can help with product information, category guidance and
              general store questions.
            </p>

            <div className="space-y-4">
              <div
                className="flex items-center justify-between rounded-2xl border border-zinc-800
               bg-slate-950 p-4"
              >
                <span className="text-zinc-300">Monday - Friday</span>
                <span className="text-white font-semibold">10 AM - 7 PM</span>
              </div>

              <div
                className="flex items-center justify-between rounded-2xl border border-zinc-800
               bg-slate-950 p-4"
              >
                <span className="text-zinc-300">Saturday</span>
                <span className="text-white font-semibold">10 AM - 4 PM</span>
              </div>

              <div
                className="flex items-center justify-between rounded-2xl border border-zinc-800
               bg-slate-950 p-4"
              >
                <span className="text-zinc-300">Sunday</span>
                <span className="text-white font-semibold">Closed</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-10">
            <span className="text-cyan-300 font-semibold">Send A Message</span>

            <h2 className="text-3xl font-bold text-white mt-3 mb-8">
              Tell us what you need
            </h2>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-slate-950 border border-zinc-800 px-5 py-3 rounded-xl
                   text-white outline-none focus:ring-2 focus:ring-cyan-500"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-slate-950 border border-zinc-800 px-5 py-3 rounded-xl
                   text-white outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-slate-950 border border-zinc-800 px-5 py-3 rounded-xl 
                text-white outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <textarea
                rows={6}
                placeholder="Write your message"
                className="w-full resize-none bg-slate-950 border border-zinc-800 px-5 py-3 rounded-xl
                 text-white outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <button
                type="button"
                onClick={() => toast.success("Message sent successfully. Our team will contact you sortly.")}
                className="w-full md:w-auto px-8 py-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600
                 text-white font-semibold hover:scale-105 transition cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
