# Người Lính Cụ Hồ - Tây Bắc 1954

Đây là một trò chơi platformer 2D dựa trên web, lấy cảm hứng từ lịch sử Việt Nam giai đoạn kháng chiến chống Pháp (1951-1954). Trò chơi kết hợp yếu tố hành động, thu thập vật phẩm và quiz kiến thức lịch sử để giáo dục người chơi về các sự kiện quan trọng như Chiến dịch Tây Bắc, Điện Biên Phủ, và Hiệp định Genève.

Trò chơi được xây dựng bằng HTML, CSS và JavaScript, với dữ liệu quiz từ file `quiz-data.js`. Nó sử dụng các thư viện bên ngoài như Paper.js, Anime.js và GSAP để xử lý đồ họa và animation.

## Yêu cầu
- Trình duyệt web hiện đại (Chrome, Firefox, Edge, v.v.).
- Kết nối internet (để tải thư viện bên ngoài như Paper.js, Anime.js và GSAP).
- Không cần cài đặt thêm phần mềm, nhưng khuyến nghị sử dụng server cục bộ để tránh lỗi CORS khi chạy cục bộ.

## Hướng dẫn Cài đặt và Chạy
### 1. Clone Repository
Clone repo về máy tính của bạn bằng lệnh Git hoặc tải file về

### 2. Mở Thư Mục Dự Án
Chuyển vào thư mục dự án:
cd your-repo-name
text### 3. Chạy Trò Chơi Cục Bộ
#### Cách 1: Mở Trực Tiếp Trong Trình Duyệt (Đơn Giản)
- Mở file `index.html` bằng trình duyệt web (kéo thả file vào trình duyệt hoặc right-click > Open with browser).
- **Lưu ý**: Một số trình duyệt có thể gặp lỗi bảo mật (CORS) khi tải script cục bộ. Nếu gặp lỗi, sử dụng Cách 2.

#### Cách 2: Sử Dụng Server Cục Bộ (Khuyến Nghị)
Để tránh lỗi CORS và mô phỏng môi trường web thực tế:
- Nếu bạn dùng VS Code: Cài extension "Live Server" và right-click vào `index.html` > "Open with Live Server".
- Hoặc sử dụng Python (nếu có Python 3+):
python -m http.server 8000
textSau đó mở trình duyệt và truy cập `http://localhost:8000/index.html`.
- Hoặc sử dụng Node.js với `http-server`:
npm install -g http-server
http-server
textTruy cập `http://localhost:8080/index.html`.

### 4. Deploy Lên GitHub Pages (Để Chơi Online)
- Đẩy repo lên GitHub nếu chưa có.
- Vào Settings của repo > Pages > Chọn branch `main` (hoặc `master`) và thư mục root (`/`).
- Save và chờ vài phút. Trò chơi sẽ доступ tại `https://your-username.github.io/your-repo-name/`.

## Cách Chơi
- **Điều khiển**:
- A/D hoặc ←/→: Di chuyển trái/phải.
- W hoặc ↑: Nhảy.
- S hoặc ↓: Cúi xuống.
- Space: Bắn.
- **Mục tiêu**: Di chuyển qua bản đồ, tiêu diệt kẻ địch, thu thập vật phẩm lịch sử và trả lời quiz để đạt điểm cao. Đạt đến cổng cuối để hoàn thành chiến dịch.
- **Tính năng**: Bảng xếp hạng, minimap, animation mượt mà, và quiz giáo dục về lịch sử Việt Nam.

## File Chính
- `index.html`: Trang chính của trò chơi.
- `style.css`: Styles cho giao diện.
- `script.js`: Logic trò chơi (bao gồm class Game, Player, Enemy, v.v.).
- `quiz-data.js`: Dữ liệu 50 câu hỏi quiz về lịch sử Việt Nam 1951-1954.

## Thư Viện Sử Dụng
- [Paper.js](https://paperjs.org/) cho vector graphics.
- [Anime.js](https://animejs.com/) cho animation mượt mà.
- [GSAP](https://greensock.com/gsap/) cho animation nâng cao.

## Lỗi Thường Gặp
- **Lỗi CORS**: Sử dụng server cục bộ như hướng dẫn ở trên.
- **Không tải được thư viện**: Kiểm tra kết nối internet.
- **Trò chơi không chạy**: Đảm bảo trình duyệt hỗ trợ ES6+ và kiểm tra console log để debug.

## Đóng Góp
- Fork repo và tạo Pull Request nếu bạn muốn cải thiện (ví dụ: thêm quiz, cải thiện animation).
- Báo issue nếu gặp bug.

Hãy chơi và học lịch sử Việt Nam một cách thú vị! 🇻🇳
