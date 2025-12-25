# 🏢 AssetVerse - Corporate Asset Management System

![AssetVerse Banner](https://i.ibb.co.com/mJ9Jky6/assetverse-banner-placeholder.png)
_(Optional: Replace this link with a screenshot of your Home Page)_

**AssetVerse** is a comprehensive **B2B (Business-to-Business)** web application designed to streamline asset management for companies. It bridges the gap between HR Managers and Employees, ensuring transparent tracking of returnable and non-returnable assets, managing product inventory, and automating the request-approval flow.

---

## 🔗 Live Links

- **🔴 Live Site:** [PASTE_YOUR_VERCEL_LIVE_LINK_HERE]
- **💻 Client Repository:** [PASTE_YOUR_GITHUB_CLIENT_LINK_HERE]
- **⚙️ Server Repository:** [PASTE_YOUR_GITHUB_SERVER_LINK_HERE]

---

## 🚀 Key Features

### 👨‍💼 For HR Managers (Admin)

- **Asset Management:** Add, update, and delete assets. Filter assets by availability and type (Returnable/Non-returnable).
- **Request Handling:** Approve or reject asset requests from employees.
- **Smart Limitation Logic:** Cannot approve requests if the package limit is exceeded (Auto-check).
- **Team Management:** View the list of affiliated employees and remove members from the team.
- **Visual Analytics:** Interactive **Pie Charts** (Asset Types) and **Bar Charts** (Top Requested Items) using Recharts.
- **Package Upgrade:** Integrated **Stripe Payment Gateway** to purchase higher packages and increase employee limits instantly.
- **Profile Management:** Update company logo and personal details.

### 👨‍💻 For Employees

- **Smart Request System:** Browse available assets and request items with specific notes.
- **My Assets:** Track the status of requests (Pending/Approved).
- **Print Reports:** Generate a **PDF** of assigned assets using the print feature.
- **My Team:** View colleagues and team members within the affiliated company.
- **Auto-Affiliation:** Automatically get added to a company's team upon the first approved request.
- **Return Assets:** Option to return "Returnable" type assets when no longer needed.

### 🌐 General / UI Features

- **Responsive Design:** Fully responsive for Mobile, Tablet, and Desktop.
- **Authentication:** Secure Firebase Login (Email/Password & Google Social Login).
- **Modern UI:** Built with **Tailwind CSS** and **DaisyUI** for a clean, corporate look.
- **Animations:** Smooth transitions using **Framer Motion**.
- **Security:** JWT (JSON Web Token) verification for protected routes (HttpOnly Cookies).
- **404 Page:** Custom error page for broken links.

---

## 🛠️ Technology Stack

### Frontend

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS, DaisyUI
- **State Management:** TanStack Query (React Query), Context API
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Utils:** Axios, SweetAlert2, React-Helmet-Async, React-to-Print

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Native Driver - _No Mongoose_)
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** Stripe API

---

## 📦 NPM Packages Used

- `@tanstack/react-query`
- `axios`
- `firebase`
- `react-hook-form`
- `react-router-dom`
- `sweetalert2`
- `recharts`
- `framer-motion`
- `react-to-print`
- `@stripe/stripe-js` & `@stripe/react-stripe-js`
- `localforage`
- `match-sorter`
- `sort-by`

---

## ⚙️ Environment Variables (Setup)

To run this project locally, you need to configure the `.env` files.

### Client Side (`.env.local`)

Create a `.env.local` file in the client root directory:

```env
VITE_API_URL=http://localhost:5000
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
VITE_IMGBB_API_KEY=YOUR_IMGBB_API_KEY
VITE_PAYMENT_GATEWAY_PK=YOUR_STRIPE_PUBLISHABLE_KEY
```
