# OceanView - Ứng dụng quản lý chung cư

**OceanView** là một ứng dụng di động được phát triển bằng React Native, giúp quản lý và tương tác với các dịch vụ trong chung cư một cách dễ dàng và tiện lợi. Ứng dụng này dành cho cả cư dân và ban quản lý chung cư, cung cấp các tính năng như đăng ký dịch vụ, thanh toán hóa đơn, gửi yêu cầu hỗ trợ, và nhận thông báo từ ban quản lý.

## Tính năng chính

- **Đăng ký/Đăng nhập**: Cư dân và ban quản lý có thể đăng ký và đăng nhập vào hệ thống.
- **Quản lý thông tin cá nhân**: Cư dân có thể cập nhật thông tin cá nhân, xem thông tin căn hộ, và quản lý các dịch vụ đăng ký.
- **Thanh toán hóa đơn**: Cư dân có thể xem và thanh toán các hóa đơn dịch vụ (điện, nước, dịch vụ chung cư).
- **Gửi yêu cầu hỗ trợ**: Cư dân có thể gửi yêu cầu hỗ trợ hoặc báo cáo sự cố đến ban quản lý.
- **Nhận thông báo**: Cư dân nhận thông báo từ ban quản lý về các sự kiện, thông báo chung, hoặc phản hồi yêu cầu.
- **Quản lý dịch vụ**: Ban quản lý có thể thêm, cập nhật, và quản lý các dịch vụ chung cư.

## Công nghệ sử dụng

- **Frontend**: React Native, React Navigation, Redux (hoặc Context API)
- **Backend**: (Nếu có) Node.js, Express.js, MongoDB (hoặc bất kỳ công nghệ nào bạn sử dụng)
- **Styling**: CSS-in-JS (Styled Components hoặc Emotion) hoặc một thư viện UI như React Native Paper
- **Authentication**: JWT (JSON Web Token) hoặc OAuth
- **API**: RESTful API hoặc GraphQL

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js (phiên bản 14.x trở lên)
- npm hoặc yarn
- React Native CLI hoặc Expo CLI (tùy thuộc vào cách bạn thiết lập dự án)

### Các bước cài đặt

1. **Clone dự án**:
   ```bash
   git clone https://github.com/tranlequocthong313/OceanView_FE.git
   cd OceanView_FE
   ```

2. **Cài đặt các dependencies**:
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Chạy dự án**:
   - Nếu sử dụng React Native CLI:
     ```bash
     npx react-native run-android
     # hoặc
     npx react-native run-ios
     ```
   - Nếu sử dụng Expo CLI:
     ```bash
     expo start
     ```

4. **Quét mã QR (nếu dùng Expo)**: Mở ứng dụng Expo Go trên điện thoại và quét mã QR để chạy ứng dụng.

### Cấu hình môi trường

Tạo file `.env` trong thư mục gốc của dự án và thêm các biến môi trường cần thiết (nếu có):

```env
API_URL=http://your-api-url.com
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## Cấu trúc thư mục

```
OceanView_FE/
├── assets/                  # Thư mục chứa hình ảnh, font, và các file tĩnh khác
├── src/                     # Source code chính
│   ├── components/          # Các component React Native
│   ├── screens/             # Các màn hình của ứng dụng
│   ├── navigation/          # Cấu hình React Navigation
│   ├── store/               # Redux store (quản lý state)
│   ├── services/            # Các service để gọi API
│   ├── styles/              # File CSS-in-JS hoặc global styles
│   ├── utils/               # Các hàm tiện ích
│   ├── App.js               # File khởi tạo ứng dụng
│   └── index.js             # File entry point
├── .env                     # File cấu hình môi trường
├── package.json             # Danh sách dependencies và scripts
└── README.md                # Tài liệu hướng dẫn
```

## Đóng góp

Nếu bạn muốn đóng góp vào dự án, vui lòng làm theo các bước sau:

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/YourFeatureName`)
3. Commit các thay đổi (`git commit -m 'Add some feature'`)
4. Push lên branch (`git push origin feature/YourFeatureName`)
5. Mở một Pull Request

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ:

- **Tên**: Trần Lê Quốc Thông
- **Email**: tranlequocthong313@gmail.com
- **GitHub**: [tranlequocthong313](https://github.com/tranlequocthong313)
