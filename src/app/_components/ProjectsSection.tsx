import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  image: string;
  slug: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Lắp Đặt Mái Nhựa Lấy Sáng Cho Nhà Ở Tại Tỉnh Thái Bình",
    image: "/images/projects/project-1.jpg",
    slug: "lap-dat-mai-nhua-lay-sang-thai-binh",
  },
  {
    id: 2,
    title:
      "Thi Công 1000m² Tấm Nhựa Lấy Sáng Cho Nhà Máy May Tại Tỉnh Thái Bình",
    image: "/images/projects/project-2.jpg",
    slug: "thi-cong-tam-nhua-lay-sang-nha-may-may",
  },
  {
    id: 3,
    title: "Cung Cấp 40 Tấn Tấm Nhựa K9 Thuật PP Cho Đối Tác Tại Miền Nam",
    image: "/images/projects/project-3.jpg",
    slug: "cung-cap-tam-nhua-k9-thuat-pp",
  },
  {
    id: 4,
    title:
      "Thi Công 6000m² Tôn Nhựa PVC/ASA Cho Nhà Máy Muối Đông Sun Phát Tại Tỉnh Hòa Bình",
    image: "/images/projects/project-4.jpg",
    slug: "thi-cong-ton-nhua-pvc-asa-hoa-binh",
  },
  {
    id: 5,
    title:
      "Thi Công 400m² Mái Che Sánh Chờ Và Hầm Để Xe Tại Bệnh Viện Tại Bắc Giang",
    image: "/images/projects/project-5.jpg",
    slug: "thi-cong-mai-che-benh-vien-bac-giang",
  },
  {
    id: 6,
    title:
      "Cung Cấp 2000 Tấm Pallet PP Cho Nhà Máy Gạch Không Nung Tại Thanh Hóa",
    image: "/images/projects/project-6.jpg",
    slug: "cung-cap-tam-pallet-pp-thanh-hoa",
  },
  {
    id: 7,
    title:
      "Cung Cấp 1000 Tấm Pallet PVC Cho Nhà Máy Gạch Không Nung Tại Tỉnh Thái Bình",
    image: "/images/projects/project-7.jpg",
    slug: "cung-cap-tam-pallet-pvc-thai-binh",
  },
  {
    id: 8,
    title: "Tôn Nhựa PVC/ASA Eurolines 5 Sóng Cho Nhà Máy Thép Tại Hưng Yên",
    image: "/images/projects/project-8.jpg",
    slug: "ton-nhua-pvc-asa-eurolines-hung-yen",
  },
];

export default function ProjectsSection() {
  return (
    <section className="container mx-auto px-8 py-12 my-16 bg-white rounded-2xl shadow-md">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl max-w-3xl mx-auto font-bold uppercase mb-4">
          CÔNG TRÌNH TIÊU BIỂU
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Nhiều đơn vị gửi trọn niềm tin là lời khẳng định tốt nhất cho giá trị
          mà Inox Thiên Phú mang lại
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Project Title */}
            <div className="p-4 bg-white">
              <h3 className="text-sm md:text-base font-medium text-gray-800 group-hover:text-red-600 transition-colors line-clamp-3 min-h-[4.5rem]">
                {project.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
