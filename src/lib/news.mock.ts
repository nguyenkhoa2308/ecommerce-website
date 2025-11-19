// lib/news.mock.ts

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: "Tin tức" | "Kiến thức" | "Khuyến mãi" | "Dự án";
  author: string;
  publishedAt: string;
  views: number;
  tags: string[];
  featured: boolean;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    slug: "ton-nhua-eurolines-giai-phap-mai-ben-cho-nha-xuong",
    title: "Tôn Nhựa Eurolines - Giải Pháp Mái Bền Cho Nhà Xưởng Công Nghiệp",
    excerpt:
      "Tôn nhựa Eurolines PVC/ASA đang trở thành lựa chọn hàng đầu cho các nhà xưởng công nghiệp nhờ khả năng chống ăn mòn vượt trội và độ bền cao.",
    content: `
      <h2>Vì sao nên chọn Tôn Nhựa Eurolines cho nhà xưởng?</h2>
      <p>Tôn nhựa Eurolines PVC/ASA là sản phẩm được sản xuất từ nguyên liệu nhựa cao cấp nhập khẩu từ Đức và Mỹ, mang đến những ưu điểm vượt trội:</p>

      <h3>1. Chống ăn mòn tuyệt đối</h3>
      <p>Khác với tôn kim loại truyền thống, tôn nhựa Eurolines không bị oxy hóa, không bị gỉ sét khi tiếp xúc với môi trường hóa chất khắc nghiệt. Đây là lý do sản phẩm được ưa chuộng tại các nhà máy sản xuất hóa chất, phân bón, cao su...</p>

      <h3>2. Cách nhiệt hiệu quả</h3>
      <p>Với cấu trúc nhiều lớp đặc biệt, tôn nhựa Eurolines giúp giảm nhiệt độ bên trong nhà xưởng từ 5-7°C so với tôn kim loại, giúp tiết kiệm chi phí điện làm mát đáng kể.</p>

      <h3>3. Trọng lượng nhẹ, dễ thi công</h3>
      <p>Trọng lượng chỉ bằng 1/3 tôn kim loại, giúp giảm tải trọng cho kết cấu công trình và tiết kiệm chi phí vận chuyển, lắp đặt.</p>

      <h3>4. Tuổi thọ cao</h3>
      <p>Với công nghệ ASA chống tia UV tiên tiến, tôn nhựa Eurolines có tuổi thọ lên đến 25-30 năm, không bị phai màu, giòn vỡ theo thời gian.</p>

      <h2>Ứng dụng phổ biến</h2>
      <ul>
        <li>Nhà máy sản xuất hóa chất, phân bón</li>
        <li>Nhà máy chế biến thực phẩm</li>
        <li>Nhà máy dệt nhuộm, cao su</li>
        <li>Chuồng trại chăn nuôi quy mô lớn</li>
        <li>Kho bãi, nhà kho logistics</li>
      </ul>

      <h2>Kết luận</h2>
      <p>Tôn nhựa Eurolines không chỉ là sản phẩm thay thế tôn kim loại mà còn là giải pháp vượt trội về độ bền, khả năng chống ăn mòn và hiệu quả kinh tế. Liên hệ với Nhiệt Phát Lộc để được tư vấn chi tiết về sản phẩm phù hợp với công trình của bạn.</p>
    `,
    image: "/images/ton-eurolines-1.jpg",
    category: "Kiến thức",
    author: "Nguyễn Văn A",
    publishedAt: "2025-01-15",
    views: 1250,
    tags: ["Tôn nhựa", "Eurolines", "Nhà xưởng", "Công nghiệp"],
    featured: true,
  },
  {
    id: 2,
    slug: "khuyen-mai-dac-biet-thang-1-giam-30",
    title: "Khuyến Mãi Đặc Biệt Tháng 1 - Giảm Giá Đến 30% Toàn Bộ Sản Phẩm",
    excerpt:
      "Chào mừng năm mới 2025, Nhiệt Phát Lộc triển khai chương trình khuyến mãi lớn nhất trong năm với mức giảm giá lên đến 30% cho tất cả sản phẩm.",
    content: `
      <h2>Chương trình khuyến mãi đặc biệt</h2>
      <p>Nhân dịp đầu năm mới 2025, Công ty Vật Liệu Nhiệt Phát Lộc triển khai chương trình khuyến mãi với quy mô lớn nhất trong năm:</p>

      <h3>Ưu đãi áp dụng</h3>
      <ul>
        <li><strong>Giảm giá 30%</strong> cho tất cả dòng tôn nhựa Eurolines</li>
        <li><strong>Giảm giá 25%</strong> cho tấm lợp lấy sáng PC Polycarbonate</li>
        <li><strong>Giảm giá 20%</strong> cho tấm nhựa PVC, PP, PE</li>
        <li><strong>Tặng kèm phụ kiện</strong> lắp đặt trị giá 500.000đ cho đơn hàng từ 10 triệu</li>
        <li><strong>Miễn phí vận chuyển</strong> cho đơn hàng từ 20 triệu trong nội thành TP.HCM</li>
      </ul>

      <h3>Thời gian áp dụng</h3>
      <p>Từ ngày 01/01/2025 đến hết ngày 31/01/2025</p>

      <h3>Điều kiện tham gia</h3>
      <ul>
        <li>Áp dụng cho tất cả khách hàng cá nhân và doanh nghiệp</li>
        <li>Không áp dụng đồng thời với các chương trình khuyến mãi khác</li>
        <li>Số lượng có hạn, áp dụng theo nguyên tắc đặt hàng trước được ưu tiên</li>
      </ul>

      <h3>Cách thức đặt hàng</h3>
      <p>Quý khách vui lòng liên hệ:</p>
      <ul>
        <li>Hotline: 0799.88.66.66</li>
        <li>Email: sales@nhietphatloc.com</li>
        <li>Hoặc đặt hàng trực tiếp trên website</li>
      </ul>

      <p><em>*Lưu ý: Chương trình có thể kết thúc sớm khi hết số lượng sản phẩm khuyến mãi.</em></p>
    `,
    image: "/images/banner1.webp",
    category: "Khuyến mãi",
    author: "Phòng Marketing",
    publishedAt: "2025-01-01",
    views: 3420,
    tags: ["Khuyến mãi", "Giảm giá", "Sale"],
    featured: true,
  },
  {
    id: 3,
    slug: "tam-lop-lay-sang-pc-la-gi-uu-nhuoc-diem",
    title: "Tấm Lợp Lấy Sáng PC Là Gì? Ưu Và Nhược Điểm Cần Biết",
    excerpt:
      "Tìm hiểu chi tiết về tấm lợp lấy sáng PC Polycarbonate, ưu nhược điểm, cách lựa chọn và ứng dụng trong xây dựng hiện đại.",
    content: `
      <h2>Tấm lợp lấy sáng PC là gì?</h2>
      <p>Tấm lợp lấy sáng PC (Polycarbonate) là loại vật liệu xây dựng được làm từ nhựa polycarbonate, có khả năng truyền ánh sáng tự nhiên vào không gian bên trong công trình.</p>

      <h2>Ưu điểm vượt trội</h2>

      <h3>1. Khả năng truyền sáng cao</h3>
      <p>Tấm PC trong suốt có thể truyền qua 85-90% ánh sáng tự nhiên, giúp tiết kiệm điện năng chiếu sáng ban ngày.</p>

      <h3>2. Chống va đập cực tốt</h3>
      <p>Độ bền va đập cao gấp 200 lần so với kính thường, an toàn tuyệt đối trong mọi điều kiện thời tiết.</p>

      <h3>3. Cách nhiệt hiệu quả</h3>
      <p>Cấu trúc rỗng ruột ong giúp cách nhiệt tốt, giảm nhiệt độ bên trong lên đến 7-10°C.</p>

      <h3>4. Chống tia UV</h3>
      <p>Lớp phủ chống UV bảo vệ không gian bên trong khỏi tác hại của tia cực tím, tuổi thọ lên đến 10-15 năm.</p>

      <h3>5. Trọng lượng nhẹ</h3>
      <p>Chỉ bằng 1/15 trọng lượng kính, dễ dàng vận chuyển và lắp đặt.</p>

      <h2>Nhược điểm cần lưu ý</h2>

      <h3>1. Giá thành cao hơn</h3>
      <p>So với các loại tấm lợp thông thường, giá tấm PC cao hơn khoảng 30-50%.</p>

      <h3>2. Dễ bị trầy xước</h3>
      <p>Bề mặt tấm PC có thể bị trầy xước nếu không được bảo vệ cẩn thận trong quá trình vận chuyển và lắp đặt.</p>

      <h3>3. Cần bảo dưỡng định kỳ</h3>
      <p>Nên vệ sinh định kỳ 6 tháng/lần để duy trì độ trong suốt và tuổi thọ.</p>

      <h2>Ứng dụng phổ biến</h2>
      <ul>
        <li>Mái che sân thượng, ban công</li>
        <li>Giếng trời, mái vòm</li>
        <li>Nhà kính trồng rau sạch</li>
        <li>Mái hiên cửa hàng, showroom</li>
        <li>Mái nhà để xe, carport</li>
      </ul>

      <h2>Kết luận</h2>
      <p>Tấm lợp lấy sáng PC là lựa chọn tuyệt vời cho những ai muốn tận dụng ánh sáng tự nhiên, tiết kiệm năng lượng và đảm bảo tính thẩm mỹ cho công trình. Hãy liên hệ với Nhiệt Phát Lộc để được tư vấn chi tiết về sản phẩm phù hợp nhất.</p>
    `,
    image: "/images/ton-eurolines-2.jpg",
    category: "Kiến thức",
    author: "Trần Thị B",
    publishedAt: "2025-01-10",
    views: 890,
    tags: ["Tấm PC", "Lấy sáng", "Polycarbonate"],
    featured: false,
  },
  {
    id: 4,
    slug: "du-an-nha-xuong-cong-ty-abc-tai-binh-duong",
    title: "Dự Án Nhà Xưởng Công Ty ABC Tại Bình Dương - 5000m² Tôn Eurolines",
    excerpt:
      "Nhiệt Phát Lộc tự hào là đơn vị cung cấp và thi công 5000m² tôn nhựa Eurolines cho nhà xưởng Công ty ABC tại KCN Bình Dương.",
    content: `
      <h2>Thông tin dự án</h2>
      <ul>
        <li><strong>Tên dự án:</strong> Nhà xưởng sản xuất Công ty ABC</li>
        <li><strong>Địa điểm:</strong> KCN Việt Nam Singapore, Bình Dương</li>
        <li><strong>Diện tích:</strong> 5000m²</li>
        <li><strong>Sản phẩm sử dụng:</strong> Tôn nhựa Eurolines PVC/ASA 7 sóng, độ dày 3.0mm</li>
        <li><strong>Thời gian thi công:</strong> 15 ngày</li>
        <li><strong>Năm hoàn thành:</strong> 2024</li>
      </ul>

      <h2>Lý do khách hàng chọn Eurolines</h2>

      <h3>1. Môi trường sản xuất hóa chất</h3>
      <p>Công ty ABC chuyên sản xuất hóa chất công nghiệp, môi trường có nhiều khí ăn mòn. Tôn kim loại thông thường chỉ có tuổi thọ 3-5 năm trong điều kiện này, trong khi tôn nhựa Eurolines có thể tồn tại 25-30 năm.</p>

      <h3>2. Yêu cầu cách nhiệt cao</h3>
      <p>Nhà xưởng có diện tích lớn, nằm ở khu vực nắng nóng. Tôn nhựa Eurolines giúp giảm nhiệt độ bên trong 5-7°C, tiết kiệm đáng kể chi phí điện làm mát.</p>

      <h3>3. Tính thẩm mỹ</h3>
      <p>Màu xanh ngọc đặc trưng của Eurolines giúp công trình nổi bật, khẳng định hình ảnh thương hiệu hiện đại của doanh nghiệp.</p>

      <h2>Quy trình thi công</h2>

      <h3>Giai đoạn 1: Khảo sát và tư vấn (2 ngày)</h3>
      <p>Đội ngũ kỹ thuật của Nhiệt Phát Lộc đã tiến hành khảo sát hiện trường, đo đạc chi tiết và tư vấn giải pháp tối ưu cho công trình.</p>

      <h3>Giai đoạn 2: Gia công sản phẩm (5 ngày)</h3>
      <p>Tôn được gia công chính xác theo bản vẽ kỹ thuật, đảm bảo độ chính xác cao, giảm thiểu phế liệu.</p>

      <h3>Giai đoạn 3: Vận chuyển và lắp đặt (8 ngày)</h3>
      <p>15 công nhân có tay nghề cao đã tiến hành lắp đặt với tiến độ 600m²/ngày, hoàn thành đúng cam kết.</p>

      <h2>Kết quả</h2>
      <p>Sau 1 năm sử dụng, công trình vẫn giữ nguyên màu sắc, không có hiện tượng phai màu hay giòn vỡ. Khách hàng hài lòng với chất lượng sản phẩm và dịch vụ của Nhiệt Phát Lộc.</p>

      <blockquote>
        <p>"Chúng tôi rất hài lòng với chất lượng tôn nhựa Eurolines. So với nhà xưởng cũ dùng tôn kim loại, nhà xưởng mới mát hơn rất nhiều và chi phí bảo trì giảm đáng kể."</p>
        <footer>- Ông Nguyễn Văn C, Giám đốc Công ty ABC</footer>
      </blockquote>
    `,
    image: "/images/banner2.webp",
    category: "Dự án",
    author: "Phòng Kỹ Thuật",
    publishedAt: "2024-12-20",
    views: 560,
    tags: ["Dự án", "Nhà xưởng", "Bình Dương", "Eurolines"],
    featured: false,
  },
  {
    id: 5,
    slug: "so-sanh-ton-nhua-va-ton-kim-loai",
    title: "So Sánh Tôn Nhựa Và Tôn Kim Loại - Nên Chọn Loại Nào?",
    excerpt:
      "Phân tích chi tiết ưu nhược điểm của tôn nhựa và tôn kim loại để giúp bạn đưa ra quyết định đúng đắn cho công trình của mình.",
    content: `
      <h2>Giới thiệu</h2>
      <p>Tôn lợp là một trong những vật liệu quan trọng nhất trong xây dựng. Việc lựa chọn giữa tôn nhựa và tôn kim loại phụ thuộc vào nhiều yếu tố như mục đích sử dụng, ngân sách, môi trường công trình...</p>

      <h2>So sánh chi tiết</h2>

      <h3>1. Khả năng chống ăn mòn</h3>
      <p><strong>Tôn nhựa:</strong> ⭐⭐⭐⭐⭐ - Không bị gỉ sét, chống ăn mòn tuyệt đối</p>
      <p><strong>Tôn kim loại:</strong> ⭐⭐ - Dễ bị gỉ sét, đặc biệt ở môi trường ẩm ướt hoặc có hóa chất</p>

      <h3>2. Khả năng cách nhiệt</h3>
      <p><strong>Tôn nhựa:</strong> ⭐⭐⭐⭐ - Cách nhiệt tốt, giảm nhiệt độ 5-7°C</p>
      <p><strong>Tôn kim loại:</strong> ⭐⭐ - Dẫn nhiệt cao, không gian bên trong rất nóng</p>

      <h3>3. Độ bền, tuổi thọ</h3>
      <p><strong>Tôn nhựa:</strong> ⭐⭐⭐⭐⭐ - 25-30 năm trong môi trường khắc nghiệt</p>
      <p><strong>Tôn kim loại:</strong> ⭐⭐⭐ - 10-15 năm, ngắn hơn ở môi trường ăn mòn</p>

      <h3>4. Trọng lượng</h3>
      <p><strong>Tôn nhựa:</strong> ⭐⭐⭐⭐⭐ - Rất nhẹ, dễ vận chuyển và lắp đặt</p>
      <p><strong>Tôn kim loại:</strong> ⭐⭐ - Nặng, cần kết cấu chịu lực tốt</p>

      <h3>5. Giá thành</h3>
      <p><strong>Tôn nhựa:</strong> ⭐⭐⭐ - Cao hơn 20-30% so với tôn kim loại</p>
      <p><strong>Tôn kim loại:</strong> ⭐⭐⭐⭐ - Giá rẻ hơn ban đầu</p>

      <h3>6. Chi phí bảo trì</h3>
      <p><strong>Tôn nhựa:</strong> ⭐⭐⭐⭐⭐ - Gần như không cần bảo trì</p>
      <p><strong>Tôn kim loại:</strong> ⭐⭐ - Cần sơn chống gỉ định kỳ</p>

      <h2>Kết luận và khuyến nghị</h2>

      <h3>Nên chọn tôn nhựa khi:</h3>
      <ul>
        <li>Công trình ở môi trường ẩm ướt, có hóa chất</li>
        <li>Cần cách nhiệt tốt</li>
        <li>Muốn giảm chi phí bảo trì lâu dài</li>
        <li>Kết cấu công trình không chịu tải trọng lớn</li>
      </ul>

      <h3>Nên chọn tôn kim loại khi:</h3>
      <ul>
        <li>Ngân sách ban đầu hạn chế</li>
        <li>Công trình tạm thời (dưới 5 năm)</li>
        <li>Môi trường khô ráo, không có hóa chất</li>
        <li>Cần độ cứng vững cao</li>
      </ul>

      <p>Hãy liên hệ với Nhiệt Phát Lộc để được tư vấn chi tiết về loại tôn phù hợp nhất cho công trình của bạn!</p>
    `,
    image: "/images/ton-eurolines-1.jpg",
    category: "Kiến thức",
    author: "Nguyễn Văn D",
    publishedAt: "2025-01-08",
    views: 1120,
    tags: ["So sánh", "Tôn nhựa", "Tôn kim loại"],
    featured: false,
  },
  {
    id: 6,
    slug: "huong-dan-lap-dat-ton-nhua-dung-ky-thuat",
    title: "Hướng Dẫn Lắp Đặt Tôn Nhựa Đúng Kỹ Thuật - Tránh Sai Sót Phổ Biến",
    excerpt:
      "Hướng dẫn chi tiết từng bước lắp đặt tôn nhựa đúng cách, các lỗi thường gặp và cách khắc phục để đảm bảo công trình bền vững.",
    content: `
      <h2>Chuẩn bị trước khi lắp đặt</h2>

      <h3>1. Công cụ cần thiết</h3>
      <ul>
        <li>Máy khoan pin hoặc máy vặn vít</li>
        <li>Thước dây, thước thủy</li>
        <li>Bút dạ đánh dấu</li>
        <li>Cưa hoặc đĩa cắt chuyên dụng</li>
        <li>Thang nhôm an toàn</li>
      </ul>

      <h3>2. Vật liệu phụ kiện</h3>
      <ul>
        <li>Vít tự khoan chuyên dụng cho tôn nhựa</li>
        <li>Gioăng cao su EPDM</li>
        <li>Nẹp chống thấm mí ngang, mí dọc</li>
        <li>Nẹp con sóng (nếu cần)</li>
      </ul>

      <h2>Các bước lắp đặt chi tiết</h2>

      <h3>Bước 1: Kiểm tra kết cấu xà gồ</h3>
      <p>Khoảng cách xà gồ tiêu chuẩn:</p>
      <ul>
        <li>Tôn dày 2.5mm: 500-600mm</li>
        <li>Tôn dày 3.0mm: 600-800mm</li>
        <li>Tôn dày 3.5mm: 800-1000mm</li>
      </ul>

      <h3>Bước 2: Cắt và đánh dấu tôn</h3>
      <p>Lưu ý: Luôn cắt từ mặt dưới của tôn để tránh phoi bám vào bề mặt. Sử dụng cưa răng nhỏ hoặc đĩa cắt chuyên dụng.</p>

      <h3>Bước 3: Lắp tấm tôn đầu tiên</h3>
      <p>Bắt đầu từ phía có gió thổi ít nhất. Đảm bảo tấm tôn thẳng hàng bằng thước thủy.</p>

      <h3>Bước 4: Khoan lỗ và vặn vít</h3>
      <p>Quan trọng: Khoan lỗ trước, sau đó mới vặn vít. Không vặn vít trực tiếp vào tôn.</p>
      <ul>
        <li>Vị trí đóng vít: đỉnh sóng, cách mép tôn 5cm</li>
        <li>Khoảng cách giữa các vít: 30-40cm</li>
        <li>Vặn vít vừa chặt, không quá chặt (gioăng nén khoảng 1/3)</li>
      </ul>

      <h3>Bước 5: Chồng mí tôn</h3>
      <ul>
        <li>Chồng mí dọc (chiều dài): 250mm (tấm trên 150mm, tấm dưới 100mm)</li>
        <li>Chồng mí ngang (chiều rộng): 1 sóng (8-9cm)</li>
      </ul>

      <h3>Bước 6: Lắp nẹp chống thấm</h3>
      <p>Sử dụng nẹp silicon hoặc nẹp nhựa chuyên dụng ở vị trí chồng mí dọc.</p>

      <h2>Các lỗi thường gặp và cách khắc phục</h2>

      <h3>Lỗi 1: Vặn vít quá chặt</h3>
      <p><strong>Hậu quả:</strong> Tôn bị nứt, gioăng bị ép quá mức, không chống thấm</p>
      <p><strong>Cách khắc phục:</strong> Vặn vít vừa phải, gioăng nén khoảng 1/3</p>

      <h3>Lỗi 2: Không khoan lỗ trước</h3>
      <p><strong>Hậu quả:</strong> Tôn bị nứt vỡ xung quanh vít</p>
      <p><strong>Cách khắc phục:</strong> Luôn khoan lỗ trước, đường kính lỗ lớn hơn vít 1-2mm</p>

      <h3>Lỗi 3: Chồng mí không đủ</h3>
      <p><strong>Hậu quả:</strong> Dột nước khi mưa to</p>
      <p><strong>Cách khắc phục:</strong> Đảm bảo chồng mí dọc tối thiểu 250mm</p>

      <h2>Kiểm tra sau lắp đặt</h2>
      <ul>
        <li>Kiểm tra độ thẳng hàng của các tấm tôn</li>
        <li>Đảm bảo không có vít nào bị hở</li>
        <li>Kiểm tra độ chồng mí đều khắp</li>
        <li>Thử nghiệm bằng nước để kiểm tra chống thấm</li>
      </ul>

      <h2>Kết luận</h2>
      <p>Lắp đặt tôn nhựa không khó nhưng cần tuân thủ đúng quy trình để đảm bảo công trình bền vững, không thấm dột. Nếu không có kinh nghiệm, nên thuê thợ chuyên nghiệp để tránh sai sót đáng tiếc.</p>
    `,
    image: "/images/banner3.webp",
    category: "Kiến thức",
    author: "Lê Văn E",
    publishedAt: "2025-01-05",
    views: 780,
    tags: ["Hướng dẫn", "Lắp đặt", "Tôn nhựa", "Kỹ thuật"],
    featured: false,
  },
  {
    id: 7,
    slug: "flash-sale-cuoi-tuan-giam-40-tam-pc",
    title: "Flash Sale Cuối Tuần - Giảm 40% Tấm PC Polycarbonate",
    excerpt: "Chương trình Flash Sale cuối tuần với ưu đãi cực sốc giảm tới 40% cho tấm lợp PC. Số lượng có hạn!",
    content: `<h2>Chương trình Flash Sale</h2><p>Nhân dịp cuối tuần, Nhiệt Phát Lộc tung chương trình Flash Sale với ưu đãi cực hấp dẫn.</p>`,
    image: "/images/banner1.webp",
    category: "Khuyến mãi",
    author: "Phòng Marketing",
    publishedAt: "2024-12-28",
    views: 2340,
    tags: ["Flash Sale", "Tấm PC", "Giảm giá"],
    featured: false,
  },
  {
    id: 8,
    slug: "xu-huong-vat-lieu-xay-dung-2025",
    title: "Xu Hướng Vật Liệu Xây Dựng Năm 2025 - Bền Vững & Thân Thiện Môi Trường",
    excerpt: "Khám phá những xu hướng vật liệu xây dựng mới trong năm 2025 với tiêu chí bền vững và thân thiện với môi trường.",
    content: `<h2>Xu hướng 2025</h2><p>Năm 2025 đánh dấu sự chuyển mình mạnh mẽ của ngành xây dựng hướng tới sự bền vững.</p>`,
    image: "/images/ton-eurolines-2.jpg",
    category: "Tin tức",
    author: "Nguyễn Văn F",
    publishedAt: "2025-01-14",
    views: 1890,
    tags: ["Xu hướng", "Bền vững", "Môi trường"],
    featured: false,
  },
  {
    id: 9,
    slug: "du-an-khu-dan-cu-green-valley",
    title: "Dự Án Khu Dân Cư Green Valley - 10000m² Tôn Nhựa & Tấm PC",
    excerpt: "Nhiệt Phát Lộc hoàn thành dự án cung cấp vật liệu cho 200 căn nhà tại khu dân cư Green Valley, Đồng Nai.",
    content: `<h2>Thông tin dự án</h2><p>Khu dân cư Green Valley là dự án nhà ở cao cấp với tổng diện tích lợp 10000m².</p>`,
    image: "/images/banner2.webp",
    category: "Dự án",
    author: "Phòng Kỹ Thuật",
    publishedAt: "2024-12-15",
    views: 920,
    tags: ["Dự án", "Khu dân cư", "Green Valley"],
    featured: false,
  },
  {
    id: 10,
    slug: "mua-sam-thong-minh-tai-nhiet-phat-loc",
    title: "Mua Sắm Thông Minh - Combo Tiết Kiệm 20% Cho Công Trình Nhỏ",
    excerpt: "Chương trình combo tiết kiệm dành cho các công trình nhỏ dưới 100m² với mức giảm giá lên đến 20%.",
    content: `<h2>Combo tiết kiệm</h2><p>Dành cho công trình dưới 100m², tiết kiệm ngay 20% chi phí vật liệu.</p>`,
    image: "/images/banner3.webp",
    category: "Khuyến mãi",
    author: "Phòng Marketing",
    publishedAt: "2024-12-25",
    views: 1560,
    tags: ["Combo", "Tiết kiệm", "Ưu đãi"],
    featured: false,
  },
  {
    id: 11,
    slug: "cach-chon-mau-sac-ton-nhua-hop-phong-thuy",
    title: "Cách Chọn Màu Sắc Tôn Nhựa Hợp Phong Thủy Cho Gia Chủ",
    excerpt: "Hướng dẫn lựa chọn màu sắc tôn nhựa phù hợp với mệnh và phong thủy của gia chủ để mang lại may mắn.",
    content: `<h2>Phong thủy màu sắc</h2><p>Màu sắc tôn nhựa không chỉ ảnh hưởng thẩm mỹ mà còn liên quan đến phong thủy.</p>`,
    image: "/images/ton-eurolines-1.jpg",
    category: "Kiến thức",
    author: "Trần Văn G",
    publishedAt: "2025-01-12",
    views: 1230,
    tags: ["Phong thủy", "Màu sắc", "Tôn nhựa"],
    featured: false,
  },
  {
    id: 12,
    slug: "tai-san-bay-long-thanh-ton-nhua-eurolines",
    title: "Dự Án Sân Bay Long Thành - Ứng Dụng Tôn Nhựa Cho Nhà Ga Phụ",
    excerpt: "Tôn nhựa Eurolines được lựa chọn cho khu vực nhà ga phụ của Sân bay Long Thành nhờ khả năng chống ăn mòn.",
    content: `<h2>Dự án sân bay</h2><p>Sân bay Long Thành sử dụng tôn nhựa Eurolines cho các khu vực nhà ga phụ.</p>`,
    image: "/images/banner1.webp",
    category: "Dự án",
    author: "Phòng Kỹ Thuật",
    publishedAt: "2024-11-20",
    views: 3210,
    tags: ["Sân bay", "Long Thành", "Dự án lớn"],
    featured: false,
  },
  {
    id: 13,
    slug: "cong-nghe-san-xuat-ton-nhua-hien-dai",
    title: "Công Nghệ Sản Xuất Tôn Nhựa Hiện Đại - Từ Nguyên Liệu Đến Sản Phẩm",
    excerpt: "Tìm hiểu quy trình sản xuất tôn nhựa PVC/ASA với công nghệ tiên tiến từ châu Âu, đảm bảo chất lượng cao.",
    content: `<h2>Quy trình sản xuất</h2><p>Tôn nhựa được sản xuất qua nhiều công đoạn với công nghệ hiện đại.</p>`,
    image: "/images/ton-eurolines-2.jpg",
    category: "Tin tức",
    author: "Lê Thị H",
    publishedAt: "2025-01-11",
    views: 1670,
    tags: ["Công nghệ", "Sản xuất", "Tôn nhựa"],
    featured: false,
  },
  {
    id: 14,
    slug: "mua-1-tang-1-phu-kien-lap-dat",
    title: "Mua 1 Tặng 1 - Tặng Ngay Bộ Phụ Kiện Lắp Đặt Trị Giá 2 Triệu",
    excerpt: "Chương trình khuyến mãi mua tôn nhựa tặng ngay bộ phụ kiện lắp đặt hoàn chỉnh trị giá 2 triệu đồng.",
    content: `<h2>Khuyến mãi hấp dẫn</h2><p>Mua tôn nhựa nhận ngay bộ phụ kiện lắp đặt trị giá lên đến 2 triệu đồng.</p>`,
    image: "/images/banner3.webp",
    category: "Khuyến mãi",
    author: "Phòng Marketing",
    publishedAt: "2024-12-18",
    views: 2180,
    tags: ["Khuyến mãi", "Tặng quà", "Phụ kiện"],
    featured: false,
  },
  {
    id: 15,
    slug: "bao-duong-ton-nhua-dung-cach",
    title: "Bảo Dưỡng Tôn Nhựa Đúng Cách - Kéo Dài Tuổi Thọ Gấp Đôi",
    excerpt: "Hướng dẫn chi tiết cách bảo dưỡng tôn nhựa định kỳ để duy trì độ bền và thẩm mỹ lâu dài.",
    content: `<h2>Cách bảo dưỡng</h2><p>Tôn nhựa cần được bảo dưỡng định kỳ để duy trì tuổi thọ và thẩm mỹ.</p>`,
    image: "/images/ton-eurolines-1.jpg",
    category: "Kiến thức",
    author: "Nguyễn Thị I",
    publishedAt: "2025-01-07",
    views: 1340,
    tags: ["Bảo dưỡng", "Tôn nhựa", "Hướng dẫn"],
    featured: false,
  },
  {
    id: 16,
    slug: "nha-xuong-cong-ty-samsung-bac-ninh",
    title: "Dự Án Nhà Xưởng Samsung Bắc Ninh - 15000m² Tôn Chống Tĩnh Điện",
    excerpt: "Cung cấp 15000m² tôn nhựa chống tĩnh điện cho nhà xưởng điện tử Samsung tại Bắc Ninh.",
    content: `<h2>Dự án Samsung</h2><p>Nhà xưởng Samsung yêu cầu sử dụng tôn chống tĩnh điện đặc biệt.</p>`,
    image: "/images/banner2.webp",
    category: "Dự án",
    author: "Phòng Kỹ Thuật",
    publishedAt: "2024-11-10",
    views: 4120,
    tags: ["Samsung", "Bắc Ninh", "Điện tử"],
    featured: false,
  },
  {
    id: 17,
    slug: "tam-pc-vs-tam-kinh-chon-loai-nao",
    title: "Tấm PC vs Tấm Kính - Loại Nào Phù Hợp Cho Mái Che Của Bạn?",
    excerpt: "So sánh chi tiết ưu nhược điểm giữa tấm PC Polycarbonate và tấm kính để chọn lựa phù hợp.",
    content: `<h2>So sánh PC và kính</h2><p>Tấm PC và tấm kính đều được dùng phổ biến nhưng có những điểm khác biệt.</p>`,
    image: "/images/ton-eurolines-2.jpg",
    category: "Tin tức",
    author: "Phạm Văn K",
    publishedAt: "2025-01-09",
    views: 1580,
    tags: ["So sánh", "Tấm PC", "Kính"],
    featured: false,
  },
  {
    id: 18,
    slug: "uu-dai-khach-hang-than-thiet-12-2024",
    title: "Ưu Đãi Khách Hàng Thân Thiết - Tích Điểm Đổi Quà Tháng 12",
    excerpt: "Chương trình tri ân khách hàng thân thiết với cơ chế tích điểm đổi quà hấp dẫn trong tháng 12.",
    content: `<h2>Khách hàng thân thiết</h2><p>Tích điểm mỗi lần mua hàng để đổi quà giá trị.</p>`,
    image: "/images/banner1.webp",
    category: "Khuyến mãi",
    author: "Phòng Marketing",
    publishedAt: "2024-12-01",
    views: 980,
    tags: ["Tri ân", "Tích điểm", "Khách hàng thân thiết"],
    featured: false,
  },
  {
    id: 19,
    slug: "chon-do-day-ton-nhua-phu-hop",
    title: "Chọn Độ Dày Tôn Nhựa Phù Hợp - Tiết Kiệm Mà Vẫn Đảm Bảo Chất Lượng",
    excerpt: "Hướng dẫn lựa chọn độ dày tôn nhựa phù hợp với từng loại công trình để tối ưu chi phí.",
    content: `<h2>Chọn độ dày</h2><p>Độ dày tôn nhựa ảnh hưởng trực tiếp đến độ bền và giá thành.</p>`,
    image: "/images/ton-eurolines-1.jpg",
    category: "Kiến thức",
    author: "Võ Văn L",
    publishedAt: "2025-01-06",
    views: 1150,
    tags: ["Độ dày", "Tôn nhựa", "Lựa chọn"],
    featured: false,
  },
  {
    id: 20,
    slug: "trai-chan-nuoi-heo-dong-nai",
    title: "Dự Án Trang Trại Chăn Nuôi Heo Đồng Nai - 8000m² Tôn Chống Ăn Mòn",
    excerpt: "Thi công 8000m² tôn nhựa cho trang trại chăn nuôi heo quy mô lớn tại Đồng Nai.",
    content: `<h2>Dự án chăn nuôi</h2><p>Trang trại chăn nuôi cần sử dụng vật liệu chống ăn mòn tốt.</p>`,
    image: "/images/banner3.webp",
    category: "Dự án",
    author: "Phòng Kỹ Thuật",
    publishedAt: "2024-11-25",
    views: 760,
    tags: ["Chăn nuôi", "Đồng Nai", "Trang trại"],
    featured: false,
  },
  {
    id: 21,
    slug: "vat-lieu-xay-dung-xanh-tuong-lai",
    title: "Vật Liệu Xây Dựng Xanh - Xu Hướng Tất Yếu Của Tương Lai",
    excerpt: "Phân tích xu hướng sử dụng vật liệu xây dựng xanh, thân thiện môi trường trong ngành xây dựng hiện đại.",
    content: `<h2>Vật liệu xanh</h2><p>Vật liệu xanh đang trở thành xu hướng không thể đảo ngược.</p>`,
    image: "/images/ton-eurolines-2.jpg",
    category: "Tin tức",
    author: "Đinh Thị M",
    publishedAt: "2025-01-13",
    views: 1420,
    tags: ["Vật liệu xanh", "Môi trường", "Xu hướng"],
    featured: false,
  },
  {
    id: 22,
    slug: "giam-gia-soc-black-friday-50",
    title: "Black Friday Sale - Giảm Giá Sốc 50% Toàn Bộ Sản Phẩm",
    excerpt: "Sự kiện Black Friday với mức giảm giá lên đến 50% cho tất cả sản phẩm. Cơ hội vàng không thể bỏ lỡ!",
    content: `<h2>Black Friday</h2><p>Giảm giá sốc 50% cho tất cả sản phẩm trong ngày Black Friday.</p>`,
    image: "/images/banner2.webp",
    category: "Khuyến mãi",
    author: "Phòng Marketing",
    publishedAt: "2024-11-29",
    views: 5230,
    tags: ["Black Friday", "Giảm giá sốc", "Sale"],
    featured: false,
  },
  {
    id: 23,
    slug: "tam-pc-ruot-ong-la-gi",
    title: "Tấm PC Ruột Ong Là Gì? Ưu Điểm Vượt Trội So Với Tấm Đặc",
    excerpt: "Giải đáp chi tiết về tấm PC ruột ong, cấu tạo, ưu điểm và ứng dụng trong xây dựng.",
    content: `<h2>Tấm PC ruột ong</h2><p>Cấu trúc ruột ong giúp tấm PC có khả năng cách nhiệt vượt trội.</p>`,
    image: "/images/ton-eurolines-1.jpg",
    category: "Kiến thức",
    author: "Hoàng Văn N",
    publishedAt: "2025-01-04",
    views: 990,
    tags: ["Tấm PC", "Ruột ong", "Cấu tạo"],
    featured: false,
  },
  {
    id: 24,
    slug: "khu-cong-nghiep-vsip-quang-ngai",
    title: "Dự Án KCN VSIP Quảng Ngãi - 20000m² Tôn Nhựa Cho 50 Nhà Xưởng",
    excerpt: "Dự án quy mô lớn cung cấp 20000m² tôn nhựa cho 50 nhà xưởng tại KCN VSIP Quảng Ngãi.",
    content: `<h2>Dự án VSIP</h2><p>KCN VSIP Quảng Ngãi là dự án lớn nhất của chúng tôi năm 2024.</p>`,
    image: "/images/banner1.webp",
    category: "Dự án",
    author: "Phòng Kỹ Thuật",
    publishedAt: "2024-11-05",
    views: 3890,
    tags: ["VSIP", "Quảng Ngãi", "KCN"],
    featured: false,
  },
  {
    id: 25,
    slug: "thanh-ly-kho-ton-nhua-giam-35",
    title: "Thanh Lý Kho - Tôn Nhựa Giảm Giá 35% Số Lượng Có Hạn",
    excerpt: "Chương trình thanh lý kho với giá giảm 35% cho tôn nhựa các loại. Hàng có sẵn, số lượng có hạn.",
    content: `<h2>Thanh lý kho</h2><p>Giảm giá 35% để thanh lý hàng tồn kho, số lượng có hạn.</p>`,
    image: "/images/banner3.webp",
    category: "Khuyến mãi",
    author: "Phòng Marketing",
    publishedAt: "2024-12-10",
    views: 2760,
    tags: ["Thanh lý", "Giảm giá", "Tồn kho"],
    featured: false,
  },
  {
    id: 26,
    slug: "cach-phan-biet-ton-nhua-that-gia",
    title: "Cách Phân Biệt Tôn Nhựa Thật Giả - Tránh Mua Phải Hàng Kém Chất Lượng",
    excerpt: "Hướng dẫn cách nhận biết tôn nhựa chất lượng thật, tránh mua phải hàng giả, hàng kém chất lượng.",
    content: `<h2>Phân biệt thật giả</h2><p>Cần có kỹ năng để phân biệt tôn nhựa chất lượng thật và giả.</p>`,
    image: "/images/ton-eurolines-2.jpg",
    category: "Kiến thức",
    author: "Trương Văn O",
    publishedAt: "2025-01-03",
    views: 1680,
    tags: ["Phân biệt", "Chất lượng", "Tôn nhựa"],
    featured: false,
  },
];

// Lấy tin nổi bật
export const getFeaturedNews = () => {
  return NEWS_ARTICLES.filter((article) => article.featured);
};

// Lấy tin mới nhất
export const getLatestNews = (limit: number = 6) => {
  return NEWS_ARTICLES.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, limit);
};

// Lấy tin theo danh mục
export const getNewsByCategory = (category: string) => {
  return NEWS_ARTICLES.filter((article) => article.category === category);
};

// Lấy tin liên quan (cùng category, loại bỏ tin hiện tại)
export const getRelatedNews = (currentId: number, limit: number = 3) => {
  const currentArticle = NEWS_ARTICLES.find((a) => a.id === currentId);
  if (!currentArticle) return [];

  return NEWS_ARTICLES.filter(
    (article) =>
      article.id !== currentId && article.category === currentArticle.category
  ).slice(0, limit);
};

// Tìm kiếm tin tức
export const searchNews = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return NEWS_ARTICLES.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
