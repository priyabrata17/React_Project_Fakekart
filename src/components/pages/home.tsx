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
import imageOne from "../../assets/image-1.jpg";
import imageTwo from "../../assets/Image-2.jpg";
import imageThree from "../../assets/image-3.jpg";
import imageFour from "../../assets/image-4.jpg";

export default function Home() {
  const { productData, isLoading } = useSelector(
    (state: RootState) => state.product,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [visibleProduct, setVisibleProduct] = useState(6);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const imageArr = [
    {
      name: "Technology",
      url: imageOne,
    },
    {
      name: "Fashion",
      url: imageTwo,
    },
    {
      name: "Home & Living",
      url: imageThree,
    },
    {
      name: "Beauty & Care",
      url: imageFour,
    },
  ];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-cyan-600 via-blue-700
         to-indigo-800 p-8 md:p-14 mb-12"
        >
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm mb-5">
              Welcome To Product Hub
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5">
              Discover Amazing Products
            </h1>

            <p className="text-white/80 text-lg">
              Explore our premium collection of products carefully selected for
              quality and value.
            </p>
          </div>

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        </section>

        {/* Slider */}
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="rounded-3xl overflow-hidden mb-12"
        >
          {imageArr.map((img) => (
            <SwiperSlide key={img.name}>
              <div className="bg-zinc-900">
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-112.5 object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-white text-xl font-semibold mb-5">
            Browse Categories
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-5 py-2 rounded-full transition cursor-pointer ${
                selectedCategory === ""
                  ? "bg-cyan-500 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              All
            </button>

            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full capitalize transition cursor-pointer ${
                  selectedCategory === category
                    ? "bg-cyan-500 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white">Featured Products</h2>

            {/* <p className="text-zinc-400 mt-2">
              Showing {filteredData.length} products
            </p> */}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-96 bg-zinc-900 border border-zinc-700 px-5 py-3 rounded-xl
             text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredData.length > 0 ? (
            filteredData.slice(0, visibleProduct).map((product) => (
              <div
                key={product._id}
                className="group rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800
                 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300"
              >
                <Link to={`/details/${product._id}`}>
                  <div className="relative overflow-hidden h-72">
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-300 
                    mb-3 capitalize"
                    >
                      {product.category}
                    </span>

                    <h3
                      className="text-2xl font-bold text-white mb-3 line-clamp-1 group-hover:text-cyan-400 
                    transition"
                    >
                      {product.title}
                    </h3>

                    <p className="text-3xl font-bold text-emerald-400 mb-4">
                      ₹{product.price}
                    </p>

                    <p className="text-zinc-400 line-clamp-3 mb-5">
                      {product.description}
                    </p>

                    <button
                      className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white 
                    py-3 rounded-xl font-semibold cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24">
              <h2 className="text-3xl text-white mb-3">No Products Found</h2>

              <p className="text-zinc-400">
                Try another category or search keyword.
              </p>
            </div>
          )}
        </div>

        {/* Show More */}
        {filteredData.length > visibleProduct && (
          <div className="flex justify-center mt-14">
            <button
              onClick={handleShowMore}
              className="px-8 py-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white 
              font-semibold hover:scale-105 transition cursor-pointer"
            >
              Show More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
