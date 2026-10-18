# For My Cua ❤️ — Our Little Universe & Cosmic Password Gate 🌌

Trải nghiệm vũ trụ lãng mạn tương tác dành riêng cho **Cua**, được xây dựng hoàn toàn bằng **HTML5 Canvas 2D**, **CSS3 Glassmorphism** và **JavaScript thuần (ES6+)**. Dự án bao gồm màn hình khóa vũ trụ (**Cosmic Password Gate**), dải Ngân Hà sống động, hàng nghìn ngôi sao đa tầng có chiều sâu, sao băng, trái tim kết tinh từ hàng nghìn hạt sáng màu hồng và bức thư tình xuất hiện từng đoạn.

---

## 1. Cấu trúc hệ thống (`Modular Architecture`)

1. **`CosmicPasswordGate` (Màn hình khóa vũ trụ)**:
   - Hiển thị đầu tiên khi mở trang, trên nền Dải Ngân Hà và các ngôi sao lấp lánh.
   - Dòng gợi ý đánh lạc hướng dễ thương: *“vui lòng nhập anhyeuem để có thể chạm tới trái tym anh ấy”*.
   - **Mật mã chính xác để mở khóa**: `emyeuanh` (tự động loại bỏ khoảng trắng thừa ở đầu/cuối và không phân biệt chữ hoa/thường).
   - Nếu nhập `anhyeuem` hoặc mật mã khác: Khung nhập rung nhẹ, viền ánh đỏ hồng và hiện thông báo: *“Mật mã chưa đúng rồi Cua ơi... thử nói điều ngược lại xem nhé 💗”*.
   - Khi nhập đúng `emyeuanh`: Khung khóa phát sáng hồng ấm rồi tan biến, các ngôi sao bay nhẹ về tâm màn hình, kích hoạt hàng nghìn hạt hồng hội tụ thành trái tim.
2. **`GalaxyNebulaSystem` (Dải Ngân Hà & Tinh Vân)**:
   - Nền đêm vũ trụ sâu thẳm (`#03020a`, `#091128`, `#190a2e`) kết hợp các đám mây tinh vân tím, xanh đêm, hồng phấn và xanh lam trôi chậm.
   - Dải Ngân Hà uốn cong nhẹ qua màn hình và phản chiếu ánh sáng hồng từ nhịp đập trái tim.
3. **`StarfieldSystem` (Trường sao 3 lớp & Bụi vũ trụ)**:
   - Hàng trăm ngôi sao phân bố ở 3 lớp chiều sâu (Xa, Trung, Gần) với chu kỳ lấp lánh bất đồng bộ và hiệu ứng hội tụ khi mở khóa.
4. **`ShootingStarSystem` (Sao băng ngẫu nhiên)**:
   - Thỉnh thoảng xuất hiện sao băng mảnh bay chéo qua bầu trời đêm với vệt sáng mượt.
5. **`ParticleHeartSystem` (Trái tim hạt sáng màu hồng & Vật lý chống chồng đè)**:
   - Hàng nghìn hạt sáng màu hồng hội tụ theo phương trình tham số trái tim chỉ sau khi mở khóa thành công.
   - Tích hợp thuật toán **Separation Physics** chống chồng đè cho các tinh linh ánh sao và thẻ chữ nổi quanh trái tim.
6. **`LoveLetterSystem` & `RomanticPianoEngine`**:
   - Chạm vào trái tim để lan tỏa sóng ánh sáng hồng ấm và mở tấm thiệp kính mờ **“Gửi Cua của anh 💗”** với hiệu ứng hiện chữ từng đoạn.

---

## 2. Hướng dẫn chạy thử và kiểm tra (Testing)

1. Mở trực tiếp trên khung Preview hoặc mở file `index.html` trên trình duyệt.
2. **Thử nhập sai mật mã**: Nhập `anhyeuem` theo dòng gợi ý và nhấn **Enter** hoặc nút **“CHẠM TỚI TRÁI TIM ANH ❤️”** để kiểm tra hiệu ứng rung nhẹ và thông báo gợi ý ngược lại.
3. **Thử nhập đúng mật mã**: Nhập `emyeuanh` (hoặc `EmYeuAnh`, ` emyeuanh `) rồi nhấn xác nhận để kiểm tra chuỗi hiệu ứng tan biến màn hình khóa, sao hội tụ về tâm và trái tim hạt sáng màu hồng hình thành.
4. Sau khi trái tim hình thành và đập nhịp nhàng, chạm vào trái tim để mở bức thư tình dành cho Cua.

---

## 3. Hướng dẫn cập nhật phiên bản mới lên GitHub Pages

Nếu bạn đã triển khai dự án lên GitHub Pages trước đó, hãy làm theo các bước sau để cập nhật phiên bản mới có **Cosmic Password Gate**:

### Cách 1: Cập nhật trực tiếp trên giao diện web GitHub (Nhanh nhất)
1. Truy cập vào repository `for-my-cua` của bạn trên [github.com](https://github.com).
2. Nhấn vào nút **Add file** → **Upload files** ở góc trên bên phải danh sách file.
3. Kéo thả các file mới đã cập nhật (`index.html`, `style.css`, `script.js`, `README.md`) vào khung tải lên để ghi đè lên phiên bản cũ.
4. Ở mục **Commit changes** bên dưới, nhập nội dung: `Add Cosmic Password Gate for Cua` rồi nhấn nút xanh **Commit changes**.
5. Chờ khoảng **1–2 phút** để GitHub Pages tự động cập nhật bản mới.
6. Mở lại đường dẫn `https://<ten-tai-khoan-github>.github.io/for-my-cua/` trên điện thoại (nhấn làm mới trang / xóa bộ nhớ đệm nếu cần) để kiểm tra màn hình mật mã.

### Cách 2: Cập nhật bằng Git trên máy tính (Terminal / Git Bash)
```bash
git add index.html style.css script.js README.md
git commit -m "Add Cosmic Password Gate for Cua"
git push origin main
```
Sau khi `git push` thành công, đợi 1–2 phút là đường dẫn GitHub Pages công khai sẽ tự động được nâng cấp.
