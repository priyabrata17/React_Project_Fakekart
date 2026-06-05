import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../Redux/store";
import { userDashboard } from "../../Redux/authSlice";
import Logout from "./logout";

const Dashboard = () => {
  const { dashBoardData } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userDashboard());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white">
              Dashboard
            </h1>

            <p className="text-zinc-400 mt-2">
              Welcome back, {dashBoardData?.username}
            </p>
          </div>

          <Logout />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl">
              <div className="h-32 bg-linear-to-r from-cyan-500 to-blue-600"></div>

              <div className="px-6 pb-8">
                <div className="-mt-16 flex justify-center">
                  <img
                    src={dashBoardData?.image?.url}
                    alt={dashBoardData?.username}
                    className="w-32 h-32 rounded-full border-4 border-zinc-900 object-cover shadow-lg"
                  />
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold text-white">
                    {dashBoardData?.username}
                  </h2>

                  <p className="text-zinc-400 mt-1">
                    {dashBoardData?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8">
                Account Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-zinc-800/60 rounded-2xl p-5 border border-zinc-700">
                  <p className="text-sm text-cyan-400 font-medium mb-2">
                    Username
                  </p>

                  <p className="text-lg text-white font-semibold">
                    {dashBoardData?.username}
                  </p>
                </div>

                <div className="bg-zinc-800/60 rounded-2xl p-5 border border-zinc-700">
                  <p className="text-sm text-cyan-400 font-medium mb-2">
                    Email
                  </p>

                  <p className="text-lg text-white font-semibold break-all">
                    {dashBoardData?.email}
                  </p>
                </div>

                <div className="bg-zinc-800/60 rounded-2xl p-5 border border-zinc-700">
                  <p className="text-sm text-cyan-400 font-medium mb-2">
                    Phone Number
                  </p>

                  <p className="text-lg text-white font-semibold">
                    {dashBoardData?.phone}
                  </p>
                </div>

                <div className="bg-zinc-800/60 rounded-2xl p-5 border border-zinc-700">
                  <p className="text-sm text-cyan-400 font-medium mb-2">
                    City
                  </p>

                  <p className="text-lg text-white font-semibold">
                    {dashBoardData?.city}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <h3 className="text-cyan-400 font-semibold mb-2">
                  Account Status
                </h3>

                <p className="text-zinc-300">
                  Your account is active and ready to use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { type AppDispatch, type RootState } from "../../Redux/store";
// import { userDashboard } from "../../Redux/authSlice";
// import Logout from "./logout";

// const Dashboard = () => {
//   const { dashBoardData } = useSelector((state: RootState) => state.auth);
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(userDashboard());
//   }, [dispatch]);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="flex-1 flex flex-col">
//         <header className="bg-white shadow p-4 flex justify-between items-center">
//           <h1 className="text-xl font-semibold">Welcome Back</h1>
//           <div className="text-sm text-gray-600">{dashBoardData?.username}</div>
//         </header>

//         <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-4 rounded-xl shadow">
//             <img src={dashBoardData?.image?.url} alt={dashBoardData?.username} />
//             <h3 className="text-lg font-semibold">
//               <span className="text-rose-400">Username:</span>{" "}
//               {dashBoardData?.username}
//             </h3>
//             <p className="text-lg font-semibold">
//               <span className="text-rose-400">Email:</span>{" "}
//               {dashBoardData?.email}
//             </p>
//             <p className="text-lg font-semibold">
//               <span className="text-rose-400">Phone:</span>{" "}
//               {dashBoardData?.phone}
//             </p>
//             <Logout />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
