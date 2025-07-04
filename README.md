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

- The dashboard displays a **bar graph** and  **pie charts**.
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


## 🧭 Admin Dashboard Navigation

### 📦 Device Inventory

- Displays data in a **tabular format**.
- Includes **filters** and **pagination** for easier navigation.
- ✅ **Tip:** Before switching to another admin section, **reset filters to "All"** to avoid data mismatch.

### 🧠 Training Module  
### 🛠 Service Visits  
### 📍 Tracker  
### 🚨 Alerts  

- Each of these sections also presents data in a **tabular format**.
- **Pagination** is implemented for smooth browsing of large datasets.
- Interfaces are consistent across modules for an intuitive admin experience.

 ### 📝 Assignments

In the **Assignments** section, you'll find a **dynamic pie chart** displaying the distribution of tasks or devices.

This section includes two primary actions:

---

#### 1️⃣ Device Registration

- Click the **"Device Registration"** button to open the device registration form.
- Fill out the form carefully.
- ⚠️ **Important:** Ensure the `Device ID` is **unique** — it must not duplicate existing IDs.
  - Example formats: `DEV-4001`, `MED-5001`, etc.
- Once the form is submitted:
  - Return to the **Dashboard** and check if the total number of devices has changed.
  - Verify the addition by reviewing the **Device Inventory** and **Tracker** tables.

> ✅ This confirms that **CRUD operations** using **localStorage** are successfully implemented.

---

#### 2️⃣ Generate Ticket

- Click the **"Generate Ticket"** button.
- A dropdown appears to **select a technician** for assignment.
- After selecting a technician, click **"Assign Task"**.
- An alert will pop up confirming that a **ticket has been successfully generated** for the selected technician.

> 🔒 Once done, it's recommended to **log out** from the Admin view.




