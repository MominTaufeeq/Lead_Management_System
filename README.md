# Mini Lead Management System

A full-stack **Lead Management System** built for an event company to manage leads/customers efficiently.

The application allows sales users to add, view, search, filter, edit, and delete leads. It also provides a dashboard with basic lead statistics and priority tracking.

---

## 🚀 Features

* Add new leads
* View all leads
* Edit existing leads
* Delete leads with confirmation
* Search leads by:

  * Name
  * Company
  * Mobile
  * Email
* Filter leads by:

  * Status
  * Category
* Lead priority:

  * Low
  * Medium
  * High
* Dashboard with lead statistics
* Follow-up date tracking
* Frontend validation
* Backend validation
* MySQL database
* REST-style PHP APIs
* PDO prepared statements
* JSON API responses
* HTTP status codes
* Responsive user interface
* Loading and error handling

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* Vite
* HTML5
* CSS3
* Fetch API

### Backend

* PHP
* PDO
* REST-style APIs
* JSON

### Database

* MySQL

---

## 🏗️ Project Architecture

text
React Frontend
      │
      │ Fetch API
      ▼
PHP REST-style APIs
      │
      │ PDO
      ▼
MySQL Database


---

## 📁 Project Structure

text
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
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── LeadForm.jsx
│   │   │   ├── LeadTable.jsx
│   │   │   ├── PriorityBadge.jsx
│   │   │   └── StatusBadge.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Leads.jsx
│   │   │
│   │   ├── services/
│   │   │   └── leadApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md


---

## 📋 Lead Fields

Each lead contains the following information:

| Field          | Description             |
| -------------- | ----------------------- |
| ID             | Unique lead ID          |
| Name           | Lead/customer name      |
| Company        | Company name            |
| Mobile         | 10-digit mobile number  |
| Email          | Email address           |
| Category       | Lead category           |
| Status         | Current lead status     |
| Follow-up Date | Planned follow-up date  |
| Priority       | Lead priority           |
| Created At     | Lead creation timestamp |
| Updated At     | Last update timestamp   |

---

## 📌 Categories

The application supports the following lead categories:

* Innerwear
* Sportswear
* Comfortwear
* Fabric
* Accessories
* OEM/ODM

---

## 📊 Lead Status

Available lead statuses:

* New
* Contacted
* Follow-up
* Converted
* Not Interested

---

## ⭐ Lead Priority

Each lead can have one of three priority levels:

* Low
* Medium
* High

Priority helps sales users identify leads that require more attention.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository


git clone YOUR_GITHUB_REPOSITORY_URL


Move into the project:


cd lead-management-system


---

# 🗄️ Database Setup

Make sure **MySQL** is installed and running.

Open MySQL/phpMyAdmin and execute:

text
backend/database/schema.sql


This will create:

text
lead_management


database and the:

text
leads


table.

---

## 🔐 Database Configuration

Open:

text
backend/config/database.php


Configure your MySQL credentials:

php
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


> Do not commit real production database passwords to GitHub.

---

# ▶️ Run the Backend

Open a terminal inside the `backend` directory:


cd backend


Start the PHP development server:


php -S localhost:8000


The backend will run at:
http://localhost:8000


---

# ▶️ Run the Frontend

Open another terminal:
cd frontend


Install dependencies:

npm install


Start the Vite development server:
npm run dev


The frontend will normally run at:
http://localhost:5173


Open the URL in your browser.

---

# 🔌 API Endpoints

The application uses PHP REST-style API endpoints.

| Method | Endpoint                    | Purpose        |
| ------ | --------------------------- | -------------- |
| GET    | `/api/get_leads.php`        | Get all leads  |
| POST   | `/api/add_lead.php`         | Add a new lead |
| PUT    | `/api/update_lead.php?id=1` | Update a lead  |
| DELETE | `/api/delete_lead.php?id=1` | Delete a lead  |

### Example

Get all leads:

GET http://localhost:8000/api/get_leads.php


Example response:

{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Rahul Sharma",
            "company": "ABC Textiles",
            "mobile": "9876543210",
            "email": "rahul@example.com",
            "category": "Sportswear",
            "status": "New",
            "follow_up_date": "2026-10-10",
            "priority": "High"
        }
    ]
}

