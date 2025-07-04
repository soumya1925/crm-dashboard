# 🚀 CRM Dashboard – Frontend

Welcome to the **CRM Dashboard Frontend**!  
This project is divided into two main user views:

- **Admin View** – Full control and navigation access.
- **Technician View** – Limited access with role-specific features.

---

## 🔐 Login Instructions

To log in, use credentials from the `public/roleData.json` file.  
This JSON contains sample users for both **Admin** and **Technician** roles.

### 🔑 Sample Credentials:

**Admin:**
```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "password": "password123",
  "role": "admin"
}
{
  "name": "Bob Smith",
  "email": "bob.smith@example.com",
  "password": "techpass1",
  "role": "technician",
  "workstatus": "available"
}
````

## 🖥️ Admin Dashboard View

Upon successful login as an **Admin**, you are redirected to the Admin Dashboard.

### 📊 Dashboard Overview

- The dashboard displays a **bar graph** and a **pie chart**.
- These charts are **fully dynamic** — their data updates automatically based on the selected or changing fields.
- Visualizations provide quick insights into key metrics and system data.

### 🧭 Admin Navigation Tabs

Admins have access to the following six main navigation tabs:

- **📦 Device Inventory** – Manage and monitor all registered devices.
- **🎓 Training Module** – View and update technician training content or status.
- **🛠 Service Visits** – Track completed and ongoing service operations.
- **📍 Tracker** – Visualize technician locations and movements.
- **🚨 Alerts** – View and handle real-time alerts raised in the system.
- **📝 Assignments** – Create and manage work orders or task assignments.


