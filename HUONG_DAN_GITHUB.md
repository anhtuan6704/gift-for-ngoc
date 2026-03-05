# 🚀 HƯỚNG DẪN ĐĂNG WEBSITE LÊN GITHUB PAGES

## 📋 CHUẨN BỊ

### 1. Tạo tài khoản GitHub (nếu chưa có)
- Truy cập: https://github.com
- Click **Sign up** (Đăng ký)
- Điền email, mật khẩu, username
- Xác nhận email

### 2. Cài đặt Git trên máy tính
- Tải Git tại: https://git-scm.com/download/win
- Cài đặt với các tùy chọn mặc định
- Khởi động lại máy tính sau khi cài

---

## 🎯 CÁCH 1: UPLOAD BẰNG GITHUB WEB (KHÔNG CẦN GIT)

### Bước 1: Tạo Repository mới
1. Đăng nhập GitHub
2. Click nút **+** ở góc trên bên phải → **New repository**
3. Điền thông tin:
   - **Repository name**: `gift-for-ngoc` (hoặc tên bạn thích, không dấu, không khoảng trắng)
   - **Description**: "Món quà đặc biệt 💗"
   - Chọn **Public** (để trang web hoạt động miễn phí)
   - ✅ Tick checkbox **Add a README file**
4. Click **Create repository**

### Bước 2: Upload files
1. Trong repository vừa tạo, click **Add file** → **Upload files**
2. Kéo thả TẤT CẢ các file và folder từ thư mục `ngocngoc` vào
   - index.html
   - README.md
   - Folder style/
   - Tất cả file khác
3. Đợi upload xong
4. Kéo xuống dưới, click **Commit changes**

### Bước 3: Bật GitHub Pages
1. Trong repository, click tab **Settings** (⚙️)
2. Bên trái, click **Pages**
3. Tại **Source**, chọn: **Deploy from a branch**
4. Tại **Branch**, chọn: **main** (hoặc **master**) và folder **/root**
5. Click **Save**
6. Đợi 1-2 phút
7. Refresh lại trang, sẽ thấy thông báo:
   ```
   Your site is live at https://username.github.io/gift-for-ngoc/
   ```

### Bước 4: Sửa đường dẫn file (QUAN TRỌNG!)
**Vấn đề**: File CSS/JS có thể không load vì đường dẫn sai.

**Giải pháp**: Sửa file `gift.html`
- Dòng 9: Sửa `href="./style/style.css"` thành `href="style/style.css"`
- Tương tự với file script.js

Sau khi sửa, upload lại file `gift.html` vào GitHub (Add file → Upload files → chọn file → Commit)

---

## 🎯 CÁCH 2: UPLOAD BẰNG GIT (CHO NGƯỜI QUEN)

### Bước 1: Mở PowerShell trong thư mục ngocngoc
1. Mở thư mục `ngocngoc`
2. Shift + Right click → **Open PowerShell window here**

### Bước 2: Chạy lệnh Git
```powershell
# Khởi tạo Git
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Tặng quà ngày 8/3 💗"

# Thêm remote (THAY username và ten-repo)
git remote add origin https://github.com/username/ten-repo.git

# Đổi tên nhánh thành main
git branch -M main

# Push lên GitHub
git push -u origin main
```

**Lưu ý**: Thay `username` và `ten-repo` bằng thông tin của bạn từ GitHub

### Bước 3: Bật GitHub Pages (giống Cách 1 - Bước 3)

---

## 📱 TẠO QR CODE

### Sau khi có link website:
1. Copy link: `https://username.github.io/ten-repo/`
2. Truy cập: https://www.qrcode-monkey.com/
3. Paste link vào ô **Your URL**
4. Tùy chỉnh:
   - Chọn màu hồng/đỏ
   - Thêm logo trái tim
   - Thêm text "Scan để xem quà nhé 💗"
5. Click **Download PNG**
6. Lưu file QR code

### Gửi QR cho người nhận:
- In ra giấy đẹp
- Gửi qua Zalo/Messenger kèm lời nhắn
- Đặt trong thiệp/hộp quà

---

## 🔧 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: Website không hiển thị đúng
**Nguyên nhân**: Đường dẫn file sai
**Giải pháp**: 
- Kiểm tra tất cả đường dẫn trong HTML phải bắt đầu bằng `style/` hoặc `./style/`
- Không dùng đường dẫn tuyệt đối như `c:\Users\...`

### Lỗi 2: Ảnh không hiển thị
**Nguyên nhân**: File ảnh không được upload hoặc đường dẫn sai
**Giải pháp**:
- Kiểm tra folder `style/img/` đã được upload chưa
- Sửa đường dẫn ảnh trong HTML

### Lỗi 3: CSS không load
**Nguyên nhân**: Link CSS sai
**Giải pháp**:
- File index.html: `href="style/style.css"`
- File gift.html: `href="style/style.css"` (không có dấu `.` đầu)

### Lỗi 4: Trang 404 Not Found
**Nguyên nhân**: Chưa bật GitHub Pages hoặc đang chờ deploy
**Giải pháp**: Đợi 2-5 phút sau khi bật GitHub Pages, sau đó thử lại

---

## ✅ CHECKLIST

- [ ] Đã tạo tài khoản GitHub
- [ ] Đã tạo repository
- [ ] Đã upload tất cả file
- [ ] Đã bật GitHub Pages
- [ ] Website đã hoạt động (test link)
- [ ] Đã tạo QR code
- [ ] Đã test quét QR code bằng điện thoại

---

## 💡 MẸO HAY

1. **Đặt tên repo ngắn gọn**: Link sẽ ngắn hơn, dễ tạo QR
2. **Thêm favicon**: Làm website chuyên nghiệp hơn
3. **Test trên điện thoại**: Đảm bảo responsive tốt
4. **Backup code**: Tải xuống ZIP từ GitHub làm backup

---

## 🆘 CẦN GIÚP ĐỠ?

- Xem hướng dẫn GitHub: https://docs.github.com/en/pages
- Video YouTube: Tìm "github pages tutorial vietnamese"
- Hoặc hỏi tôi trực tiếp!

---

**Chúc bạn thành công! 💗🎉**
