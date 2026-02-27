# CipherSQLStudio 🚀

**CipherSQLStudio** is a browser-based SQL learning platform designed for students to practice SQL queries against pre-configured assignments with real-time execution and intelligent AI-powered hints.

---

## ✨ Features

* **Assignment Listing:** View and select from a variety of SQL challenges.
* **Monaco Code Editor:** A professional, VS Code-style editor with syntax highlighting.
* **Real-time Execution:** Direct integration with PostgreSQL to see query results instantly.
* **AI Hint System:** Intelligent, logic-based guidance powered by Google Gemini (no direct answers).
* **Mobile-First Design:** Fully responsive UI built with Vanilla SCSS, variables, and mixins.

---
<img width="1026" height="572" alt="image" src="https://github.com/user-attachments/assets/e6556d89-03ed-4dbc-b51b-3187e4393e35" />
<img width="1038" height="613" alt="image" src="https://github.com/user-attachments/assets/8544fe6c-40ba-45b8-ac92-690061ed8bc1" />


## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js |
| **Styling** | Vanilla SCSS (Mobile-first) |
| **Editor** | Monaco Editor |
| **Backend** | Node.js / Express.js |
| **Database** | PostgreSQL |
| **AI Integration** | Google Gemini API |

---

## 🚀 Installation & Setup

### 1. Prerequisites
* Node.js installed
* PostgreSQL installed and running
* A Google Gemini API Key

### 2. Backend Setup
1. Navigate to the server folder: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your credentials:
   ```env
   DB_USER=postgres
   DB_PASSWORD=admin
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=CipherSQL
