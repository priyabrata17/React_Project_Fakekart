import Routing from "./Rout/Routing";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./Redux/store";
import { login } from "./Redux/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const tokenData = localStorage.getItem("fakekartToken");
    if (tokenData) {
      dispatch(login());
    }
  }, [dispatch]);
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routing />
    </>
  );
}

export default App;
