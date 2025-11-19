// lib/products.mock.ts
import type { Product, ProductCardData } from "@/types/product";

// Type cho Category
export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
  parentId?: number; // ID của danh mục cha (nếu là danh mục con)
}

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "67400abc1234567890abcd01",
    slug: "ton-nhua-eurolines-pvc-asa",
    name: "Tôn Nhựa Eurolines PVC/ASA – Mái Lợp Siêu Bền, Chống Hóa Chất, Chống Ăn Mòn",
    shortDescription:
      "Tôn nhựa Eurolines PVC/ASA chống ăn mòn, cách nhiệt, cách âm, trọng lượng nhẹ, độ bền cao, thẩm mỹ cao, chống tia UV, thân thiện với môi trường.",
    priceLabel: "Liên hệ",
    images: [
      {
        url: "/images/ton-eurolines-1.jpg",
        alt: "Tôn nhựa Eurolines",
        isPrimary: true,
      },
      { url: "/images/ton-eurolines-2.jpg", alt: "Tôn nhựa Eurolines 2" },
    ],
    detailSections: [
      {
        key: "features",
        title: "Tính năng",
        type: "inline",
        content:
          "Chống ăn mòn, cách nhiệt, cách âm, trọng lượng nhẹ, độ bền cao, tính thẩm mỹ cao, chống tia UV, thân thiện với môi trường.",
      },
      {
        key: "technical_specs",
        title: "Thông số kỹ thuật",
        type: "list",
        items: [
          {
            label: "Chất liệu",
            content:
              "Được sản xuất từ vật liệu nhựa PVC và ASA cao cấp, được nhập khẩu từ nước ngoài",
          },
          {
            label: "Số sóng",
            content: "5, 6, 7, 11 sóng",
            color: "green",
          },
          {
            label: "Khổ rộng",
            content:
              "1.08m – Hữu dụng 1.0m (Tôn 5, 6, 11 sóng); 1.29m – Hữu dụng 1.2m (Tôn 7 sóng)",
            color: "red",
          },
          {
            label: "Độ dày",
            content: "2.5mm, 3.0mm, 3.5mm",
            color: "red",
          },
          {
            label: "Chiều dài",
            content: "Theo yêu cầu dự án",
          },
        ],
      },
      {
        key: "installation",
        title: "Yêu cầu kỹ thuật",
        type: "list",
        items: [
          {
            label: "Khoảng cách xà gồ",
            content: "500mm – 1000mm (Tùy thuộc vào độ dày Tôn nhựa)",
          },
          {
            label: "Chồng mí dọc",
            content: "250mm (Tấm trên 150mm, tấm dưới 100mm)",
          },
          {
            label: "Chồng mí ngang",
            content: "1 sóng (8 – 9cm)",
          },
          {
            label: "Độ dài vít tiêu chuẩn",
            content: "5 – 7cm (Tùy thuộc vào độ dày Tôn nhựa)",
            color: "blue",
          },
          {
            label: "Số lượng vít tiêu chuẩn",
            content: "4 – 5 chiếc/m²",
            color: "green",
          },
          {
            label: "Phần mái tiêu chuẩn chờm ra (Khi không có mái)",
            content: "Tối thiểu 5 – 7cm",
          },
        ],
      },
      {
        key: "applications",
        title: "Ứng dụng",
        type: "paragraph",
        content:
          "Nhà máy sản xuất hóa chất, sản xuất phân bón, gạch men, nhà máy chế biến cao su, nhà máy chè, luyện thép,…",
      },
    ],
    seo: {
      metaTitle:
        "Tôn Nhựa Eurolines PVC/ASA – Chống ăn mòn, cách nhiệt, cách âm",
      metaDescription:
        "Tôn nhựa Eurolines PVC/ASA siêu bền, chống ăn mòn, cách nhiệt, cách âm, trọng lượng nhẹ, thẩm mỹ cao, chống tia UV và thân thiện với môi trường.",
      canonical: "https://nhietphatloc.com/ton-nhua-eurolines-pvc-asa",
      ogImage: "/images/ton-eurolines-1.jpg",
    },
    createdAt: "2025-11-13T00:00:00.000Z",
    updatedAt: "2025-11-13T00:00:00.000Z",
  },

  // Bạn có thể thêm nhiều product khác ở đây
];

