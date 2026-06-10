import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IProductState, IUpdateProductPayload } from "../types/type";
import axiosInstance from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

const initialState: IProductState = {
  isLoading: false,
  upload_message: null,
  productData: [],
  productDetailsData: null,
};

export const createProduct = createAsyncThunk(
  "/create-product",
  async (formData: FormData) => {
    try {
      const response = await axiosInstance.post(
        endPoints.crud.createProduct,
        formData,
      );
      return response?.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Failed to create product !!",
      );
    }
  },
);

export const getProduct = createAsyncThunk("/get-products", async () => {
  try {
    const res = await axiosInstance.get(endPoints.crud.getProduct);
    console.log(res?.data);
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to get data !!");
  }
});

export const getProductDetails = createAsyncThunk(
  "/product-details",
  async (productId: string) => {
    try {
      const res = await axiosInstance.get(
        `${endPoints.crud.productDetails}/${productId}`,
      );
      return res?.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Failed to get product details !!",
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  "/update-product",
  async ({productId, formData}: IUpdateProductPayload) => {
    try {
      const res = await axiosInstance.patch(
        `${endPoints.crud.updateProduct}/${productId}`,
        formData,
      );
      return res?.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Failed to update product !!",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "/delete-product",
  async (productId: string) => {
    try {
      const res = await axiosInstance.delete(
        `${endPoints.crud.deleteProduct}/${productId}`,
      );
      return res?.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Failed to delete product !!",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.upload_message = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.upload_message =
          action.payload?.message || "Product created successfully";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.upload_message =
          action?.error?.message || "Something went wrong!";
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.upload_message = null;
      })
      .addCase(getProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.upload_message =
          action?.payload?.message || "Data fetch successfully";
        state.productData = action?.payload?.data;
        // console.log(state.productData.forEach((product) => {
        //   console.log(product._id);
        // }));
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.upload_message = action?.error?.message || "Failed to fetch data";
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
        state.upload_message = null;
      })
      .addCase(
        getProductDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.upload_message =
            action?.payload?.message || "Data fetch successfully";
          state.productDetailsData = action?.payload?.data;
          console.log(state.productDetailsData);
        },
      )
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.upload_message = action?.error?.message || "Failed to fetch data";
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.upload_message = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.upload_message = action?.payload?.message;
        state.productData = state.productData.map((product) =>
          product?._id === action.payload.data._id
            ? action.payload.data
            : product,
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.upload_message =
          action?.error?.message || "Failed to update product !!";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.upload_message = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.upload_message = action?.payload?.message;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.upload_message =
          action?.error?.message || "Failed to update product !!";
      });
  },
});

export default productSlice;
