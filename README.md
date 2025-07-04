# 🚀 CRM Dashboard – Frontend

Welcome to the **CRM Dashboard Frontend**!  
This project provides a streamlined dashboard system for managing and tracking service operations, featuring:

- **Admin View** – Full access to device management, training modules, service visits, technician tracking, and more.
- **Technician View** – Simplified interface to handle assigned tickets and submit reports.

---

## 🚀 Live Demo

You can view the deployed project here:  
👉 [CRM Dashboard Frontend – Live](https://crm-dashboard-frontend-6f7b1zzd3-soumya-rouls-projects.vercel.app)

## 🌐 Deployment Notes


> ⚠️ **Important:** If you're visiting the deployed link, **do not refresh or reload the page**.  
> Due to Vite routing and static hosting limitations (e.g., on Vercel), refreshing may cause a `404 Not Found`.

---

## 💻 Running the Project Locally

If you'd like to run the project on your local machine:

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ````
``` Start the development server:```

npm run dev

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
    },
    {
      "name": "Bob Smith",
      "email": "bob.smith@example.com",
      "password": "techpass1",
      "role": "technician",
      "workstatus": "available"
    },
    {
      "name": "Carol Davis",
      "email": "carol.davis@example.com",
      "password": "techpass2",
      "role": "technician",
      "workstatus": "available"
    },
    {
      "name": "David Lee",
      "email": "david.lee@example.com",
      "password": "techpass3",
      "role": "technician",
      "workstatus": "unavailable"
    },
    {
      "name": "Eva Moore",
      "email": "eva.moore@example.com",
      "password": "techpass4",
      "role": "technician",
      "workstatus": "available"
    },
    {
      "name": "Frank Harris",
      "email": "frank.harris@example.com",
      "password": "techpass5",
      "role": "technician",
      "workstatus": "available"
    },
    {
      "name": "Grace Kim",
      "email": "grace.kim@example.com",
      "password": "techpass6",
      "role": "technician",
      "workstatus": "available"
    },
    {
      "name": "Henry Walker",
      "email": "henry.walker@example.com",
      "password": "techpass7",
      "role": "technician",
      "workstatus": "available"
    },
    {
      "name": "Ivy Adams",
      "email": "ivy.adams@example.com",
      "password": "techpass8",
      "role": "technician",
      "workstatus": "unavailable"
    },
    {
      "name": "Jake Turner",
      "email": "jake.turner@example.com",
      "password": "techpass9",
      "role": "technician",
      "workstatus": "available"
    },
    {
      "name": "Kate Miller",
      "email": "kate.miller@example.com",
      "password": "techpass10",
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

## 👨‍🔧 Technician View

To access the Technician Dashboard:

1. Use the credentials from the `public/roleData.json` file or the sample credentials provided earlier.
2. Make sure you log in with the **technician to whom the ticket was assigned** in the Admin view.

---

### 🧾 Ticket Validation

- If you see the message:  
  **"No Tickets have been assigned to you"**,  
  you’ve logged in with the **wrong technician** (no tickets were assigned to this user).

- If you see a **yellow card** indicating a ticket has been assigned, you're logged in with the **correct technician**.

---

### 🎓 Training Module

- Navigate to the **Training Module** after confirming ticket assignment.
- You will see a form with pre-filled (non-editable) fields:
  - **Device Type**
  - **Device ID**
  - **Facility**
- Fill in the remaining fields to complete the form.
- File upload (photo or attachment) is **optional**.
- After completing the form, click **Submit**.

---

### 🔁 Post-Submission Workflow

- Log out from the **Technician view** after form submission.
- Log back in as an **Admin**.
- Go to:
  - **Service Visits** – to verify if the submitted service form is reflected.
  - **Alerts** – to check if any system alerts or updates have been triggered.



## 📩 Contact

If you encounter any issues or have questions about this project, feel free to reach out:

📧 Email: [soumyaroul19@gmail.com](mailto:soumyaroul19@gmail.com)


