export interface INavLinks {
  name: string;
  path: string;
}

export interface IDashboard {
  id: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  image: {
    url: string;
  };
}
export interface IAuthState {
  isLoading: boolean;
  dashBoardData: IDashboard | null;
  isAuthenticated: boolean;
}

export interface IProducts {
  _id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  company: string;
  images: {
    url: string;
  }[];
}

export interface IProductsForm {
  title: string;
  category: string;
  price: string;
  description: string;
  company: string;
  images: File[];
}

export interface IProductsError {
  title?: string;
  category?: string;
  price?: string;
  description?: string;
  company?: string;
  images?: string;
}

export interface IProductState {
  isLoading: boolean;
  upload_message: string | null;
  productData: IProducts[];
  productDetailsData: IProducts | null;
}

export interface IRegistrationUser {
  username: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  image: File | null;
}

export interface IRegistrationError {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  city?: string;
  image?: string;
}

export interface ILoginUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginError {
  email?: string;
  password?: string;
}

export interface IUpdateProductPayload {
  productId: string;
  formData: FormData;
}

export interface ICartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
}