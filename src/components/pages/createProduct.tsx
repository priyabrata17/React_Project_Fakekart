import { createProduct } from "../../Redux/productSlice";
import type { AppDispatch, RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { IProductsError, IProductsForm } from "../../types/types";
import React, { useState } from "react";
import { toast } from "sonner";
import LoaderButton from "../loader/loaderButton";

export default function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.product);

  const [product, setProduct] = useState<IProductsForm>({
    title: "",
    price: "",
    description: "",
    category: "",
    company: "",
    images: [],
  });

  const [error, setError] = useState<IProductsError>({});

  const validate = (): IProductsError => {
    const errors: IProductsError = {};
    if (!product.title) errors.title = "Product title is required";
    if (!product.price) errors.price = "Price is required";
    if (!product.description) errors.description = "Description is required";
    if (!product.company) errors.company = "Company name is required";
    if (!product.category) errors.category = "Category is required";
    if (!product.images?.length) errors.images = "Image file is required";
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "title") {
      if (value.trim() === "") {
        setProduct({ ...product, title: "" });
        setError({ ...error, title: "title field cannot be empty !!" });
      } else {
        setProduct({ ...product, title: value });
        setError({ ...error, title: "" });
      }
    }
    if (name === "price") {
      if (value.trim() === "") {
        setProduct({ ...product, price: "" });
        setError({ ...error, price: "price field cannot be empty !!" });
      } else {
        setProduct({ ...product, price: value });
        setError({ ...error, price: "" });
      }
    }
    if (name === "company") {
      if (value.trim() === "") {
        setProduct({ ...product, company: "" });
        setError({ ...error, company: "company field cannot be empty !!" });
      } else {
        setProduct({ ...product, company: value });
        setError({ ...error, company: "" });
      }
    }
    if (name === "description") {
      if (value.trim() === "") {
        setProduct({ ...product, description: "" });
        setError({
          ...error,
          description: "description field cannot be empty !!",
        });
      } else {
        setProduct({ ...product, description: value });
        setError({ ...error, description: "" });
      }
    }
    if (name === "category") {
      if (value.trim() === "") {
        setProduct({ ...product, category: "" });
        setError({ ...error, category: "category field cannot be empty !!" });
      } else {
        setProduct({ ...product, category: value });
        setError({ ...error, category: "" });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e?.target?.files || []);
    if (files?.length === 0) {
      setProduct({ ...product, images: [] });
      setError({ ...error, images: "Image file is required" });
    } else {
      setProduct({ ...product, images: files });
      setError({ ...error, images: "" });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors = validate();
    setError(errors);
    if (Object.keys(errors).length > 0) return;
    let formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("company", product.company);
    formData.append("description", product.description);
    product.images.forEach((image) => formData.append("images", image));
    try {
      let res = await dispatch(createProduct(formData)).unwrap();
      toast.success(res?.message || "Product created successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (error: any) {
      toast.error(error?.message || "Failed to create product !!");
      console.error(error?.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Create Product
          </h1>

          <p className="text-zinc-400">
            Add a new product to your FakeKart inventory
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl 
              outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.title}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-zinc-300 font-medium mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl 
                outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
              />

              <span className="text-red-400 text-sm mt-1 block">
                {error?.price}
              </span>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl 
                outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
              />

              <span className="text-red-400 text-sm mt-1 block">
                {error?.category}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={product.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none
               focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.company}
            </span>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              placeholder="Write product description..."
              className="w-full resize-none bg-zinc-800 border border-zinc-700 text-white px-4 py-3 
              rounded-xl outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.description}
            </span>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-2">
              Product Images
            </label>

            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-3 rounded-xl cursor-pointer 
              file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-white
               hover:file:bg-cyan-600"
            />

            <span className="text-red-400 text-sm mt-1 block">
              {error?.images}
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-white font-semibold 
            cursor-pointer hover:scale-[1.02] active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? <LoaderButton /> : "Create Product"}
          </button>
        </form>
      </div>
    </div>
    // <>
    //   <div className="max-w-2xl w-full mx-auto p-4 shadow-lg my-8 rounded-sm">
    //     <h2 className="text-2xl font bold my-4 text-center">
    //       Create A New Product
    //     </h2>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <div>
    //         <label className="block mb-1 font-semibold">Title</label>
    //         <input
    //           type="text"
    //           name="title"
    //           value={product.title}
    //           onChange={handleChange}
    //           className="w-full border p-2 rounded"
    //         />
    //         <span className="text-red-500 text-sm">{error?.title}</span>
    //       </div>
    //       <div>
    //         <label className="block mb-1 font-semibold">Price</label>
    //         <input
    //           type="number"
    //           name="price"
    //           value={product.price}
    //           onChange={handleChange}
    //           className="w-full border p-2 rounded"
    //         />
    //         <span className="text-red-500 text-sm">{error?.price}</span>
    //       </div>
    //       <div>
    //         <label className="block mb-1 font-semibold">Category</label>
    //         <input
    //           type="text"
    //           name="category"
    //           value={product.category}
    //           onChange={handleChange}
    //           className="w-full border p-2 rounded"
    //         />
    //         <span className="text-red-500 text-sm">{error?.category}</span>
    //       </div>
    //       <div>
    //         <label className="block mb-1 font-semibold">Company</label>
    //         <input
    //           type="text"
    //           name="company"
    //           value={product.company}
    //           onChange={handleChange}
    //           className="w-full border p-2 rounded"
    //         />
    //         <span className="text-red-500 text-sm">{error?.company}</span>
    //       </div>
    //       <div>
    //         <label className="block mb-1 font-semibold">Description</label>
    //         <input
    //           type="text"
    //           name="description"
    //           value={product.description}
    //           onChange={handleChange}
    //           className="w-full border p-2 rounded"
    //         />
    //         <span className="text-red-500 text-sm">{error?.description}</span>
    //       </div>
    //       <div>
    //         <label className="block mb-1 font-semibold">Image</label>
    //         <input
    //           type="file"
    //           name="images"
    //           multiple
    //           onChange={handleImageChange}
    //           accept="image/*"
    //           className="w-full border p-2 rounded"
    //         />
    //         <span className="text-red-500 text-sm">{error?.images}</span>
    //       </div>

    //       <div className="mt-6">
    //         <button
    //           type="submit"
    //           disabled={isLoading}
    //           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer
    //             transition disabled:opacity-60 disabled:cursor-not-allowed"
    //         >
    //           {isLoading ? <Loader /> : "Create Product"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </>
  );
}
