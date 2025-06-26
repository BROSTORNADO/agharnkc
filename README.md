# 🏡 Aghary – House Rental Platform

**Aghary** is a full-stack house rental web application designed for users in **Nouakchott, Mauritania**. It connects renters with property owners and simplifies the housing search process with a location-based, user-friendly interface.

---

## 📌 Features

### 👤 Normal Users
- 🏘️ Browse available house listings
- 📍 Filter by location (e.g. Ksar, Arafat, Riyadh)
- 📷 View image galleries
- 💬 Contact owners directly via WhatsApp

### 🧑‍💼 Authenticated Users (Property Owners)
- 🔐 Register/Login with JWT auth
- 🏠 Post rental listings
- 📸 Upload multiple house images via Cloudinary
- 📱 Include WhatsApp number for inquiries

### 🛠️ Admin
- ✅ Approve or decline posted listings

---

## 🛠 Tech Stack

| Layer       | Technology               |
|-------------|--------------------------|
| Frontend    | React (with Tailwind CSS)|
| Backend     | Node.js + Express        |
| Database    | MongoDB (with Mongoose)  |
| Auth        | JWT                      |
| Image Upload| Cloudinary               |
| Deployment  | Netlify (Frontend), Render (Backend) |

---

## 🌍 Supported Locations in Nouakchott

Dar Naim, Teyarett, Toujouonine, Ksar, Sebkha, Tevragh Zeina, Arafat, El Mina, Riyadh, Elvelouja, Melah, Tarhil, Bouhdida, Tensweylm, Carefour, El Matar, Socogim, Soukouk, Premier, Ain Talh, Zaatar, Cinquième, Sixième.

---

## 🚀 Getting Started

### 📦 Backend Setup

```bash
cd backend
npm install
npm run dev
