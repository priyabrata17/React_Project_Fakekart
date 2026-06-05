import { getProductDetails, updateProduct } from "../../Redux/productSlice";
import type { AppDispatch, RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { IProductsError, IProductsForm } from "../../types/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import LoaderButton from "../loader/loaderButton";
import { useParams } from "react-router-dom";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, productDetailsData } = useSelector(
    (state: RootState) => state.product,
  );
  const { productId } = useParams<{ productId: string }>();

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
    if (!productId) {
      toast.error("No productId found !!");
      return;
    }
    try {
      let res = await dispatch(updateProduct({ productId, formData })).unwrap();
      toast.success(res?.message || "Product updated successfully");
      setTimeout(() => navigate(`/details/${productId}`), 1000);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update product !!");
      console.error(error?.message);
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productDetailsData !== null) {
      setProduct({
        title: productDetailsData?.title || "",
        price: productDetailsData?.price || "",
        company: productDetailsData?.company || "",
        category: productDetailsData?.category || "",
        description: productDetailsData?.description || "",
        images: [],
      });
    }
  }, [productDetailsData]);

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
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-white font-semibold 
            cursor-pointer hover:scale-[1.02] active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? <LoaderButton /> : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
