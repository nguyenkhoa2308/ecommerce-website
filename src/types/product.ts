// types/product.ts
export type DetailSectionType = "inline" | "paragraph" | "list";
export type DetailSectionItemColor = "default" | "red" | "green" | "blue";

export interface DetailSectionListItem {
  label: string; // phần in đậm
  content: string; // phần nội dung
  color?: DetailSectionItemColor; // màu của content
}

interface DetailSectionBase {
  key: string;
  title: string;
  type: DetailSectionType;
}

export interface DetailSectionInline extends DetailSectionBase {
  type: "inline" | "paragraph";
  content: string;
}

export interface DetailSectionList extends DetailSectionBase {
  type: "list";
  items: DetailSectionListItem[];
}

export type DetailSection = DetailSectionInline | DetailSectionList;

export interface ProductImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface ProductSeo {
  metaTitle: string;
  metaDescription: string;
  canonical?: string;
  ogImage?: string;
}

export interface Product {
  _id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  priceLabel?: string;
  images: ProductImage[];
  detailSections: DetailSection[];
  seo?: ProductSeo;
  createdAt?: string;
  updatedAt?: string;
}

// Type cho ProductCard (danh sách sản phẩm)
export interface ProductCardData {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  installmentPrice: number;
  discount: number;
  categoryId?: number; // ID của danh mục
  tags?: {
    label: string;
    type: "hot" | "installment" | "discount";
  }[];
  status?: string;
}
