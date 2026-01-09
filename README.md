# Contact Management

A full-stack Contact Management application that lets users **Create, Read, Update, and Delete (CRUD)** contact information via a web interface and RESTful API.

This repository includes both the **backend** API and the **frontend** client.

---
## Live link : https://contact-management-frontend-z1da.onrender.com/

## Features

- Add new contacts with name, phone number, email, etc.
- View a list of all contacts
- Edit existing contacts
- Delete contacts
- Search and filter (if implemented)
- RESTful API support

---

## Tech Stack

**Backend**
- Node.js
- Express.js
- Database ( MongoDB )
- REST API

**Frontend**
- React.js/vite + axios
- HTML, CSS, JavaScript
- API integration with backend services

---

## Project Structure
```bash
Contact-Management/
├── backend/ # Backend API code
│ ├── controllers/ contactContollers.js
│ ├── models/ Contact.js
│ ├── routes/ contactRoutes.js
│ ├──  server.js
│ └── .env
├── frontend/ # React application
│ ├── public/
│ ├── src/
│ │ ├── components
│   │   ├── Input.jsx
│   │   ├── TextArea.jsx
│   │   ├── Alert.jsx
│   │   └── ContactCard.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
├── .gitignore
├── README.md
└── package.json
```
---


## Getting Started

Follow these instructions to get the project running locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14+)
- npm or yarn
- Optional: MongoDB (local or Atlas) if backend uses database

---

## Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file (if needed) and add environment variables:

    ```bash
    MONGODB_URI=<your_database_connection_string>
    ```

4. Start the backend server:

    ```bash
    node server
    ```

The API should now be running on `http://localhost:5000` (or the port you configured).

---

## Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

The frontend should launch in your browser at `http://localhost:5173`.

---

## Usage

1. Open your browser and go to the frontend URL.
2. Use the UI to add, view, edit, and delete contacts.
3. The frontend communicates with the backend API to persist data.

---

## API Endpoints (Example)

> Replace routes as per your implementation

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/api/contacts`        | Get all contacts               |
| GET    | `/api/contacts/:id`    | Get a single contact by ID     |
| POST   | `/api/contacts`        | Create a new contact           |
| PUT    | `/api/contacts/:id`    | Update an existing contact     |
| DELETE | `/api/contacts/:id`    | Delete a contact               |

---






