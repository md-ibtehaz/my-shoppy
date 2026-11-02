# 03. Setup, Run & Commands Guide 💻⚙️

Yeh document **MyShoppy** project ko setup karne, alag-alag devices par run karne, aur saari useful commands ko simple shabdon mein explain karta hai.

---

## 1. System Requirements (Pehle Se Kya Chahiye?)

1. **Node.js**: Version 18 ya usse upar (Recommended: LTS).
2. **Git**: Code clone aur version control ke liye.
3. **Android Studio** *(Agar Android Emulator use karna hai)*.
4. **Physical Phone** *(Agar real mobile par test karna hai via Expo Go)*.

---

## 2. Project Ko Run Karne Ke 3 Aasan Tareeqe

Aap apni suvidha ke hisab se inme se koi bhi tareeqa chun sakte hain:

### Tareeqa A: Web Browser Mein Chalayein (Sabse Fast & Zero-Lag) 🌐
Agar aapke paas emulator open nahi hai ya jaldi check karna hai:
1. Terminal mein project folder par jayein:
   ```bash
   cd C:\MyShoppy_ReactNative\MyShoppy
   ```
2. Command run karein:
   ```bash
   npm run web
   ```
3. Aapka default browser (Chrome/Edge) turant `http://localhost:8081` par open ho jayega aur app chalne lagega!

---

### Tareeqa B: Android Emulator Mein Chalayein (Mobile Experience) 📱
Agar aap Android Studio ka Virtual Device use kar rahe hain:
1. **Android Studio** open karke apna emulator (**Small_Phone**) start karein.
   > **Pro Tip**: Agar emulator pehle kabhi atka ho, toh Device Manager mein 3 dots (⋮) par click karke **"Cold Boot Now"** karein taaki purani freeze memory clean ho jaye.
2. Terminal mein command chalayein:
   ```bash
   npm run android
   ```
3. Yeh command automatically:
   - Cache clear karegi (`-c`)
   - Direct localhost bridge se connect karegi (`--localhost`)
   - Aur emulator ke andar MyShoppy app launch kar degi!

---

### Tareeqa C: Apne Asli Phone Mein Chalayein (Physical Phone) 📲
1. Apne phone mein **Expo Go** app download karein:
   - Android: Google Play Store
   - iPhone: Apple App Store
2. Make sure karein ki aapka phone aur computer **same Wi-Fi network** se jude hon.
3. Terminal mein run karein:
   ```bash
   npm run start:lan
   ```
4. Terminal mein ek bada **QR Code** aayega:
   - **Android**: Expo Go app kholkar "Scan QR code" par tap karein.
   - **iPhone**: Phone ka Camera open karke QR code par point karein aur notification banner par tap karein.

---

## 3. Sabhi Commands Ka Meaning & Use (`package.json`)

| Command | Kaam (Kya Karti Hai) |
| :--- | :--- |
| `npm run android` | Emulator ke liye best command. Yeh `--localhost` aur cache clear (`-c`) ke sath app start karke emulator mein open karti hai. |
| `npm run web` | App ko seedhe Google Chrome ya default browser mein open karti hai. |
| `npm run start:lan` | LAN / Wi-Fi mode mein Expo start karti hai taaki physical phone se QR scan karke chalaya ja sake. |
| `npm start` | Localhost mode mein Metro dev server ko start karti hai. |
| `npx expo-doctor` | Pura project scan karti hai aur check karti hai ki saare packages compatible hain ya nahi (Currently 20/20 checks passed). |
| `npx expo install <pkg>` | Kisi bhi naye package ko Expo ke version ke sath compatible install karti hai. |

---

## 4. Terminal Ke Keyboard Shortcuts

Jab terminal mein Metro bundler chal raha ho, toh aap yeh keys press kar sakte hain:

- **`r`** : App ko instant **Reload** karne ke liye (Code changes dekhne ke liye).
- **`m`** : Developer menu toggle karne ke liye (Inspector, Performance monitor).
- **`a`** : Connected Android emulator par app open karne ke liye.
- **`w`** : Web browser mein app open karne ke liye.
- **`c`** : Console logs clear karne ke liye.
- **`Ctrl + C`** : Development server ko stop/band karne ke liye.

---

## 5. Troubleshooting (Agar Koi Dikkat Aaye Toh Kya Karein?)

### Problem 1: Emulator par "Reloading..." ya "Checking for new update... 51%" par atak jana
- **Kyun hota hai**: Android Studio ka network simulator (`netsimd`) background mein crash ho gaya tha aur purana corrupted RAM snapshot load ho gaya.
- **Fix**: 
  1. Android Studio open karein.
  2. Device Manager mein apne phone ke 3 dots (⋮) par click karein.
  3. **"Cold Boot Now"** par click karein.
  4. Terminal mein `npm run android` run karein.

### Problem 2: Port 8081 already in use error
- **Kyun hota hai**: Pehle se koi purani node process background mein chal rahi hai.
- **Fix**: PowerShell mein yeh command chala kar purana port free karein:
  ```powershell
  Stop-Process -Name node -Force
  ```
  Aur phir dobara `npm run android` ya `npm run web` chalayein.

### Problem 3: Cache clean karna ho
- Seedhe run karein:
  ```bash
  npx expo start -c
  ```
