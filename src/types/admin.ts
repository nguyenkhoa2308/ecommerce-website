// Admin types
export interface Admin {
  _id: string;
  username: string;
  email: string;
  password: string; // hashed
  role: 'super_admin' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Category types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string; // for nested categories
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Product Attribute types
export interface AttributeValue {
  value: string;
  label: string;
}

export interface ProductAttribute {
  _id: string;
  name: string;
  slug: string;
  type: 'select' | 'color' | 'text' | 'number';
  values?: AttributeValue[]; // for select and color types
  isRequired: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  attributes?: Record<string, string>;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId?: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'bank_transfer' | 'credit_card';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: ShippingAddress;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Review types
export interface Review {
  _id: string;
  productId: string;
  productName: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  adminReply?: string;
  createdAt: string;
  updatedAt: string;
}

// Banner types
export interface Banner {
  _id: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  linkUrl?: string;
  linkText?: string;
  position: 'home_hero' | 'home_middle' | 'category_top' | 'product_sidebar';
  order: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
