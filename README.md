# 🚀 CapCut Account Creator v2.0 - Premium Edition

<div align="center">
  <img src="https://img.shields.io/badge/Version-2.0-brightgreen?style=for-the-badge">
  <img src="https://img.shields.io/badge/Node.js-18+-blue?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/Status-Stable-success?style=for-the-badge">
  <br>
  <img src="https://img.shields.io/badge/License-MIT-red?style=flat-square">
  <img src="https://img.shields.io/badge/Anti--Detection-Enabled-orange?style=flat-square">
  <img src="https://img.shields.io/badge/Proxy-Supported-purple?style=flat-square">
</div>

## 🎯 Apa ini?

CapCut Account Creator adalah tool otomatis untuk bikin akun CapCut secara massal dengan sistem anti-deteksi yang canggih. Tool ini pake proxy, timing yang smart, dan UI yang keren banget!

## ✨ Fitur Utama

### 🔥 **Anti-Detection System**
- ✅ Proxy rotation otomatis
- ✅ Random user-agent untuk setiap request
- ✅ Smart delay system (1-3 menit antar akun)
- ✅ Exponential backoff untuk email checking
- ✅ Random birthday generator

### 🎨 **User Experience**
- 🎯 **UI yang Keren**: Banner ASCII art yang aesthetic
- 📊 **Progress Tracking**: Real-time progress bar
- ⏱️ **Countdown Timer**: Timer mundur yang akurat
- 🎪 **Loading Animation**: Animasi smooth saat startup
- 📱 **Responsive Design**: Output yang rapi dan mudah dibaca

### ⚡ **Performance**
- 🚀 **Super Cepat**: 1-3 menit per akun
- 🔒 **Ultra Secure**: Proxy + anti-detection
- 📈 **Batch Processing**: Maksimal 5 akun per run
- 🎯 **High Success Rate**: Optimasi untuk CapCut API

## 🛠️ Installation & Setup

### Persyaratan Sistem
```bash
Node.js v18+
Windows/Linux/MacOS
Internet connection (duh!)
```

### Quick Start
```bash
# Clone repo ini
git clone https://github.com/lhuciver/capcut-account-creator.git
cd capcut-account-creator

# Install dependencies
npm install

# Jalankan tool
npm start
# atau
node index.js
```

### Konfigurasi Proxy (Opsional)
Tool ini udah include proxy DataImpulse, tapi kalo mau ganti:
```javascript
// Edit bagian proxyConfig di index.js
const proxyConfig = {
  host: 'your-proxy-host.com',
  port: 1234,
  username: 'your-username',
  password: 'your-password'
};
```

## 📖 Cara Pakai

1. **Jalankan tool**:
   ```bash
   node index.js
   ```

2. **Masukkan jumlah akun**:
   ```
   📊 How many accounts to create? (Max 5 for safety): 3
   ```

3. **Set password** (atau tekan enter untuk default):
   ```
   🔑 Enter password (Press Enter for default "P@ssw0rd123"):
   ```

4. **Duduk santai** sambil nonton prosesnya! ☕

## 📸 Screenshots

### Startup Banner
```
╔══════════════════════════════════════════════════════════════════════════════╗
║ ██████  █████  ██████   ██████ ██   ██ ████████     ██████   ██████  ████████ ║
║██      ██   ██ ██   ██ ██      ██   ██     ██     ██   ██ ██    ██ ██       ║
║██      ███████ ██████  ██      ██   ██     ██     ██   ██ ██    ██ ███████  ║
║██      ██   ██ ██   ██ ██      ██   ██     ██     ██   ██ ██    ██ ██       ║
║ ██████ ██   ██ ██   ██  ██████  ██████      ██      ██████   ██████  ████████ ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### Progress Example
```
┌─ Account 2/3 ──────────────────────────────────────────────────────────────┐
 [1/5] Generating secure random email...
 ✅ Email: awesomeuser123@domain.com

 [2/5] Sending registration request to CapCut...
 ✅ Registration request sent successfully!

 [3/5] Waiting for verification email...
 ℹ️  Checking email (attempt 1/12)...
 ✅ Code received: 123456

 [4/5] Verifying account...
 ✅ Account created and saved to accounts.txt!

 [5/5] Account creation completed successfully!
└───────────────────────────────────────────────────────────────────────────┘
```

## 📁 Output Format

Akun yang berhasil dibuat akan tersimpan di `accounts.txt` dengan format:
```
email@domain.com|P@ssw0rd123
anotheremail@domain.com|P@ssw0rd123
cooluser@domain.com|P@ssw0rd123
```

## ⚙️ Konfigurasi Advanced

### Mengubah Jumlah Maksimal Akun
Edit variable `loopCount` di line 200+ untuk bypass limit 5 akun.

### Custom Delay Settings
```javascript
function smartDelay() {
  const baseDelay = 2; // Ubah delay base (menit)
  // ... logic lainnya
}
```

### Mengganti Email Provider
Tool ini pake generator.email, tapi bisa diganti dengan provider lain di function `getEmailRandom()`.

## 🔒 Keamanan & Legal

⚠️ **DISCLAIMER**: Tool ini untuk educational purposes only. Pastikan kamu tau risiko dan legalitas penggunaan di negara kamu ya!

### Best Practices:
- ✅ Jangan abuse (maks 5 akun per hari)
- ✅ Pakai VPN/proxy yang berbeda
- ✅ Jangan pake buat spam atau illegal activities
- ✅ Respect CapCut's terms of service

## 🐛 Troubleshooting

### Error: "Failed to get verification code"
- **Solusi**: Cek koneksi internet, atau coba lagi nanti
- **Tips**: Kadang email provider lagi down, sabar aja

### Error: "Registration failed"
- **Solusi**: CapCut lagi strict, coba besok lagi
- **Tips**: Kurangi jumlah akun per run

### Proxy Error
- **Solusi**: Cek kredensial proxy kamu
- **Tips**: Pastikan proxy support HTTPS

## 🤝 Contributing

Mau improve tool ini? Fork repo ini dan bikin PR! Bebas kok, yang penting:
- Ikuti coding style yang ada
- Test sebelum commit
- Dokumentasi yang jelas

## 📞 Support & Contact

<div align="center">

### 👨‍💻 **lhuciver**
**GitHub**: [@lhuciver](https://github.com/lhuciverjobs-ui)  
**Telegram**: [@lhuciver](https://t.me/@anonr00t)  

---

**⭐ Kalau suka tool ini, kasih star ya! Bantu orang lain nemuin tool keren ini!**

</div>

## 📈 Roadmap

- [ ] Multi-threading support
- [ ] Web-based dashboard
- [ ] Custom email domains
- [ ] Auto-captcha solver
- [ ] Mobile app version
- [ ] API endpoint
- [ ] Docker support

---

<div align="center">
Made with ❤️ by <strong>lhuciver</strong> | CapCut Account Creator v2.0
</div>
