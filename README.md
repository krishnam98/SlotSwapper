# SlotSwapper

**SlotSwapper** is a peer-to-peer time-slot scheduling application that allows users to mark their calendar slots as _swappable_, view other users’ available slots, and request swaps between them.  
It provides a complete scheduling experience with authentication, real-time request management, and clear user interfaces for both outgoing and incoming swap requests.

---

## Overview

- **Modular Architecture** — separated backend (Node.js/Express) and frontend (React + Redux Toolkit) for scalability and maintainability.
- **State Management** — Redux Toolkit with Async Thunks for clean async logic and predictable state flow.
- **Authentication** — JWT-based authentication with password hashing using bcrypt.
- **UI Design** — Responsive, minimal UI built using Tailwind CSS.
- **Database Design** — Three main models: `User`, `Event`, and `SwapRequest` to ensure clarity in relationships between users, events, and swap logic.
- **API-Driven Approach** — Clear RESTful endpoints to interact between frontend and backend.

---

## Setup Instructions

### Prerequisites

- Node.js (>= 18)
- npm or yarn
- MongoDB Atlas (or local MongoDB setup)
- Git

---

### Clone the Repository

```bash
git clone https://github.com/krishnam98/SlotSwapper
cd SlotSwapper
```

---

### Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file inside /backend

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd ../frontend
npm install
```

### Run the Frontend

```bash
npm run dev
```

### Frontend will start on `http://localhost:5173` (default Vite port).

---

## API Endpoints

| Method     | Endpoint                        | Description                     |
| :--------- | :------------------------------ | :------------------------------ |
| **POST**   | `/auth/signup`                  | Register new user               |
| **POST**   | `/auth/login`                   | Login user & get token          |
| **GET**    | `/events/getMyEvents`           | Fetch user’s events             |
| **POST**   | `/events/create`                | Create new event                |
| **PUT**    | `/events/update/:id`            | Update event details            |
| **DELETE** | `/events/delete/:id`            | Delete event                    |
| **GET**    | `/api/swappableSlots`           | Fetch all swappable slots       |
| **POST**   | `/api/swap-request`             | Send swap request               |
| **POST**   | `/api/swap-respond/:id`         | Accept or reject a swap request |
| **GET**    | `/requests/getOutgoingRequests` | Get Outgoing Requests           |
| **GET**    | `/requests/getIncomingRequests` | Get Incoming Requests           |

---

## Postman Collection

You can test all the above APIs directly using the Postman collection below:

[SlotSwapper Postman Collection](https://web.postman.co/workspace/My-Workspace~15f366c9-1eae-4c9a-8713-e7f5a68c5a43/collection/36325688-080716c1-8d93-4cbb-a5d1-5a78b2276d27?action=share&source=copy-link&creator=36325688)

---

## Challenges Faced

- Designing the swap logic to ensure mutual availability and avoid conflicts.

- Managing Redux state updates for both incoming and outgoing swap requests.

- Keeping the UI synchronized after a swap acceptance or rejection.

- Handling authentication flow and token expiry on the frontend gracefully.

---

# Author - Krishnam Soni
