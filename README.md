# 🌑 SPHYNX BLACK
### Ancient Future. Minimalist Luxury E-Commerce.

![License](https://img.shields.io/badge/license-MIT-C5A059.svg?style=flat-square)
![React](https://img.shields.io/badge/frontend-React_Vite-61DAFB.svg?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/backend-Node_Express-339933.svg?style=flat-square&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248.svg?style=flat-square&logo=mongodb)
![Tailwind](https://img.shields.io/badge/style-Tailwind_CSS-38B2AC.svg?style=flat-square&logo=tailwindcss)

**SPHYNX BLACK** is a high-fidelity fashion e-commerce platform designed to bridge the gap between "shadow and form." It features a cinematic user experience, a robust administration portal, and a seamless shopping journey built with the MERN stack.

---

## 📖 Table of Contents
- [🏛 The Philosophy](#-the-philosophy)
- [✨ Key Features](#-key-features)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Live Demo](#-live-demo)
- [📁 Project Structure](#-project-structure)
- [💻 Installation & Setup](#-installation--setup)
- [🔑 Environment Variables](#-environment-variables)
- [🛡 Admin Portal](#-admin-portal)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🏛 The Philosophy

> "We exist in the space between shadow and form. Luxury is not excess, it is restraint."

SPHYNX BLACK rejects the noise of modern e-commerce. The design language focuses on:
* **Immersive UX:** Smooth scrolling, parallax effects, and film grain overlays.
* **Minimalist UI:** High contrast (Black/Gold), custom typography, and negative space.
* **Performance:** Optimized assets and fluid transitions using Framer Motion.

---

## ✨ Key Features

### 🛍 For Customers (Frontend)
* **Cinematic Home:** Infinite loop hero sliders and editorial-style layouts.
* **Advanced Shop:**
  * Filter by Category (Gentlemen, Ladies, Artifacts).
  * Sort by Price, Newest, or Featured.
  * Live Search Overlay with debounced API calls.
* **Product Detail:** Deep zoom gallery, accordion specifications, and stock status indicators.
* **Cart System:** Persistent Redux-based cart with real-time tax & shipping calculation.
* **User Profile:**
  * Order history tracking with status updates.
  * Address book management.
  * Security settings (Password update).
* **Checkout:** Secure, multi-step checkout process with guest protection.

### 🛡 For Administrators (Backend)
* **Dashboard:** Real-time analytics (Revenue, Orders, User count) with visual data cards.
* **Product Management:**
  * Create, Edit, and Delete products.
  * **Cloudinary Integration:** Drag-and-drop image uploads.
  * Inventory tracking and "Low Stock" alerts.
* **Order Control:** Monitor orders, view details, and mark as **Shipped/Delivered**.
* **User Management:** View registered users and manage access roles.
* **Store Settings:** Toggle **Maintenance Mode**, update currency, and email preferences.

---

## 🛠 Tech Stack

### **Frontend** (`/frontend`)
* **Core:** React.js (Vite), JavaScript (ES6+).
* **State Management:** Redux Toolkit (Auth & Cart slices).
* **Styling:** Tailwind CSS, Custom Fonts (Inter, Playfair Display).
* **Animation:** Framer Motion, Swiper.js.
* **Routing:** React Router DOM v6.
* **HTTP:** Axios with Interceptors (JWT handling).
* **Notifications:** React Hot Toast.

### **Backend** (`/backend`)
* **Runtime:** Node.js.
* **Framework:** Express.js.
* **Database:** MongoDB (Mongoose ODM).
* **Authentication:** JWT (JSON Web Tokens), BCrypt encryption.
* **Storage:** Cloudinary (Cloud storage for images), Multer.

---

## 🚀 Live Demo

* **Frontend (Vercel):** https://sphinx-black.vercel.app  
* **Backend (Render):** https://sphinx-black.onrender.com

---

## 📁 Project Structure

```text
SPHINX-BLACK/
├─ backend/                # Node.js + Express API
│  ├─ src/                 # Backend source (routes, controllers, models, middleware)
│  ├─ package.json
│  └─ .env                 # Backend environment variables (not committed)
│
├─ frontend/               # React (Vite) client
│  ├─ src/                 # Components, pages, redux store/slices, hooks, utils
│  ├─ public/              # Static assets
│  ├─ package.json
│  └─ .env                 # Frontend environment variables (not committed)
│
├─ README.md
└─ LICENSE
```

> Note: Folder names and internal structure may vary slightly depending on how you organize routes/components. The main split is `/frontend` for the client and `/backend` for the API.

---

## 💻 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/perera99-msd/SPHINX-BLACK.git
cd SPHINX-BLACK
```

### 2. Backend Setup
```bash
cd backend
npm install

# Start Server
npm run dev
```

Create a `.env` file in the `/backend` folder (see **Environment Variables** below).

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start React App
npm run dev
```

Create a `.env` file in the `/frontend` folder (see **Environment Variables** below).

---

## 🔑 Environment Variables

### Backend (`/backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### Frontend (`/frontend/.env`)
```env
VITE_SERVER_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api
```

---

## 🛡 Admin Portal

To access the Admin Dashboard:

1. Register a new account on the frontend.
2. Manually update the user role to `admin` in your MongoDB database.
3. Login via the dedicated Admin route:

**URL:** `/admin/login`

---

## 🤝 Contributing

Contributions are welcome to the SPHYNX codebase. Please follow the standard fork-and-pull request workflow.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Designed in Sri Lanka. Est. MMXV
