import { useEffect, useMemo, useState } from "react";
import type { AppDispatch, RootState } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../Redux/productSlice";
import LoaderLarge from "../loader/loaderLarge";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const { productData, isLoading } = useSelector(
    (state: RootState) => state.product,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [visibleProduct, setVisibleProduct] = useState(6);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  //fetching product data
  useEffect(() => {
    dispatch(getProduct());
    console.log("Products: ", productData);
  }, [dispatch]);

  // extracting category from array
  const allCategories = [
    ...new Set(productData?.map((product) => product.category)),
  ];

  //filtering data based on user selection and search
  const filteredData = useMemo(
    () =>
      productData.length > 0
        ? productData.filter((product) => {
            const filterCategory =
              selectedCategory === "" || selectedCategory === product.category;
            const filterQuery =
              query === "" ||
              product.title.toLowerCase().includes(query.toLowerCase());
            return filterCategory && filterQuery;
          })
        : productData,
    [productData, query, selectedCategory],
  );

  //show more feature
  const handleShowMore = () => {
    setVisibleProduct((prev) => prev + 6);
  };

  console.log("filteredData:", filteredData.length);
  console.log("visibleProduct:", visibleProduct);

  if (isLoading) {
    return <LoaderLarge />;
  }
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="md:text-5xl text-3xl font-extrabold text-white mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Browse products, explore categories and find exactly what you're
            looking for.
          </p>
        </div>
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="my-8 rounded-md"
        >
          {productData.slice(0, 4).map((product) => (
            <SwiperSlide key={product._id}>
              <img
                className="w-full h-96 object-contain rounded-lg"
                src={product.images[0].url}
                alt={product.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md p-6 
      flex flex-col lg:flex-row gap-5 shadow-2xl"
        >
          <div>
            <label
              htmlFor="category"
              className="block text-zinc-300 mb-2 font-semibold"
            >
              Category
            </label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-white px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition"
            >
              <option value="">All Categories</option>

              {allCategories?.map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-zinc-300 mb-2 font-semibold">
              Search Product
            </label>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name..."
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-5 py-3 
            rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredData.length > 0 ? (
            filteredData.slice(0, visibleProduct).map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl
               hover:border-cyan-500/50 hover:-translate-y-2 hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <Link to={`/details/${product._id}`}>
                  <div className="relative h-64 overflow-hidden bg-zinc-800">
                    <img
                      src={product?.images?.[0]?.url}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 
                  mb-3"
                    >
                      {product.category}
                    </span>

                    <h2 className="text-2xl font-bold text-white mb-3 line-clamp-1 group-hover:text-cyan-400 transition">
                      {product.title}
                    </h2>

                    <p className="text-3xl font-bold text-emerald-400 mb-3">
                      ₹{product.price}
                    </p>

                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-5">
                      {product.description}
                    </p>

                    <button
                      className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-white 
                  font-semibold cursor-pointer hover:scale-[1.02] active:scale-95 transition"
                    >
                      View Details
                    </button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-zinc-400 text-xl">No products found.</p>
            </div>
          )}
        </div>

        {filteredData.length > visibleProduct && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleShowMore}
              className="px-8 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold 
            cursor-pointer hover:scale-105 active:scale-95 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
