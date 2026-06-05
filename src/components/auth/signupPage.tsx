import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../../Redux/store";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  type IRegistrationError,
  type IRegistrationUser,
} from "../../types/types";
import { registerUser } from "../../Redux/authSlice";
import { BiSolidUser } from "react-icons/bi";
import LoaderButton from "../loader/loaderButton";
import { toast } from "sonner";

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [user, setUser] = useState<IRegistrationUser>({
    username: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    image: null,
  });

  const [error, setError] = useState<IRegistrationError>({});

  const validate = (): IRegistrationError => {
    const errors: IRegistrationError = {};

    if (!user.username) errors.username = "Username is required";
    if (!user.email) errors.email = "Email is required";
    if (!user.password) errors.password = "Password is required";
    if (!user.phone) errors.phone = "Phone number is required";
    if (!user.city) errors.city = "City is required";
    if (!user.image) errors.image = "Image is required";

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "username") {
      if (value.trim() === "") {
        setUser({ ...user, username: "" });
        setError({ ...error, username: "Username field cannot be empty!" });
      } else {
        setUser({ ...user, username: value });
        setError({ ...error, username: "" });
      }
    }

    if (name === "email") {
      if (value.trim() === "") {
        setUser({ ...user, email: "" });
        setError({ ...error, email: "Email field cannot be empty!" });
      } else {
        setUser({ ...user, email: value });
        setError({ ...error, email: "" });
      }
    }

    if (name === "password") {
      if (value.trim() === "") {
        setUser({ ...user, password: "" });
        setError({ ...error, password: "Password field cannot be empty!" });
      } else {
        setUser({ ...user, password: value });
        setError({ ...error, password: "" });
      }
    }

    if (name === "phone") {
      if (value.trim() === "") {
        setUser({ ...user, phone: "" });
        setError({ ...error, phone: "Phone field cannot be empty!" });
      } else {
        setUser({ ...user, phone: value });
        setError({ ...error, phone: "" });
      }
    }

    if (name === "city") {
      if (value.trim() === "") {
        setUser({ ...user, city: "" });
        setError({ ...error, city: "City field cannot be empty!" });
      } else {
        setUser({ ...user, city: value });
        setError({ ...error, city: "" });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setUser({ ...user, image: null });
      setError({ ...error, image: "Image is required" });
    } else {
      setUser({ ...user, image: file });
      setError({ ...error, image: "" });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const errors = validate();
    setError(errors);

    if (Object.keys(errors).length > 0) return;

    const formData = new FormData();

    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phone", user.phone);
    formData.append("city", user.city);

    if (user.image) {
      formData.append("image", user.image);
    }

    try {
      let res = await dispatch(registerUser(formData)).unwrap();

      toast.success(
        res?.message ||
          "Congrats, You have signed up successfully. Now Login to continue",
      );

      navigate("/login");
    } catch (error: any) {
      toast.error(error?.message || "Failed to register!");
    }
  };

  return (
    <div
      className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center 
    justify-center px-4 py-12"
    >
      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Create Account
          </h1>

          <p className="text-zinc-400">
            Join FakeKart and start exploring amazing products
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none
               focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.username}
            </span>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none
               focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.email}
            </span>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none
               focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.password}
            </span>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none
               focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.phone}
            </span>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-2">City</label>

            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none
               focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.city}
            </span>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-3 rounded-xl 
              cursor-pointer file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2
               file:text-white hover:file:bg-cyan-600"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.image}
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-white 
            font-semibold cursor-pointer hover:scale-[1.02] active:scale-95 transition disabled:opacity-60 
            disabled:cursor-not-allowed"
          >
            {isLoading ? <LoaderButton /> : "Create Account"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-zinc-400 hover:text-cyan-400 transition"
          >
            <span className="text-2xl">
              <BiSolidUser />
            </span>

            <span>Already have an account? Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
