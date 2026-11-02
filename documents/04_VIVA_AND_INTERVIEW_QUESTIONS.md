# 04. Viva & Interview Questions Guide 🎓💬

Yeh document aapke **College Viva**, **Project Presentation**, ya **Technical Interview** ke liye banaya gaya hai. Interviewer ya professor aamtaur par jo questions puchte hain, unke sabse behtareen aur impressive answers yahan simple Roman English mein diye gaye hain.

---

### Q1. Aapka project kya hai aur iska main objective kya hai?
**Answer**:
> *"Sir/Ma'am, yeh **MyShoppy** ek cross-platform mobile shopping application hai jo React Native aur Expo par bani hai. Iska main objective users ko ek smooth, clean aur distraction-free shopping experience dena hai. Isme category-based browsing, real-time product search, interactive add-to-cart workflow, aur persistent recent order tracking system implement kiya gaya hai."*

---

### Q2. Aapne React Native kyun choose kiya, Native Android (Java/Kotlin) kyun nahi?
**Answer**:
> *"Sir, agar hum Java ya Kotlin use karte toh hume Android ke liye alag code likhna padta aur iOS ke liye Swift/Objective-C alag likhni padti (Dual Codebase). React Native ka sabse bada fayda **'Single Codebase, Multi-Platform'** hai. Ek hi JavaScript/React code likh kar humara app Android, iOS aur Web teeno par bina kisi change ke natively run karta hai, jisse development time aur cost 50% tak kam ho jati hai."*

---

### Q3. Expo kya hai aur bare React Native se yeh kaise alag hai?
**Answer**:
> *"Expo ek powerful framework aur ecosystem hai jo React Native ke upar kaam karta hai. Bare React Native mein Android Studio aur Xcode ki heavy native files configure karni padti hain jo beginners ke liye complex hoti hain. Expo hume ready-to-use tools deta hai jaise pre-configured build systems, vector icons, font loaders, aur Expo Go app jisse hum physical phone par bina USB cable ke QR code scan karke app live test kar sakte hain."*

---

### Q4. App mein Navigation kaise implement ki gayi hai?
**Answer**:
> *"Humein app mein do tarah ki navigation ki zarurat thi:
> 1. **Bottom Tab Navigator**: Yeh screen ke niche 3 main tabs deta hai — Home, Categories, aur Cart. Isme live Cart Badge bhi integrate kiya gaya hai.
> 2. **Native Stack Navigator**: Jab user Categories page par kisi specific category par tap karta hai, toh stack navigator smoothly use us category ke product page par push karta hai aur upar back button provide karta hai.
> Dono ko React Navigation library ke through synchronize kiya gaya hai."*

---

### Q5. State Management ke liye aapne kya use kiya? Redux kyun nahi use kiya?
**Answer**:
> *"Sir, humne React ka in-built **Context API** (`CartContext.js`) use kiya hai. Redux bade enterprise applications ke liye achha hai jahan 50+ screens hoti hain, lekin ek medium e-commerce app ke liye Redux bohot zyada boilerplate code aur unnecessary complexity create karta hai. Context API lightweight hai, React ke core ka part hai, aur humare cart state, order placement, aur quantity management ko cleanly handle karta hai bina app ko heavy banaye."*

---

### Q6. App band hone ke baad Cart aur Orders ka data kaise save rehta hai?
**Answer**:
> *"Humne **`@react-native-async-storage/async-storage`** use kiya hai, jo phone ka local key-value storage system hai (Web ke LocalStorage ki tarah). 
> Jab bhi user koi item cart mein add karta hai ya order place karta hai, humara `CartContext` us data ko JSON string format mein save kar deta hai (`@shopy_cart` aur `@shopy_orders`). App dobara launch hote hi `useEffect` hook us data ko automatically memory mein restore kar deta hai."*

---

### Q7. `ScrollView` aur `FlatList` mein kya farak hai? Products ke liye FlatList kyun use kiya?
**Answer**:
> *"Yeh performance ka sabse critical point hai:
> - **ScrollView**: Screen par 100 items hon toh 100 ke 100 ek sath render kar deta hai, jisse mobile ka RAM full ho jata hai aur app lag karne lagta hai.
> - **FlatList**: Yeh **Lazy Loading / Virtualization** use karta hai. Jo items screen par currently visible hote hain sirf wahi memory mein render hote hain. Jaise user scroll karta hai, naye items load hote hain aur purane unload hote hain. Isliye products grid ke liye FlatList best practice hai."*

---

### Q8. "Recent Orders" feature ka technical data flow samjhaiye.
**Answer**:
> *"Jab user Cart screen par **'Place Order'** par tap karta hai:
> 1. `placeOrder()` function trigger hota hai.
> 2. Yeh ek unique transaction ID generate karta hai (e.g. `TXN-35019478`) aur current system timestamp attach karta hai.
> 3. Cart ke saare items aur total price ko ek new order object bana kar `orders` state ke starting mein add (`prepend`) kar deta hai.
> 4. Cart automatically clear ho jati hai.
> 5. Yeh order `AsyncStorage` mein persist ho jata hai aur screen ke niche Recent Orders section mein dynamically render ho jata hai."*

---

### Q9. Metro Bundler kya hota hai aur port 8081 ka kya role hai?
**Answer**:
> *"Metro React Native ka official JavaScript bundler hai (jaise Web mein Webpack ya Vite hota hai). Iska kaam saari JavaScript files, JSON data, aur assets ko ek single optimized `.bundle` file mein compile karna hota hai. Yeh port 8081 par local HTTP server start karta hai jisse Android Emulator ya Expo Go live app code fetch karta hai."*

---

### Q10. UI/UX ko modern aur professional banane ke liye kya khas kiya gaya hai?
**Answer**:
> *"Humne AI-generated clichés (jaise over-the-top neon glowing gradients ya unnecessary micro-animations) ko avoid kiya hai:
> 1. **Centralized Design System** (`theme.js`): Single cohesive palette (Deep Slate `#0F172A`, Deep Teal `#0D9488`, Neutral soft canvas `#F8FAFC`).
> 2. **Vector Icons**: Raw emojis ki jagah professional `@expo/vector-icons` use kiye hain jo har mobile par pixel-perfect dikhte hain.
> 3. **Non-blocking Feedback**: Add to Cart par annoying native `Alert.alert` dialogs ki jagah ek custom informative popup modal banaya gaya hai.
> 4. **Image Background Tiles**: Categories ko full-bleed imagery aur subtle scrim overlay ke sath present kiya gaya hai for rich visual appeal."*

---

### Q11. Is project ka future scope aur scalability kya ho sakti hai?
**Answer**:
> *"Sir, current architecture bohot modular hai, isme future mein yeh features easily add ho sakte hain:
> 1. **Backend & Database**: Firebase ya Node.js/Express + MongoDB REST API connect karke real cloud database integrate karna.
> 2. **Payment Gateway**: Razorpay ya Stripe SDK integrate karke live UPI/Card payments accept karna.
> 3. **User Authentication**: Google/Email login aur JWT tokens ke through personalized user accounts.
> 4. **Push Notifications**: Expo Notifications service ke zariye order delivery status ke live alerts bhejna."*
