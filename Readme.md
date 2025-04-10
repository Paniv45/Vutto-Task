# 🏍️ Bike Listings Web App

A MERN stack web application to manage and explore a collection of bikes. Users can add, view, edit, delete, and shortlist bikes. It also includes filtering functionality by **brand** and **year**.

---

## 🚀 Features

- View a list of all available bikes
- Filter bikes by **brand** and **year**
- View detailed bike info
- Edit or delete existing bikes
- Shortlist/unshortlist bikes
- Add new bikes via a dedicated form

---

## 🧑‍💻 Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Styling**: Custom CSS

---

## 🛠️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Vutto-Task.git
cd Vutto-Task
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Set Up Environment Variables
Create a .env file inside the backend folder:
```bash
PORT=5000
MONGO_URI=<your-mongodb-uri>
```

### 5. Run the Backend Server
```bash
cd backend
npm start
```
This should start the backend on: http://localhost:5000

### 6. Run the Frontend React App
```bash
cd ../frontend
npm start
```
This should start the frontend on: http://localhost:3000

## 📝 Assumptions & Notes
- Filters are case-insensitive and allow partial matching

- Shortlisting is handled using a boolean shortlisted field in the DB

- Editing and deleting are allowed from the bike details page

- No user authentication is implemented

- The backend is assumed to run on port 5000 by default



## 🧑‍💼 Author
- Made with 💙 by Paniv Kapoor

- Emaii: Kapoorpaniv45@gmail.com