## Giải thích các thành phần chính

### 1. Store và Redux Store

**Store** là nơi lưu trữ dữ liệu hoặc trạng thái mà ứng dụng cần sử dụng.

**Redux Store** là nơi quản lý trạng thái dùng chung của ứng dụng. Các component có thể đọc dữ liệu từ Store và yêu cầu cập nhật dữ liệu thông qua Redux Actions.

Trong dự án này, Redux Store quản lý:
- `auth`: Thông tin người dùng và trạng thái đăng nhập.
- `dashboard`: Danh sách khách hàng và đơn hàng.

Các file liên quan:
- `store/index.js`: Tạo Redux Store.
- `store/slices/index.js`: Tập hợp các reducer.
- `features/auth/authSlice.js`: Quản lý trạng thái xác thực.
- `features/dashboard/dashboardSlice.js`: Quản lý dữ liệu Dashboard.

**Ví dụ:** Khi thêm một khách hàng, Redux cập nhật danh sách trong Store. Các component đang sử dụng danh sách đó sẽ tự cập nhật giao diện.

### 2. Hooks

**Hooks** là các hàm của React giúp component sử dụng những chức năng như quản lý trạng thái, theo dõi vòng đời và truy cập dữ liệu từ Redux.

Dự án sử dụng hai loại Hooks:

- **React Hooks:** Các hook có sẵn như `useState`, `useEffect` và `useSelector`.
- **Custom Hooks:** Các hàm do lập trình viên tự tạo để tái sử dụng logic, chẳng hạn `useAuth`, `useProfile` và `useDashboardStats`.

Một số Hooks thường dùng:

| Hook | Chức năng |
|---|---|
| `useState` | Lưu trạng thái cục bộ của component, ví dụ nội dung ô tìm kiếm. |
| `useEffect` | Thực hiện công việc phụ khi component hoặc dữ liệu liên quan thay đổi. |
| `useSelector` | Đọc dữ liệu từ Redux Store. |
| `useDispatch` | Gửi Action để yêu cầu Redux cập nhật dữ liệu. |
| `useAuth` | Gom logic liên quan đến đăng nhập và đăng xuất. |
| `useDebounce` | Trì hoãn cập nhật giá trị cho đến khi người dùng ngừng nhập một khoảng thời gian. |

**Ví dụ:** `useAuth()` giúp các component sử dụng thông tin người dùng và chức năng đăng xuất mà không cần viết lại cùng một logic ở nhiều nơi.

### 3. Luồng xử lý giao diện (UI Flow)

Giao diện hoạt động theo luồng sau:

```text
Người dùng thao tác trên UI
          |
          v
React Component
          |
          v
Xử lý sự kiện
(onClick, onSubmit, ...)
          |
          v
Dispatch Action
          |
          v
Redux Slice / Reducer
          |
          v
Redux Store cập nhật dữ liệu
          |
          v
useSelector nhận dữ liệu mới
          |
          v
React cập nhật giao diện
```

**Ví dụ: Thêm khách hàng**

1. Người dùng nhập tên và email vào form.
2. Component `Customers.jsx` nhận dữ liệu khi form được gửi.
3. Component gọi `dispatch(addCustomer(...))`.
4. Reducer trong `dashboardSlice.js` thêm khách hàng vào Redux Store.
5. `useSelector` nhận danh sách khách hàng mới.
6. React render lại bảng để hiển thị khách hàng vừa thêm.

Với những thao tác chỉ ảnh hưởng đến một component, chẳng hạn nhập từ khóa tìm kiếm, ứng dụng có thể dùng `useState` mà không cần Redux.

### 4. Luồng khởi chạy và hiển thị trang

```text
index.html
    |
    v
main.jsx
    |
    v
Provider (Redux Store)
    |
    v
App.jsx
    |
    v
AppRoutes.jsx
    |
    v
MainLayout.jsx
    |
    +--> Sidebar
    +--> Header
    +--> Page Content
    +--> Footer
```

- `main.jsx`: Khởi chạy React và cung cấp Redux Store cho ứng dụng.
- `App.jsx`: Thiết lập React Router.
- `AppRoutes.jsx`: Xác định trang cần hiển thị theo URL.
- `MainLayout.jsx`: Cung cấp bố cục dùng chung.
- `Sidebar`, `Header` và `Footer`: Các thành phần giao diện dùng lại.
- `Dashboard`, `Customers`, `Orders` và `Profile`: Nội dung của từng trang.

### 5. Luồng đăng nhập

```text
LoginForm.jsx
      |
      v
useAuth()
      |
      v
loginUser Action
      |
      v
authService.js
      |
      v
authSlice.js
      |
      v
Redux Store
      |
      v
ProtectedRoute.jsx
      |
      v
Cho phép truy cập trang
hoặc chuyển đến /login
```

Chức năng đăng nhập hiện sử dụng tài khoản demo và kiểm tra thông tin ngay trên frontend. `ProtectedRoute.jsx` kiểm tra trạng thái đăng nhập để điều hướng người dùng.

Đây chỉ là luồng mô phỏng để học tập, không thay thế hệ thống xác thực an toàn có backend.

### 6. Quan hệ giữa các thành phần

| Thành phần | Vai trò |
|---|---|
| Pages | Hiển thị nội dung của từng trang. |
| Components | Xây dựng giao diện có thể tái sử dụng. |
| Hooks | Tái sử dụng logic và truy cập trạng thái. |
| Features | Gom code theo từng chức năng. |
| Redux Store | Lưu và quản lý trạng thái dùng chung. |
| Slices | Định nghĩa trạng thái và cách cập nhật dữ liệu. |
| Routes | Điều hướng giữa các trang. |
| Utils | Chứa các hàm tiện ích dùng chung. |

Các thành phần phối hợp để tách biệt giao diện, logic xử lý, trạng thái dữ liệu và điều hướng, giúp mã nguồn dễ đọc và bảo trì hơn.