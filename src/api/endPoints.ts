export const baseURL =
  "https://nodejs-miniproject-product-crud.onrender.com/api";

export const endPoints = {
  auth: {
    signup: "auth/signup",
    login: "auth/login",
    dashboard: "auth/dashboard",
    logout: "/auth/logout"
  },
  crud: {
    createProduct: "/create/product",
    getProduct: "/all-product",
    productDetails: "/product-details", //id
    updateProduct: "/update/product", //id
    deleteProduct: "/delete/product", //productId
  },
};
