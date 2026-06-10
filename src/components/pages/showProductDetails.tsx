import { getProductDetails, deleteProduct } from "../../Redux/productSlice";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import LoaderLarge from "../loader/loaderLarge";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { addToCart, removeFromCart } from "../../Redux/cartSlice";
import { logout } from "../../Redux/authSlice";
import { clearAuthStorage } from "../../helper/commonFunctions";

export default function ShowProductDetails() {
  const { isLoading, productDetailsData } = useSelector(
    (state: RootState) => state.product,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId]);

  const handleDeleteProduct = async () => {
    let result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result?.isConfirmed) return;
    try {
      if (!productId) {
        toast.error("No product id found !");
        return;
      }
      let res = await dispatch(deleteProduct(productId)).unwrap();
      await Swal.fire({
        title: "Deleted!",
        text: res?.message || "Your file has been deleted.",
        icon: "success",
      });
      dispatch(removeFromCart(productId));
      setTimeout(() => navigate("/"), 1000);
    } catch (error: any) {
      if (error?.message === "Access token expired !!") {
        dispatch(logout());
        clearAuthStorage();
        toast.error("Session expired. Please login again !!");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }
      Swal.fire({
        title: "Error!",
        text: error?.message || "Failed to delete file !!",
        icon: "error",
      });
    }
  };

  const handleAddToCart = () => {
    if (productDetailsData?._id) {
      dispatch(
        addToCart({
          _id: productDetailsData._id,
          price: Number(productDetailsData.price),
          title: productDetailsData.title,
          image: productDetailsData.images[0].url || "",
          quantity: 1,
        }),
      );
      toast.success("Item added to cart successfully");
    }
  };

  if (isLoading) {
    return <LoaderLarge />;
  }
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-87.5 lg:h-150 bg-zinc-800 overflow-hidden">
              {productDetailsData?.images?.[0]?.url ? (
                <img
                  src={productDetailsData.images[0].url}
                  alt={productDetailsData.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <h2 className="text-zinc-500 text-2xl font-semibold">
                    No Image Available
                  </h2>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span
                className="inline-block w-fit px-4 py-2 rounded-full text-sm font-semibold bg-cyan-500/20
               text-cyan-300 mb-5"
              >
                Product Details
              </span>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                {productDetailsData?.title}
              </h1>

              <p className="text-4xl font-bold text-emerald-400 mb-8">
                ₹{productDetailsData?.price}
              </p>
              <p className="leading-relaxed text-lg text-cyan-400 mb-4">
                {productDetailsData?.company}
              </p>

              <div className="h-px bg-zinc-800 mb-8"></div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Description
                </h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {productDetailsData?.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button
                  className="flex-1 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-white 
                font-semibold cursor-pointer hover:scale-[1.02] active:scale-95 transition"
                >
                  <Link to={`/update-product/${productDetailsData?._id}`}>
                    Edit Product
                  </Link>
                </button>

                <button
                  onClick={handleDeleteProduct}
                  className="flex-1 rounded-xl bg-linear-to-r from-red-500 to-rose-600 py-3 text-white 
                font-semibold cursor-pointer hover:scale-[1.02] active:scale-95 transition"
                >
                  Delete Product
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-xl bg-linear-to-r from-yellow-500 to-rose-600 py-3 text-white 
                font-semibold cursor-pointer hover:scale-[1.02] active:scale-95 transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