// Dữ liệu cho ProductCard (danh sách sản phẩm)
export const FEATURED_PRODUCTS: ProductCardData[] = [
  {
    id: 1,
    name: "Tôn Nhựa Eurolines PVC/ASA 5 Sóng (Độ dày 2.5mm)",
    image: "/images/ton-eurolines-1.jpg",
    price: 85000,
    originalPrice: 120000,
    installmentPrice: 25500,
    discount: 29,
    categoryId: 3, // Tôn Nhựa PVC/ASA
    tags: [
      { label: "Trả góp 0%", type: "installment" },
      { label: "Giảm giá sốc", type: "discount" },
    ],
    status: "Hot",
  },
  {
    id: 2,
    name: "Tôn Nhựa Eurolines PVC/ASA 6 Sóng (Độ dày 3.0mm)",
    image: "/images/ton-eurolines-2.jpg",
    price: 95000,
    originalPrice: 135000,
    installmentPrice: 28500,
    discount: 30,
    categoryId: 3, // Tôn Nhựa PVC/ASA
    tags: [{ label: "Trả góp 0%", type: "installment" }],
  },
  {
    id: 3,
    name: "Tôn Nhựa Eurolines PVC/ASA 7 Sóng (Độ dày 3.5mm)",
    image: "/images/ton-eurolines-1.jpg",
    price: 105000,
    originalPrice: 150000,
    installmentPrice: 31500,
    discount: 30,
    categoryId: 3, // Tôn Nhựa PVC/ASA
    tags: [{ label: "Trả góp 0%", type: "installment" }],
  },
  {
    id: 4,
    name: "Tôn Nhựa Eurolines PVC/ASA 11 Sóng (Độ dày 3.0mm)",
    image: "/images/ton-eurolines-2.jpg",
    price: 92000,
    originalPrice: 125000,
    installmentPrice: 27600,
    discount: 26,
    categoryId: 3, // Tôn Nhựa PVC/ASA
    tags: [{ label: "Trả góp 0%", type: "installment" }],
  },
  {
    id: 5,
    name: "Tấm Nhựa PVC Trong Suốt Lấy Sáng",
    image: "/images/ton-eurolines-1.jpg",
    price: 75000,
    originalPrice: 95000,
    installmentPrice: 22500,
    discount: 21,
    categoryId: 1, // Tấm nhựa kỹ thuật PVC
    tags: [{ label: "Trả góp 0%", type: "installment" }],
  },
  {
    id: 6,
    name: "Tấm Lợp Lấy Sáng PC Polycarbonate",
    image: "/images/ton-eurolines-2.jpg",
    price: 125000,
    originalPrice: 165000,
    installmentPrice: 37500,
    discount: 24,
    categoryId: 5, // Tấm Lợp Lấy Sáng PC
    tags: [{ label: "Trả góp 0%", type: "installment" }],
  },
  {
    id: 7,
    name: "Tấm Nhựa PP Danpla Chống Tĩnh Điện",
    image: "/images/ton-eurolines-1.jpg",
    price: 65000,
    originalPrice: 85000,
    installmentPrice: 19500,
    discount: 24,
    categoryId: 2, // Tấm nhựa kỹ thuật PP
    tags: [{ label: "Trả góp 0%", type: "installment" }],
  },
  {
    id: 8,
    name: "Tấm Nhựa PE Chống Thấm Nước",
    image: "/images/ton-eurolines-2.jpg",
    price: 55000,
    originalPrice: 72000,
    installmentPrice: 16500,
    discount: 24,
    categoryId: 2, // Tấm nhựa kỹ thuật PP (PE tương tự)
    tags: [{ label: "Trả góp 0%", type: "installment" }],
  },
  {
    id: 9,
    name: "Tấm Ốp Tường PVC Vân Gỗ Cao Cấp",
    image: "/images/ton-eurolines-1.jpg",
    price: 85000,
    originalPrice: 110000,
    installmentPrice: 25500,
    discount: 23,
    categoryId: 10, // Tấm PVC Vân Gỗ Phát Lộc
    tags: [{ label: "Trả góp 0%", type: "installment" }],
  },
  {
    id: 10,
    name: "Ngói Nhựa PVC Màu Xanh Ngọc Bích",
    image: "/images/ton-eurolines-2.jpg",
    price: 95000,
    originalPrice: 120000,
    installmentPrice: 28500,
    discount: 21,
    categoryId: 4, // Ngói nhựa PVC/ASA
    tags: [{ label: "Trả góp 0%", type: "installment" }],
  },
];

