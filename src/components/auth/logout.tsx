import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../Redux/store";
import LoaderButton from "../loader/loaderButton";
import { logoutUser } from "../../Redux/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/authSlice";
import { clearAuthStorage } from "../../helper/commonFunctions";

function Logout() {
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser()).unwrap();
      dispatch(logout()); //this is normal reducer that updates the redux state
      clearAuthStorage();
      navigate("/login");
      toast.success(res?.message || "Logout successfully");
    } catch (error: any) {
      if (error?.message === "Access token expired !!") {
        dispatch(logout());
        clearAuthStorage();
        toast.error("Session expired. Please login again !!");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }
      toast.error(error?.message || "Failed to logout !!");
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200
   text-white font-semibold rounded-lg shadow-md flex items-center justify-center min-w-30 cursor-pointer"
    >
      {isLoading ? <LoaderButton /> : "Logout"}
    </button>
  );
}

export default Logout;
