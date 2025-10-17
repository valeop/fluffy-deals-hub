export interface User {
  email: string;
  password: string;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  category: string;
  discount: number;
  startDate: string;
  endDate: string;
  image: string;
  isActive: boolean;
  selectedProducts: string[];
}

export interface AuthUser {
  email: string;
  isAuthenticated: boolean;
}