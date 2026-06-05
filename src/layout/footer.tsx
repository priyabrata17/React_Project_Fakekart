import { SiFlipkart } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl text-cyan-400">
                <SiFlipkart />
              </span>

              <h2 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                FakeKart
              </h2>
            </div>

            <p className="text-zinc-400 leading-relaxed">
              Discover premium products with a modern shopping experience.
              Built with React, Redux Toolkit, TypeScript and Tailwind CSS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">
              Quick Links
            </h3>

            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-cyan-400 transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/create-product"
                  className="hover:text-cyan-400 transition"
                >
                  Create Product
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">
              Resources
            </h3>

            <ul className="space-y-2 text-zinc-400">
              <li className="hover:text-cyan-400 transition cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-cyan-400 transition cursor-pointer">
                Terms & Conditions
              </li>

              <li className="hover:text-cyan-400 transition cursor-pointer">
                Support
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">
              Contact
            </h3>

            <div className="space-y-2 text-zinc-400">
              <p>support@fakekart.com</p>
              <p>+91 1234567890</p>
              <p>West Bengal, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-zinc-500">
          <p>
            © {new Date().getFullYear()} FakeKart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}