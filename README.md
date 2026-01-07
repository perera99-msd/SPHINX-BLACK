# 🌑 SPHYNX BLACK
### Ancient Future. Minimalist Luxury E-Commerce.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React_Vite-61DAFB.svg)
![Node](https://img.shields.io/badge/backend-Node_Express-339933.svg)
![Style](https://img.shields.io/badge/style-Tailwind_CSS-38B2AC.svg)

**SPHYNX BLACK** is a high-fidelity, luxury fashion e-commerce platform designed to bridge the gap between "shadow and form." It features a cinematic user experience, a robust administration portal, and a seamless shopping journey built with modern web technologies.

---

## 📖 Table of Contents
- [The Philosophy](#-the-philosophy)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Admin Portal](#-admin-portal)
- [Contributing](#-contributing)

---

## 🏛 The Philosophy

> "We exist in the space between shadow and form. Luxury is not excess, it is restraint."

SPHYNX BLACK rejects the noise of modern e-commerce. The design language focuses on:
* **Immersive UX:** Smooth scrolling, parallax effects, and film grain overlays.
* **Minimalist UI:** High contrast (Black/Gold), custom typography, and negative space.
* **Performance:** Optimized assets and fluid transitions using Framer Motion.

---

## ✨ Key Features

### 🛍 For Customers
* **Cinematic Home:** Infinite loop hero sliders and editorial-style layouts.
* **Advanced Shop:** Filter by category, sort by price/date, and live search overlay.
* **Product Detail:** Deep zoom, accordion specifications, and stock status indicators.
* **Cart System:** Persistent Redux-based cart with real-time tax/shipping calculation.
* **User Profile:** Order history tracking, address management, and security settings.

### 🛡 For Administrators
* **Dashboard:** Real-time analytics (Revenue, Orders, User count) with graphical stats.
* **Product Management:** Create, edit, and delete products with drag-and-drop image uploads.
* **Order Control:** Monitor order status, payments, and fulfillment.
* **User Management:** View registered users and manage roles.
* **Settings:** Toggle maintenance mode, update store currency, and security protocols.

---

## 🛠 Tech Stack

### Frontend (`/frontend`)
* **Core:** React.js (Vite), JavaScript (ES6+).
* **State Management:** Redux Toolkit (Auth & Cart slices).
* **Styling:** Tailwind CSS, Custom Fonts (Inter, Playfair Display).
* **Animation:** Framer Motion, Swiper.js.
* **Routing:** React Router DOM v6.
* **HTTP:** Axios with Interceptors (JWT handling).
* **Icons:** Lucide React.

### Backend (`/backend`)
* **Runtime:** Node.js.
* **Framework:** Express.js.
* **Database:** MongoDB (Mongoose ODM).
* **Auth:** JWT (JSON Web Tokens), BCrypt.
* **Storage:** Multer (Local/Cloud storage for images).

---

## 📂 Project Structure

```bash
SPHYNX-BLACK/
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route pages (Shop, Admin, Home)
│   │   ├── redux/      # State management stores
│   │   ├── utils/      # Axios config & helpers
│   │   └── styles/     # Global CSS & Tailwind config
│   └── public/         # Static assets
│
├── backend/            # Node/Express API
│   ├── controllers/    # Route logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   └── uploads/        # Image storage
│
├── images/             # Project screenshots/design assets
└── .gitignore          # Git configuration