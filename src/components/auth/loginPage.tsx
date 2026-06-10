import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../../Redux/store";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { type ILoginError, type ILoginUser } from "../../types/type";
import { loginUser } from "../../Redux/authSlice";
import { BiSolidUser } from "react-icons/bi";
import { toast } from "sonner";
import LoaderButton from "../loader/loaderButton";
import { login } from "../../Redux/authSlice";

export default function LoginPage() {
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<ILoginUser>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState<ILoginError>({});

  const validate = (): ILoginError => {
    const errors: ILoginError = {};
    if (!user.email) errors.email = "Email is required";
    if (!user.password) errors.password = "Password is required";
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = e.target;
    if (name === "email") {
      if (value.trim() === "") {
        setUser({ ...user, email: "" });
        setError({ ...error, email: "Email field can not be empty !" });
      } else {
        setUser({ ...user, email: value });
        setError({ ...error, email: "" });
      }
    }
    if (name === "password") {
      if (value.trim() === "") {
        setUser({ ...user, password: "" });
        setError({ ...error, password: "Password field can not be empty !" });
      } else {
        setUser({ ...user, password: value });
        setError({ ...error, password: "" });
      }
    }
    if (name === "rememberMe") {
      setUser({ ...user, rememberMe: checked });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors = validate();
    setError(errors);
    if (Object.keys(errors).length > 0) return;
    let formData = {
      email: user.email,
      password: user.password,
      rememberMe: user.rememberMe,
    };
    try {
      let res = await dispatch(loginUser(formData)).unwrap();
      dispatch(login());
      toast.success(res?.message || "Login successfully");
      const tokenData = localStorage.getItem("fakekartToken");
      if (tokenData) {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.message || "Login failed !!");
    }
  };

  return (
    <div
      className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center 
    justify-center px-4 py-12"
    >
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Welcome Back
          </h1>

          <p className="text-zinc-400">
            Login to continue shopping on FakeKart
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none
               focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.password}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="rememberMe"
              checked={user.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 accent-cyan-500 cursor-pointer"
            />

            <label className="text-zinc-300 text-sm cursor-pointer">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-white 
            font-semibold cursor-pointer hover:scale-[1.02] active:scale-95 transition disabled:opacity-60 
            disabled:cursor-not-allowed"
          >
            {isLoading ? <LoaderButton /> : "Login"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 text-zinc-400 hover:text-cyan-400 transition"
          >
            <span className="text-2xl">
              <BiSolidUser />
            </span>

            <span>Don't have an account? Register</span>
          </Link>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl mx-auto min-h-screen">
  //     <h2 className="text-2xl font-bold mb-6 text-center">Login Form</h2>

  //     <form onSubmit={handleSubmit} className="space-y-4">
  //       <div>
  //         <label className="block mb-1 font-semibold">Email</label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={user.email}
  //           onChange={handleChange}
  //           className="w-full border p-2 rounded"
  //         />
  //         <span className="text-red-500 text-sm">{error?.email}</span>
  //       </div>
  //       <div>
  //         <label className="block mb-1 font-semibold">Password</label>
  //         <input
  //           type="password"
  //           name="password"
  //           value={user.password}
  //           onChange={handleChange}
  //           className="w-full border p-2 rounded"
  //         />
  //         <span className="text-red-500 text-sm">{error?.password}</span>
  //       </div>

  //       <button
  //         type="submit"
  //         disabled={isLoading}
  //         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer
  //           transition disabled:opacity-60 disabled:cursor-not-allowed"
  //       >
  //         {isLoading ? <LoaderButton /> : "Login"}
  //       </button>
  //     </form>
  //     <div>
  //       <div className="flex items-center gap-x-2 text-blue-600 hover:underline mt-3">
  //         <span className="text-3xl">
  //           <BiSolidUser />
  //         </span>
  //         <Link to="/register">Don't have an account ? Register</Link>
  //       </div>
  //     </div>
  //   </div>
  // );
}