---

# ✅ Validation

Validation is implemented on both frontend and backend.

### Name

* Required
* Minimum 2 characters
* Maximum 100 characters

### Company

* Required
* Minimum 2 characters
* Maximum 150 characters

### Mobile

* Required
* Valid 10-digit Indian mobile number

### Email

* Optional
* Must be a valid email when provided

### Category

Must be one of the predefined categories.

### Status

Must be one of the predefined statuses.

### Priority

Must be:


Low
Medium
High

---

# 🔒 Security Considerations

The backend uses **PDO prepared statements** for database queries to reduce the risk of SQL injection.

Example:

$stmt = $pdo->prepare(
    "INSERT INTO leads
    (name, company, mobile, email, category, status, follow_up_date, priority)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
);


Database credentials are kept in the backend and are not exposed to the React frontend.

---

# 🧩 Error Handling

The API uses appropriate HTTP status codes.

Examples:

200 - Successful request
201 - Lead successfully created
400 - Invalid request
404 - Lead not found
405 - Method not allowed
422 - Validation error
500 - Server error


API responses are returned in JSON format.

Example:

{
    "success": false,
    "message": "Invalid mobile number."
}


---

# 🎯 Creative Feature

## Lead Priority

A priority system was added to make the application more useful for sales teams.

Sales users can mark leads as:

High
Medium
Low

This helps salespeople quickly identify which leads should receive attention first.

---

# 📱 Responsive Design

The frontend is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The lead table and forms are designed to remain usable on smaller screens.

---

# 🧪 Testing Checklist

Before submitting the project, verify:

* [ ] MySQL database is running
* [ ] PHP backend starts successfully
* [ ] React frontend starts successfully
* [ ] Leads load from MySQL
* [ ] Dashboard statistics are displayed
* [ ] Search works
* [ ] Status filter works
* [ ] Category filter works
* [ ] New lead can be added
* [ ] Form validation works
* [ ] Existing lead can be edited
* [ ] Delete confirmation appears
* [ ] Lead can be deleted
* [ ] Deleted lead disappears from the table
* [ ] Database is updated correctly
* [ ] No major console errors
* [ ] README contains setup instructions

---

# 🔮 Future Improvements

Possible future enhancements include:

* User authentication and authorization
* Salesperson/user management
* Advanced dashboard charts
* Lead activity/history
* Email or WhatsApp follow-up reminders
* Pagination for large datasets
* Server-side search and filtering
* Export leads to CSV/Excel
* Deployment to a production server

---

# 📚 What I Learned

Through this project, I practiced:

* React component development
* React state management
* React forms
* API integration using Fetch
* PHP REST-style API development
* CRUD operations
* MySQL database design
* PDO prepared statements
* Frontend and backend validation
* JSON API responses
* HTTP status codes
* Error handling
* Responsive CSS
* Git and GitHub project management

---

# 👨‍💻 Author

**Taufeeq Momin**

Full Stack Developer | React | PHP | Laravel | MySQL




---

## 📄 License

This project was created as a Full Stack Developer assignment and learning project.


<img width="1917" height="1027" alt="Screenshot 2026-10-04 221258" src="https://github.com/user-attachments/assets/f89702a2-e810-4cc9-a831-0bd52f8be265" />
<img width="1917" height="923" alt="Screenshot 2026-10-04 221316" src="https://github.com/user-attachments/assets/bbcac8da-dc66-40db-a89b-5526aba63165" />
<img width="1905" height="927" alt="Screenshot 2026-10-04 221337" src="https://github.com/user-attachments/assets/d00bfe74-5600-4e27-8c7a-8e556bfeca40" />
<img width="1917" height="597" alt="Screenshot 2026-10-04 221421" src="https://github.com/user-attachments/assets/96952eb5-d815-4e63-85d9-f9308a52fefb" />
<img width="1917" height="862" alt="Screenshot 2026-10-04 221437" src="https://github.com/user-attachments/assets/08bd513a-ad46-4492-a6c2-2ca06a7bb2b9" />





