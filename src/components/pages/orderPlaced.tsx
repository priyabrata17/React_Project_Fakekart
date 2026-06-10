import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function OrderPlaced() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-16">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div
          className="w-full rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 text-center shadow-2xl 
        shadow-cyan-950/30 backdrop-blur-md sm:p-12"
        >
          <div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border
           border-emerald-400/30 bg-emerald-400/10 text-5xl text-emerald-400"
          >
            <FaCheck />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Order Confirmed
          </p>

          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
            Order placed successfully
          </h1>

          <p className="mx-auto mb-9 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            Thank you for shopping with FakeKart. Your order has been received
            and will be processed shortly.
          </p>

          <p className="mb-6 text-zinc-300">
            Redirecting to home in{" "}
            <span className="font-bold text-cyan-400">{timeLeft}</span>{" "}
            seconds
          </p>

          <Link
            to="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r
             from-cyan-500 to-blue-600 px-7 py-3 font-semibold text-white transition hover:scale-[1.02] 
             active:scale-95 sm:w-auto"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
