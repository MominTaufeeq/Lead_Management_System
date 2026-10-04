# Mini Lead Management System

A full-stack Mini Lead Management System built for an event company to manage leads/customers efficiently.

The application allows a sales person to add, view, search, filter, edit, and delete leads through a clean and responsive web interface.

---

## Features

### Lead Management

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
* Display lead priority
* Display follow-up dates

### Dashboard

The dashboard provides a quick overview of:

* Total Leads
* New Leads
* Follow-up Leads
* Converted Leads
* High Priority Leads

Dashboard information is calculated from the actual database records.

### Validation

Validation is implemented on both frontend and backend.

Frontend validation includes:

* Required fields
* Name length
* Company length
* Indian mobile number format
* Email format
* Category validation
* Status validation
* Priority validation
* Follow-up date validation

Backend validation ensures that invalid data cannot be inserted or updated by directly calling the PHP APIs.

### Delete Confirmation

Before deleting a lead, the application displays a confirmation modal.

This helps prevent accidental deletion of important lead information.

### Responsive UI

The interface is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile

---

## Technology Stack

### Frontend

* React
* JavaScript
* Vite
* HTML
* CSS
* Fetch API

### Backend

* PHP
* REST-style API
* PDO
* JSON

### Database

* MySQL

---

## Project Architecture

```text
React Frontend
      |
      | Fetch API
      ↓
PHP REST-style APIs
      |
      | PDO
      ↓
MySQL Database
```

The React frontend communicates with PHP APIs using JSON.

PHP uses PDO prepared statements to communicate securely with MySQL.

---

## Project Structure

```text
lead-management-system/
│
├── backend/
│   │
│   ├── api/
│   │   ├── add_lead.php
│   │   ├── delete_lead.php
│   │   ├── get_leads.php
│   │   └── update_lead.php
│   │
│   ├── config/
│   │   └── database.php
│   │
│   └── database/
│       └── schema.sql
│
├── frontend/
│   │
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
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Lead Fields

Each lead contains the following information:

| Field          | Description               |
| -------------- | ------------------------- |
| ID             | Unique lead ID            |
| Name           | Customer/contact name     |
| Company        | Company name              |
| Mobile         | Contact number            |
| Email          | Email address             |
| Category       | Product/business category |
| Status         | Current lead status       |
| Follow-up Date | Planned follow-up date    |
| Priority       | Lead priority             |
| Created At     | Record creation time      |
| Updated At     | Last update time          |

---

## Categories

The application supports the following categories:

* Innerwear
* Sportswear
* Comfortwear
* Fabric
* Accessories
* OEM/ODM

---

## Lead Statuses

Available lead statuses:

* New
* Contacted
* Follow-up
* Converted
* Not Interested

---

## Priority Levels

Available priorities:

* Low
* Medium
* High

Priority helps the sales person quickly identify leads that require more attention.

---

# Database Setup

## 1. Create the database

Open MySQL or phpMyAdmin.

Run the SQL script located at:

```text
backend/database/schema.sql
```

The script creates:

```text
lead_management
```

database and the:

```text
leads
```

table.

---

## 2. Configure database credentials

Open:

```text
backend/config/database.php
```

Update the following values according to your local MySQL setup:

```php
$host = 'localhost';
$dbname = 'lead_management';
$username = 'root';
$password = '';
```

Do not expose database credentials in the frontend.

---

# Running the Backend

Open a terminal in the backend directory:

```bash
cd backend
```

Start the PHP development server:

```bash
php -S localhost:8000
```

The backend API will be available at:

```text
http://localhost:8000
```

---

# Running the Frontend

Open another terminal and go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# API Endpoints

The application uses the following PHP APIs.

## Get Leads

```text
GET /api/get_leads.php
```

Returns all leads.

---

## Add Lead

```text
POST /api/add_lead.php
```

Creates a new lead.

Example request:

```json
{
    "name": "Amit Shah",
    "company": "XYZ Fashion",
    "mobile": "9876543211",
    "email": "amit@example.com",
    "category": "Fabric",
    "status": "New",
    "follow_up_date": "2026-10-15",
    "priority": "High"
}
```

---

## Update Lead

```text
PUT /api/update_lead.php?id=1
```

Updates an existing lead.

---

## Delete Lead

```text
DELETE /api/delete_lead.php?id=1
```

Deletes an existing lead.

The frontend displays a confirmation modal before sending the delete request.

---

# Security and Data Handling

The project uses PDO prepared statements for database operations.

Example:

```php
$stmt = $pdo->prepare(
    "DELETE FROM leads WHERE id = :id"
);
```

This helps prevent SQL injection.

Database credentials are stored only in the PHP backend and are not exposed to the React frontend.

The backend also validates incoming API data instead of relying only on frontend validation.

---

# Creative Feature

## Lead Priority

The application includes a lead priority system with three levels:

```text
Low
Medium
High
```

Priority is stored directly in the database and displayed in the lead table using visual badges.

The dashboard also shows the number of high-priority leads.

### Why this feature was added

In a real sales workflow, not every lead has the same level of importance.

A priority field allows the sales person to quickly identify leads that may require immediate attention or follow-up.

This makes the lead management system more practical than a basic CRUD application.

---

# Error Handling

The APIs return JSON responses and appropriate HTTP status codes.

Examples:

```text
200 - Successful request
201 - Lead created successfully
400 - Invalid request
404 - Lead not found
405 - Method not allowed
422 - Validation error
500 - Server/database error
```

The React application displays relevant error messages when API requests fail.

---

# Validation

The application validates lead information at two levels.

### Frontend

React checks the input before sending the API request.

### Backend

PHP validates the request again before performing database operations.

This prevents invalid or manipulated requests from directly inserting incorrect information into the database.

---

# Future Improvements

Possible future improvements include:

* User authentication
* Role-based access
* Pagination
* Advanced reporting
* Lead activity history
* Email notifications
* Follow-up reminders
* Dashboard charts
* Export leads to CSV/Excel
* Deployment to a production server

These features are outside the current assignment scope but could be added in a production version.

---

# Author

Developed as a Full Stack Developer assignment using React, PHP, and MySQL.