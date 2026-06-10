import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../Redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  emptyCart,
} from "../../Redux/cartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoaderButton from "../loader/loaderButton";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState(false);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleOnclick = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(emptyCart());
      setLoading(false);
      navigate("/order-placed");
      toast.success("Order placed successfully");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-8">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-10 text-center">
            <h2 className="text-2xl text-zinc-300 mb-3">Your cart is empty</h2>

            <p className="text-zinc-500">
              Add some amazing products to get started.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            {/* Cart Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-5 flex flex-col 
                  md:flex-row gap-5"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-40 h-40 object-cover rounded-2xl"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">
                      {item.title}
                    </h2>

                    <p className="text-emerald-400 text-2xl font-bold mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-5">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                        className="w-10 h-10 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700"
                      >
                        -
                      </button>

                      <span className="text-white text-lg font-semibold min-w-7.5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(increaseQuantity(item._id))}
                        className="w-10 h-10 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => {
                        dispatch(removeFromCart(item._id));
                        toast.success(
                          `${item.title} item removed successfully`,
                        );
                      }}
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      Remove
                    </button>

                    <p className="text-cyan-400 text-xl font-bold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div
              className="h-fit rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-6 
            sticky top-24"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-zinc-300 mb-4">
                <span>Total Items</span>
                <span>{items.length}</span>
              </div>

              <div className="flex justify-between text-zinc-300 mb-6">
                <span>Total Price</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="border-t border-zinc-800 pt-6">
                <button
                  onClick={handleOnclick}
                  className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600
                  py-3 text-white font-semibold hover:scale-[1.02]
                  active:scale-95 transition cursor-pointer"
                >
                  {loading ? <LoaderButton /> : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
