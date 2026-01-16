import axios from "axios";
import { auth } from "../firebase/firebase.config";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const getProducts = (category) => {
  const params = category ? { category } : {};
  return api.get("/products", { params });
};

export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Categories
export const getCategories = () => api.get("/categories");
export const createCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Orders
export const getUserOrders = () => api.get("/orders/my-orders");
export const getAllOrders = () => api.get("/orders");
export const createOrder = (data) => api.post("/orders", data);
export const updateOrderStatus = (id, status) =>
  api.patch(`/orders/${id}/status`, { status });

// User
export const getCurrentUser = () => api.get("/user/me");
