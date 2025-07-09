

 **🔧 Collaborative Todo App - Backend**

This is the **backend** of a full-stack Todo app using **Node.js**, **Express**, **MongoDB**, and **Socket.io**.

🔗 **Frontend Repo**: https://github.com/sanjaynishnath/todo-frontend  
🔗 **Backend Deployment**: https://todo-backend-e14k.onrender.com
🔗 **Loom Video & Architecture**:[ https://todo-backend-e14k.onrender.com](https://drive.google.com/drive/folders/15VtBaiK3msXrZYsDYXu96OOTQ4z9wBTN?usp=sharing)

---

## ⚙️ Features

- 🔐 Google OAuth with session-based authentication
- ✅ REST API for task CRUD
- 📤 Share tasks with other users by username/email
- 📡 Real-time updates using **Socket.io**
- 🌍 CORS setup for frontend integration

---

## 🧪 Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Socket.io**
- **Google OAuth 2.0**
- **jsonwebtoken**
- **dotenv**

---

## 🛠️ Running Locally

**1. Clone the repo:**
   git clone https://github.com/sanjaynishnath/todo-backend.git
   cd todo-backend
**2.Install dependencies:**
   npm install
**3.Create .env:**
PORT=5000
MONGODB_URI=mongodb+srv://<your-uri>
CLIENT_URL=http://localhost:5173 #your frontend host
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback 

**4.Start the server:**
  npm run dev


**📝 Assumptions**
All tasks are owned by a user but can be shared to allow collaboration

Tasks can be viewed/edited by shared users but only deleted by owners

**🤖 This project is a part of a hackathon run by https://www.katomaran.com**
