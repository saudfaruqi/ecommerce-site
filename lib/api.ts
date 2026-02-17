import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add session ID to requests
api.interceptors.request.use((config) => {
  let sessionId = localStorage.getItem('sessionId');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  
  config.headers['X-Session-Id'] = sessionId;
  return config;
});

// Products
export const getProducts = async (params?: { category?: string; featured?: boolean; limit?: number }) => {
  const response = await api.get('/api/products', { params });
  return response.data;
};

export const getProduct = async (slug: string) => {
  const response = await api.get(`/api/products/${slug}`);
  return response.data;
};

// Cart
export const getCart = async () => {
  const response = await api.get('/api/cart');
  return response.data;
};

export const addToCart = async (productId: number, quantity: number) => {
  const response = await api.post('/api/cart', {
    product_id: productId,
    quantity,
  });
  return response.data;
};

export const updateCartItem = async (itemId: number, quantity: number) => {
  const response = await api.put(`/api/cart/${itemId}`, null, {
    params: { quantity },
  });
  return response.data;
};

export const removeFromCart = async (itemId: number) => {
  const response = await api.delete(`/api/cart/${itemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/api/cart');
  return response.data;
};

// Orders
export const createOrder = async (orderData: any) => {
  const response = await api.post('/api/orders', orderData);
  return response.data;
};

export const getOrder = async (orderId: number) => {
  const response = await api.get(`/api/orders/${orderId}`);
  return response.data;
};

// Contact
export const submitContactForm = async (data: any) => {
  const response = await api.post('/api/contact', data);
  return response.data;
};

// Payment
export const createPaymentIntent = async (amount: number) => {
  const response = await api.post('/api/payment/create-intent', {
    amount,
    currency: 'usd',
  });
  return response.data;
};

export default api;
