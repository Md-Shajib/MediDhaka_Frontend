# Medidhaka Frontend

Medidhaka is a modern healthcare management web application that provides an interface for managing **hospitals, doctors, and their relationships**.  
This repository contains the **frontend** built with **Next.js**, **TypeScript**, and **Redux Toolkit**, providing a responsive, interactive, and user-friendly experience.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation-&-setup)
- [Custom Hooks](#custom-hooks)
- [Store & Services](#store-&-services)
- [Reusable Components](#reusable-components)
- [Future Enhancements](#future-enhancements)
## Project Overview

The **Medidhaka Frontend** serves as the client-side application that interacts with the **Medidhaka RESTful API**.  
It allows administrators, doctors, and users to manage hospitals, doctors, and their details through an intuitive dashboard and public website.

### Core Features

####  Dashboard (Admin Panel)
- View, create, edit, and delete **Hospitals** and **Doctors**.
- Manage associations between hospitals and doctors.
- Track statistics using dynamic dashboards.
- Form modals for quick CRUD operations.
- Responsive tables for data visualization.

####  Hospitals Management
- List all hospitals with search and pagination.
- Add or update hospital details using a modal form.
- View hospital-specific information.
- Image carousel for hospital galleries.

####  Doctors Management
- List, add, or update doctor profiles.
- Assign doctors to hospitals.
- Display detailed doctor information.
- Dashboard view for admin management.

#### Public Website
- Showcase hospitals and doctors to users.
- Hero and navigation sections for intuitive browsing.
- Responsive layout for mobile and desktop users.
- Dedicated sections for specialists, contact, and articles.

#### Search Functionality
- Debounced search queries using a custom `useDebounce` hook.
- Integration with `search.service.ts` for instant search results.

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| **Framework** | [Next.js](https://nextjs.org/) |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit |
| **UI Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Styling** | Tailwind CSS |
| **API Communication** | RESTful API using RTK Query |
| **Version Control** | Git & GitHub |

---



---

##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Md-Shajib/MediDhaka_Frontend.git
cd medidhaka-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
- Create a .env.local file in the root directory and add:
```
 NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
### 4. Run the development server
```
npm run dev
```
App will be available at: http://localhost:3000


## Custom Hooks
| Hook             | Description                                               |
| ---------------- | --------------------------------------------------------- |
| `useDebounce.ts` | Debounces user input for optimized search queries.        |
| `useToggle.ts`   | Toggles boolean states for modal and dropdown visibility. |


## Store & Services
| File                          | Responsibility                          |
| ----------------------------- | --------------------------------------- |
| `store.ts`                    | Initializes Redux store with RTK Query. |
| `ReduxProvider.tsx`           | Provides Redux context to the app.      |
| `service/hospital.service.ts` | Handles hospital-related API calls.     |
| `service/doctor.service.ts`   | Handles doctor-related API calls.       |
| `service/search.service.ts`   | Fetches real-time search results.       |

---
## Reusable Components
- DashboardHeader – Displays section titles and action buttons.

- HospitalFormModal – For adding/editing hospitals.

- DoctorFormModal – For adding/editing doctors.

- HospitalTable / DoctorTable – Interactive data tables.

- SearchPopup – Dynamic search overlay using debounce.

- Navbar / MobileNav – Responsive navigation components.

- FooterSection – Quick links, contact, and branding info.

---
## Future Enhancements

- Authentication & Role-based Access (Admin/Doctor/User)

- Appointment Scheduling Module

- Patient Management

- Notification System

- Advanced Filtering & Reporting


---
---
<h1 align="center"> Thank You 🌹</h1>