// Dữ liệu danh mục sản phẩm
export const CATEGORIES: Category[] = [
  // Danh mục cha: Tấm nhựa kỹ thuật
  {
    id: 100,
    name: "Tấm nhựa kỹ thuật",
    image: "/images/categories/tam-nhua-ky-thuat-pvc.jpg",
    slug: "tam-nhua-ky-thuat",
  },
  {
    id: 1,
    name: "Tấm nhựa kỹ thuật PVC",
    image: "/images/categories/tam-nhua-ky-thuat-pvc.jpg",
    slug: "tam-nhua-ky-thuat-pvc",
    parentId: 100,
  },
  {
    id: 2,
    name: "Tấm nhựa kỹ thuật PP",
    image: "/images/categories/tam-nhua-ky-thuat-pp.jpg",
    slug: "tam-nhua-ky-thuat-pp",
    parentId: 100,
  },

  // Danh mục cha: Tôn & Ngói nhựa
  {
    id: 101,
    name: "Tôn & Ngói nhựa",
    image: "/images/categories/ton-nhua-pvc-asa.jpg",
    slug: "ton-ngoi-nhua",
  },
  {
    id: 3,
    name: "Tôn Nhựa PVC/ASA",
    image: "/images/categories/ton-nhua-pvc-asa.jpg",
    slug: "ton-nhua-pvc-asa",
    parentId: 101,
  },
  {
    id: 4,
    name: "Ngói nhựa PVC/ASA",
    image: "/images/categories/ngoi-nhua-pvc-asa.jpg",
    slug: "ngoi-nhua-pvc-asa",
    parentId: 101,
  },

  // Danh mục đơn lẻ (không có con)
  {
    id: 5,
    name: "Tấm Lợp Lấy Sáng PC",
    image: "/images/categories/tam-lop-lay-sang-pc.jpg",
    slug: "tam-lop-lay-sang-pc",
  },
  {
    id: 6,
    name: "Pallet Gạch không nung",
    image: "/images/categories/pallet-gach-khong-nung.jpg",
    slug: "pallet-gach-khong-nung",
  },
  {
    id: 7,
    name: "Thảm sàn vân cao su PVC",
    image: "/images/categories/tham-san-van-cao-su-pvc.jpg",
    slug: "tham-san-van-cao-su-pvc",
  },
  {
    id: 8,
    name: "Giấy bạc phủ tôn xốp PU",
    image: "/images/categories/giay-bac-phu-ton-xop-pu.jpg",
    slug: "giay-bac-phu-ton-xop-pu",
  },

  // Danh mục cha: Tấm PVC Phát Lộc
  {
    id: 102,
    name: "Tấm PVC Phát Lộc",
    image: "/images/categories/tam-pvc-van-da-phat-loc.jpg",
    slug: "tam-pvc-phat-loc",
  },
  {
    id: 9,
    name: "Tấm PVC Vân Đá Phát Lộc",
    image: "/images/categories/tam-pvc-van-da-phat-loc.jpg",
    slug: "tam-pvc-van-da-phat-loc",
    parentId: 102,
  },
  {
    id: 10,
    name: "Tấm PVC Vân Gỗ Phát Lộc",
    image: "/images/categories/tam-pvc-van-go-phat-loc.jpg",
    slug: "tam-pvc-van-go-phat-loc",
    parentId: 102,
  },
];
