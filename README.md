# 🏡 Aghary – House Rental Platform

**Aghary** is a full-stack web application that simplifies house renting in Nouakchott, Mauritania. Whether you're looking for a home to rent or want to list your property, Aghary offers a smooth, intuitive experience tailored to your needs.

---

## 📌 Features

### 👤 Users
- View available house listings by location
- Contact the house owner directly via WhatsApp
- Filter listings by neighborhood
- Browse image galleries of homes

### 🧑‍💼 Authenticated Users (Owners)
- Sign up and log in securely (JWT-based auth)
- Upload house details with multiple images (via Cloudinary)
- Include WhatsApp contact for direct communication
- Submit listings for admin approval

### 🛠️ Admin Dashboard
- View all submitted listings
- Approve or reject listings

---

## 🛠️ Tech Stack

| Layer       | Technology               |
|------------|--------------------------|
| Frontend   | React.js (with Tailwind) |
| Backend    | Node.js + Express        |
| Database   | MongoDB (Mongoose)       |
| Auth       | JWT                      |
| File Upload| Cloudinary               |
| Deployment | Render (Backend), Netlify (Frontend) |

---

## 🗺️ Supported Locations in Nouakchott

Dar Naim, Teyarett, Toujouonine, Ksar, Sebkha, Tevragh Zeina, Arafat, El Mina, Riyadh, Elvelouja, Melah, Tarhil, Bouhdida, Tensweylm, Carefour, El Matar, Socogim, Soukouk, Premier, Ain Talh, Zaatar, Cinquième, Sixième.

---

## 🚀 Getting Started (Development)

### 📦 Backend Setup

```bash
cd backend
npm install
npm run dev
Create a .env file with:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
Update API endpoints in axios config to match your backend URL.

📂 Folder Structure
arduino
Copy
Edit
aghary/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
├── frontend/
│   ├── components/
│   ├── screens/
│   ├── assets/
│   └── utils/
🛡️ Security & Error Handling
All routes protected using JWT middleware

Backend uses try-catch for async error handling

User data is validated before saving

✅ To-Do
 Add user profile editing

 Enable post expiration/archiving

 Add multi-language support (Arabic / French)

 Add search by price or features (e.g. garden, parking)

📬 Contact
Developed with ❤️ by BROSTORNADO

📄 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Would you like me to include GitHub badges, demo screenshots, or deployment URLs too?
