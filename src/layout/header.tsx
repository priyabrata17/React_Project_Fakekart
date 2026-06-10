import type { INavLinks } from "../types/type";
import { NavLink } from "react-router-dom";
import { TfiMenuAlt, TfiClose } from "react-icons/tfi";
import { useState } from "react";
import { SiFlipkart } from "react-icons/si";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";

const navLinksPublic: INavLinks[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "Register", path: "/register" },
  { name: "Login", path: "/login" },
];

const navLinksPrivate: INavLinks[] = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About", path: "/about" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "Create Product", path: "/create-product" },
  { name: "Cart", path: "/cart" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const navLinks = isAuthenticated ? navLinksPrivate : navLinksPublic;

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800
     text-white px-4 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800 text-cyan-400
             transition-all overflow-hidden duration-300"
          >
            {isOpen ? (
              <span className="text-red-500">
                <TfiClose />
              </span>
            ) : (
              <TfiMenuAlt />
            )}
          </button>

          <NavLink
            to={"/"}
            className="flex items-center gap-2 ml-3 md:ml-0 text-xl md:text-2xl font-bold"
          >
            <span className="text-2xl text-cyan-400">
              <SiFlipkart />
            </span>
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Fakekart
            </span>
          </NavLink>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive
                      ? "text-cyan-400"
                      : "text-zinc-300 hover:text-cyan-400"
                  }`
                }
              >
                {link.name === "Cart" ? (
                  <span className="flex items-center gap-2">
                    <FiShoppingCart className="text-lg text-rose-400" />
                    Cart({items.length})
                  </span>
                ) : (
                  link.name
                )}
                {/* {link.name} */}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <ul
        className={`md:hidden mt-4 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li className="px-4 py-3 font-bold text-cyan-400 border-b border-zinc-800">
          Menu
        </li>

        {navLinks.map((link) => (
          <li
            key={link.name}
            className="border-b border-zinc-800 last:border-none"
          >
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-3 transition ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-cyan-400"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name === "Cart" ? (
                <span className="flex items-center gap-2">
                  <FiShoppingCart className="text-lg text-rose-400" />
                  Cart({items.length})
                </span>
              ) : (
                link.name
              )}
              {/* {link.name} */}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
