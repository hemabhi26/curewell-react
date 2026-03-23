# 🏥 CureWell - Hospital Management System

CureWell is a full-stack **Hospital Management Web Application** built using **React, Node.js, and SQLite**. It helps hospital administrators manage doctors, specializations, and surgeries efficiently.

---

## 🚀 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js + Express.js
* **Database:** SQLite
* **Styling:** CSS

---

## 📌 Features

### 👨‍⚕️ Doctor Management

* View all doctors
* Add a new doctor with specialization
* Update doctor details
* Delete a doctor
* Filter doctors by specialization

### 🧬 Specialization Management

* View all specializations
* View doctors under a specific specialization

### 🏥 Surgery Management

* View today's surgeries
* Add new surgery
* Update surgery timings
* Validation: Start time must be less than end time

---

## 📂 Project Structure

```
curewell/
│── src/
│   ├── components/
│   ├── services/
│   ├── App.js
│   ├── index.js
│   └── index.css

curewell-backend/
│── src/
│   ├── config/
│   ├── api/
│   │   ├── models/
│   │   ├── controllers/
│   │   └── routes/
│── server.js
│── curewell.db
```

---

## 🗄️ Database

* SQLite database (`curewell.db`) is created automatically
* No installation required

### Tables:

* Doctor
* Specialization
* DoctorSpecialization
* Surgery

---

## 🔗 API Endpoints

### 👨‍⚕️ Doctors

* `GET /api/doctors` → Get all doctors
* `POST /api/doctors` → Add doctor
* `PUT /api/doctors` → Update doctor
* `DELETE /api/doctors?doctorId=ID` → Delete doctor
* `GET /api/doctors/by-specialization?specializationCode=CODE`

### 🧬 Specializations

* `GET /api/specializations`

### 🏥 Surgeries

* `GET /api/surgeries/today`
* `POST /api/surgeries`
* `PUT /api/surgeries`

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd curewell-backend
npm install
node server.js
```

Runs on: **[http://localhost:5000](http://localhost:5000)**

---

### 🔹 Frontend Setup

```bash
cd curewell
npm install
npm start
```

Runs on: **[http://localhost:3000](http://localhost:3000)**

---

## 🔄 Application Flow

```
React (Frontend)
   ↓
API Calls (services/api.js)
   ↓
Express Routes
   ↓
Controllers
   ↓
Models (SQL Queries)
   ↓
SQLite Database
```

---

## ⏱️ Surgery Time Handling

* Stored as **total minutes** in database
* Converted to **HH:MM format** in UI

| Time  | Stored Value |
| ----- | ------------ |
| 09:00 | 540          |
| 14:00 | 840          |

---

## 🧪 Sample Data

### Doctors

* 1001 - Albert
* 1002 - Olivia
* 1003 - Susan

### Specializations

* GYN - Gynecologist
* CAR - Cardiologist
* ANE - Anesthesiologist

---

## 📊 Viewing Data

* Open in browser:

  * [http://localhost:5000/api/doctors](http://localhost:5000/api/doctors)
  * [http://localhost:5000/api/specializations](http://localhost:5000/api/specializations)
  * [http://localhost:5000/api/surgeries/today](http://localhost:5000/api/surgeries/today)

* Or use:

  * DB Browser for SQLite
  * VS Code SQLite extension

---

## ⚠️ Important Notes

* Database auto-creates on first run
* Deleting DB resets all data
* Backend & frontend must run together
* Ports:

  * Frontend → 3000
  * Backend → 5000

---

## 🚀 Future Improvements

* Authentication (Login/Register)
* Role-based access
* Better UI/UX
* Deployment

---

## 👨‍💻 Author

**Hemanth Abhinav**
