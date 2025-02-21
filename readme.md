# 📌 Bookkeeping Automation Backend

## 🚀 Project Overview

This is the backend for the Bookkeeping Automation project, designed to manage bots that execute bookkeeping tasks asynchronously. It provides a **REST API** with real-time updates via **WebSockets** and background job scheduling using **Agenda.js**.

---

## 🛠️ Tech Stack

- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Agenda.js** - Job scheduling for task execution
- **WebSockets (ws)** - Real-time updates
- **Swagger** - API documentation

---

## 📦 Installation & Setup

### **1️⃣ Clone the repository**

git clone https://github.com/OleksiiMakoveiTeam/bookkeeping-be.git
cd backend

### **2️⃣ Install dependencies**

yarn

### **3️⃣ Setup environment variables**

Create a `.env.local` file in the root folder:
```
PORT=5000
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_HOST=
MONGO_DB_NAME=
MONGO_OPTIONS=
```
mongodb+srv://:@.mongodb.net/bookkeeping

### **4️⃣ Start the backend server**

yarn start
By default, the backend runs on `http://localhost:5000`.

---

## 📜 API Documentation

### **📖 OpenAPI (Swagger)**

Once the server is running, visit:
http://localhost:5000/api-docs

This provides a full API reference.

### **Endpoints Overview**

| Method   | Endpoint              | Description              |
| -------- | --------------------- | ------------------------ |
| `GET`    | `/api/bots`           | Get all bots             |
| `POST`   | `/api/bots`           | Create a bot             |
| `GET`    | `/api/bots/:id`       | Get bot by ID            |
| `DELETE` | `/api/bots/:id`       | Delete bot and its tasks |
| `GET`    | `/api/tasks`          | Get all tasks            |
| `POST`   | `/api/tasks`          | Create a task            |
| `PATCH`  | `/api/tasks/complete` | Mark a task as completed |

📌 **For detailed request/response schemas, check the Swagger UI (`/api-docs`).**

---

## 🔄 WebSocket Integration

WebSockets are used to **notify clients when a task is completed**.

### **WebSocket Connection**

- **Connect via**: `ws://localhost:8080` ideally also needs to be moved to env..
- **Events emitted**:
  - `TASK_COMPLETED`

### **WebSocket Implementation**

- Backend: `websocket.js`
- Frontend: RTK Query's `onCacheEntryAdded`

---

## ⏳ Background Task Scheduling (Agenda.js)

Tasks are scheduled and executed asynchronously using **Agenda.js**.

### **How It Works**

1. When a bot is created, it is assigned **two random tasks**.
2. Tasks are **scheduled** in `Agenda.js` with predefined durations.
3. Once a task is **executed**, it is marked **completed** in MongoDB.
4. WebSockets notify the **frontend** about the completion.

📄 **Key files:**

- `agenda.js` - Handles task execution
- `task.model.js` - Defines the Task schema
- `bot.model.js` - Stores bot-task relationships

---
