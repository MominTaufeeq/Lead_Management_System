# Mini Lead Management System

A simple **Lead Management System** built for an event company.

This application helps a sales person manage leads in one place. They can add, view, search, filter, edit, and delete leads.

---

## 🚀 Features

* Add new leads
* View all leads
* Edit leads
* Delete leads
* Search leads
* Filter leads by status
* Filter leads by category
* Set lead priority
* Track follow-up dates
* Dashboard with lead statistics
* Form validation
* Delete confirmation
* Responsive design

---

## 🛠️ Technologies Used

### Frontend

* React
* JavaScript
* Vite
* HTML
* CSS
* Fetch API

### Backend

* PHP
* PDO
* REST-style APIs
* JSON

### Database

* MySQL

### Local Server

* XAMPP

---

## 📁 Project Structure

```text
lead-management-system/
│
├── backend/
│   ├── api/
│   │   ├── get_leads.php
│   │   ├── add_lead.php
│   │   ├── update_lead.php
│   │   └── delete_lead.php
│   │
│   ├── config/
│   │   └── database.php
│   │
│   └── database/
│       └── schema.sql
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ How to Run the Project

## 1. Install XAMPP

Install **XAMPP** on your computer.

Open the XAMPP Control Panel and start:

```text
Apache
MySQL
```

---

## 2. Create the Database

Open:

```text
http://localhost/phpmyadmin
```

Create the database using the SQL file:

```text
backend/database/schema.sql
```

The database name is:

```text
lead_management
```

The main table is:

```text
leads
```

---

## 3. Configure Database Connection

Open:

```text
backend/config/database.php
```

The default XAMPP MySQL settings are:

```php
<?php

$host = 'localhost';
$dbname = 'lead_management';
$username = 'root';
$password = '';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    die("Database connection failed.");
}
```

If your XAMPP MySQL password is different, update the `$password` value.

---

# ▶️ Start the Backend

Open a terminal in the `backend` folder:

```bash
cd backend
```

Start the PHP server:

```bash
php -S localhost:8000
```

The backend API will run at:

```text
http://localhost:8000
```

For example:

```text
http://localhost:8000/api/get_leads.php
```

---

# ▶️ Start the Frontend

Open another terminal in the `frontend` folder:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
```

Start React:

```bash
npm run dev
```

Vite will show a URL similar to:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# 🔌 API Endpoints

| Method | API                         | Purpose       |
| ------ | --------------------------- | ------------- |
| GET    | `/api/get_leads.php`        | Get all leads |
| POST   | `/api/add_lead.php`         | Add a lead    |
| PUT    | `/api/update_lead.php?id=1` | Update a lead |
| DELETE | `/api/delete_lead.php?id=1` | Delete a lead |

---

# 📋 Lead Information

Each lead contains:

* Name
* Company
* Mobile
* Email
* Category
* Status
* Follow-up Date
* Priority

---

# 📌 Categories

The available categories are:

* Innerwear
* Sportswear
* Comfortwear
* Fabric
* Accessories
* OEM/ODM

---

# 📊 Lead Status

The available statuses are:

* New
* Contacted
* Follow-up
* Converted
* Not Interested

---

# ⭐ Lead Priority

Each lead can have:

* Low
* Medium
* High

Priority helps the sales person understand which leads need more attention.

---

# 🔎 Search and Filter

Users can search leads using:

* Name
* Company
* Mobile
* Email

Users can also filter leads by:

* Status
* Category

---

# ✅ Validation

The application has validation on both frontend and backend.

For example:

* Name is required
* Company is required
* Mobile number must be valid
* Email must be valid if provided
* Category must be selected
* Status must be selected
* Priority must be selected

This helps prevent incorrect data from being saved.

---

# 🔒 Security

The backend uses **PDO prepared statements** for database queries.

This helps protect the application from SQL injection.

Database credentials are kept in the backend and are not used in the React frontend.

---

# 🧪 Testing

Before submitting the project, I tested:

* Add lead
* View leads
* Edit lead
* Delete lead
* Search
* Status filter
* Category filter
* Form validation
* Dashboard statistics
* Database operations
* API responses

---

# 💡 If I Had 3 More Days

If I had 3 more days, I would improve the application in these areas:

### 1. Login and User Roles

I would add login functionality for sales persons and administrators.

**Why:** It would make the application safer and allow different users to have different access.

### 2. Better Dashboard

I would add charts for:

* Leads by status
* Leads by category
* Converted leads
* High-priority leads
* Follow-ups

**Why:** Charts would help the sales team understand their leads quickly.

### 3. Follow-up Reminders

I would add reminders for upcoming follow-ups and keep a history of activities for each lead.

**Why:** This would help sales persons remember to contact customers on time and avoid missing potential leads.

I would focus on these improvements because they would make the application more useful in a real business environment.

---

# 📚 What I Learned

While building this project, I learned and practiced:

* React
* JavaScript
* PHP
* MySQL
* CRUD operations
* REST APIs
* Fetch API
* PDO
* Form validation
* JSON
* HTTP status codes
* Database operations
* Responsive CSS
* Git and GitHub

---

# 👨‍💻 Author

**Taufeeq Momin**

Full Stack Developer

Technologies: React | JavaScript | PHP | MySQL | Laravel

---

## 📄 Project Purpose

This project was created as a **Full Stack Developer assignment** to demonstrate frontend, backend, database, API, and CRUD development skills.



<img width="1917" height="1027" alt="Screenshot 2026-10-04 221258" src="https://github.com/user-attachments/assets/f89702a2-e810-4cc9-a831-0bd52f8be265" />
<img width="1917" height="923" alt="Screenshot 2026-10-04 221316" src="https://github.com/user-attachments/assets/bbcac8da-dc66-40db-a89b-5526aba63165" />
<img width="1905" height="927" alt="Screenshot 2026-10-04 221337" src="https://github.com/user-attachments/assets/d00bfe74-5600-4e27-8c7a-8e556bfeca40" />
<img width="1917" height="597" alt="Screenshot 2026-10-04 221421" src="https://github.com/user-attachments/assets/96952eb5-d815-4e63-85d9-f9308a52fefb" />
<img width="1917" height="862" alt="Screenshot 2026-10-04 221437" src="https://github.com/user-attachments/assets/08bd513a-ad46-4492-a6c2-2ca06a7bb2b9" />





