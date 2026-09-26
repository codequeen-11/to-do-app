# Todo App

A full-stack Todo application built as a technical assessment to demonstrate frontend, backend, API integration, and data persistence skills.

## Features

* Create todos
* Edit todos
* Delete todos
* Mark todos as completed or active
* Filter by All, Active, and Completed
* Responsive design
* Light and dark mode
* Loading and error states
* Local JSON file persistence

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Lucide React
* next-themes

### Backend

* Node.js
* Express.js
* CORS
* Local JSON file

## Project Structure

```text
todo-app/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   └── .env.local
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── data/
│   │   └── todos.json
│   └── server.js
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd todo-app
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

The API runs at:

```text
http://localhost:5000
```

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The application runs at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| GET    | `/api/todos`                  | Get all todos       |
| GET    | `/api/todos?status=active`    | Get active todos    |
| GET    | `/api/todos?status=completed` | Get completed todos |
| POST   | `/api/todos`                  | Create a todo       |
| PUT    | `/api/todos/:id`              | Update a todo       |
| DELETE | `/api/todos/:id`              | Delete a todo       |
| GET    | `/api/health`                 | Check API status    |

## Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, set this variable to the deployed backend URL.

## Architecture

The application follows a simple separation of responsibilities:

```text
Next.js Frontend
       │
       │ HTTP / REST API
       ▼
Express Backend
       │
       ▼
Todo Service
       │
       ▼
todos.json
```

The frontend handles the user interface and interactions, while the Express backend handles API requests and persistence.

## Development

Run the frontend and backend separately:

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

## License

This project was created for learning and technical assessment purposes.
