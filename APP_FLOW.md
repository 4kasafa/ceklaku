# Alur Aplikasi Cek Laku Versi HP

Dokumen ini menjelaskan alur logika aplikasi, mulai dari inisialisasi, deteksi perangkat, autentikasi, hingga interaksi di dalam dashboard.

## Diagram Alur (Flowchart)

```mermaid
flowchart TD
    %% Node Styles
    classDef process fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#1e293b;
    classDef decision fill:#fef9c3,stroke:#ca8a04,stroke-width:2px,color:#1e293b;
    classDef view fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#1e293b;
    classDef error fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    classDef startend fill:#f1f5f9,stroke:#64748b,stroke-width:2px,color:#1e293b,shape:circle;

    Start([User Membuka Aplikasi]) --> InitApp[Inisialisasi App & AuthContext]
    InitApp --> CheckDevice{Cek Ukuran Layar\n(Desktop > 1024px?)}

    %% Desktop Redirect Flow
    CheckDevice -- Ya (Desktop) --> CheckAuthDesktop{Sudah Login?}
    CheckAuthDesktop -- Tidak --> CheckDismissed{Redirect Ditutup?}
    CheckDismissed -- Tidak --> ShowRedirect[Tampilkan DesktopRedirect\n(QR Code & Tombol)]
    ShowRedirect --> UserActionRedirect{User Klik?}
    UserActionRedirect -- "Lanjut buka disini" --> SetDismissed[Set State Dismissed]
    SetDismissed --> CheckToken
    CheckDismissed -- Ya --> CheckToken
    CheckAuthDesktop -- Ya --> CheckToken

    %% Mobile / Standard Flow
    CheckDevice -- Tidak (Mobile) --> CheckToken{Token Valid & \nBelum Expired?}

    %% Auth Flow
    CheckToken -- Tidak Valid/Kosong --> LoginView[Tampilkan LoginForm]
    LoginView --> UserInput[User Input Email & Password]
    UserInput --> SubmitLogin[Klik Masuk]
    SubmitLogin --> CallLoginAPI[API POST /auth/login]
    
    CallLoginAPI -- Gagal/Error --> ShowError[Tampilkan Error Alert]:::error
    ShowError --> LoginView
    
    CallLoginAPI -- Sukses --> SaveToken[Simpan Token & ExpiresAt\nke LocalStorage]
    SaveToken --> FetchDataProcess

    %% Data Fetching Flow
    CheckToken -- Valid --> FetchDataProcess[Fetch Dashboard Data]
    FetchDataProcess --> CallDashboardAPI[API GET /dashboard]
    
    CallDashboardAPI -- Error 401 (Token Invalid) --> AutoLogout[Hapus Token & Logout]
    AutoLogout --> LoginView
    
    CallDashboardAPI -- Sukses --> SetData[Set Dashboard Data]
    SetData --> DashboardView[Tampilkan Dashboard Utama]:::view

    %% Dashboard Interactions
    DashboardView --> UserInteraction{Interaksi User}
    
    UserInteraction -- Navigasi Sesi --> ChangeSession[Ganti Index Sesi\n(Prev/Next)]
    ChangeSession --> DashboardView
    
    UserInteraction -- Klik Info --> ShowAbout[Tampilkan Modal About]:::view
    ShowAbout --> CloseAbout[Tutup Modal] --> DashboardView
    
    UserInteraction -- Klik Settings --> ShowSettings[Tampilkan Modal Settings]:::view

    %% Settings Actions
    ShowSettings -- Klik Refresh --> RefreshAction[Panggil checkAuth()]
    RefreshAction --> FetchDataProcess
    
    ShowSettings -- Klik Pasang App --> InstallPWA[Trigger PWA Install Prompt]
    InstallPWA --> ShowSettings
    
    ShowSettings -- Klik Keluar --> ConfirmLogout{Konfirmasi?}
    ConfirmLogout -- Ya --> LogoutAction[Hapus Token & State]
    LogoutAction --> LoginView
    ConfirmLogout -- Tidak --> ShowSettings

    %% Apply Styles
    class LoginView,DashboardView,ShowRedirect,ShowSettings,ShowAbout view;
    class CheckDevice,CheckAuthDesktop,CheckDismissed,CheckToken,UserActionRedirect,CallLoginAPI,CallDashboardAPI,UserInteraction,ConfirmLogout decision;
    class Start,InitApp,SetDismissed,UserInput,SubmitLogin,SaveToken,FetchDataProcess,SetData,ChangeSession,RefreshAction,InstallPWA,LogoutAction,AutoLogout,CloseAbout process;
```

---

## Penjelasan Komponen Utama

### 1. Deteksi Perangkat (Desktop Redirect)
Aplikasi melakukan pengecekan lebar layar saat pertama kali dimuat. Jika lebar layar mencapai atau melebihi 1024px (Desktop) dan pengguna belum login, aplikasi akan menampilkan komponen `DesktopRedirect`. Komponen ini menampilkan QR Code untuk mendorong penggunaan di HP, namun tetap menyediakan tombol "Lanjut buka disini" bagi pengguna yang memilih untuk tetap di desktop.

### 2. Manajemen Autentikasi (`AuthContext`)
Autentikasi dikelola secara terpusat. Token dan waktu kedaluwarsa disimpan di `localStorage`. Setiap kali aplikasi dimuat, sistem akan memvalidasi token tersebut sebelum memuat data dashboard.

### 3. Pengambilan Data Dashboard
Data diambil melalui endpoint `/dashboard` dengan menyertakan token Bearer di header. Jika API mengembalikan status `401 TOKEN_INVALID`, aplikasi secara otomatis menghapus sisa session dan mengarahkan pengguna kembali ke halaman login.

### 4. Navigasi Sesi Dashboard
Dashboard mendukung tampilan data dari beberapa sesi transaksi. Pengguna dapat berpindah antar sesi menggunakan navigasi Prev/Next yang akan memperbarui index tampilan data secara reaktif.

### 5. Fitur PWA
Aplikasi dikonfigurasi sebagai Progressive Web App (PWA). Di dalam menu pengaturan, tersedia tombol untuk memicu instalasi aplikasi ke layar utama (Home Screen) perangkat mobile.
