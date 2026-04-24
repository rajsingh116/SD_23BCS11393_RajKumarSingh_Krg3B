# # 🚗 Vehicle Service Booking System

A **Full-Stack Web Application** for managing vehicle service appointments efficiently.  
It provides a platform for **customers**, **admins**, and **mechanics** to collaborate in handling vehicle servicing — from booking to completion.

---

## 🧠 Overview

The **Vehicle Service Booking System** simplifies workshop operations by providing:
- Online service booking for customers.
- Role-based dashboards for Admins and Mechanics.
- Secure authentication with email verification and password recovery via SMTP.
- Real-time status tracking for vehicle servicing.

---

## 👥 User Roles

### 👤 **Customer**
- Register and log in securely.
- Book, view, and cancel vehicle services.
- Receive service updates and password reset emails.
- Track assigned mechanic and service status.

### 🧰 **Mechanic**
- View assigned service tasks.
- Update job progress (*In Progress*, *Completed*).
- Manage assigned vehicles and report completion.

### 🧑‍💼 **Admin**
- Manage users, vehicles, services, and mechanics.
- Assign mechanics to service bookings.
- Add or remove service types.
- Monitor performance and oversee all system activities.

---

## 💌 SMTP Email Integration (Forgot Password Feature)

The system uses **SMTP (Simple Mail Transfer Protocol)** to send password reset emails securely.  
If a user forgets their password, they can request a reset email that contains a secure verification link.

### ⚙️ How It Works
1. The user clicks **“Forgot Password”** on the login page.  
2. The backend generates a **unique token** and sends it to the user’s registered email.  
3. The user clicks the reset link from their email.  
4. They’re redirected to a **Reset Password** page, where they can set a new password.  
5. The system verifies the token and updates the password securely in the database.

### 🔧 SMTP Configuration (Spring Boot)
You must configure your SMTP credentials in the `application.properties` file located at:  
`backend/src/main/resources/application.properties`

```properties
# SMTP Mail Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_specific_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=5000
spring.mail.properties.mail.smtp.writetimeout=5000

# Password Reset Email Details
app.reset.url=http://localhost:5173/reset-password
```
---

## 🧱 System Architecture

Frontend (React + Tailwind)
|
| REST API (JSON)
↓
Backend (Spring Boot)
|
↓
Database (MySQL)


---

## 💻 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | ReactJS, Tailwind CSS, Axios, React Router |
| **Backend** | Spring Boot, Spring Web, Spring Data JPA, Spring Security |
| **Database** | MySQL |
| **Build Tools** | Maven, Vite |
| **Languages** | Java, JavaScript |

---

---

## ⚙️ Setup Instructions

### Step 1️⃣ — Clone the Repository
```bash
git clone https://github.com/your-username/vehicle-service-booking-system.git
cd vehicle-service-booking-system
```


Step 2️⃣ — Backend Setup (Spring Boot)

Navigate to the backend folder:
```bash
cd backend
```


Create a MySQL database:
```bash

CREATE DATABASE vehicle_service_db;
```



Configure database connection in:

`src/main/resources/application.properties`

```bash
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/vehicle_service_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```



Run the backend:

```bash
mvn spring-boot:run
```
Backend URL: http://localhost:8080

Step 3️⃣ — Frontend Setup (React + Tailwind)
Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend server:

```bash
npm run dev
```

Frontend URL: http://localhost:5173

🧾 Database Schema
Database Name: vehicle_service_db

No need to make tables manually hibernate is autometically made the table for you....

