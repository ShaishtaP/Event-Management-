# Campus Event Management Portal

A full-stack web application for managing campus events with role-based access control, built with React, Redux, and Node.js.

## 🎯 Project Overview

This portal enables students, organizers, and administrators to efficiently manage college events including workshops, hackathons, seminars, and fests. Each user role has specific privileges and access levels.

## 👥 User Roles & Permissions

| Role | Access Level | Capabilities |
|------|-------------|-------------|
| **Admin** | Full Access | Manage users & events, assign roles, approve/reject events |
| **Organizer** | Event Creator | Create, edit, delete own events |
| **Student** | Event Participant | Register for events, view event details |
| **Guest** | View Only | Browse approved public events |

## ✨ Key Features

### Authentication & Security
- Custom JWT-based authentication system
- Secure password hashing with bcryptjs
- Role-based access control (RBAC)
- Protected routes and API endpoints

### Event Management
- Event creation and editing for organizers
- Event approval/rejection workflow for admins
- Student event registration system
- Public event browsing for guests

### Role-Specific Dashboards
- **Admin Dashboard**: User management, event oversight
- **Organizer Dashboard**: Personal event management
- **Student Dashboard**: Registered events overview
- **Guest Dashboard**: Public events catalog

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Redux Toolkit** - State management
- **TailwindCSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-event-management
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend server starts on `http://localhost:5000`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend application starts on `http://localhost:3000`

## 📁 Project Structure

```
campus-event-management/
├── backend/
│   ├── controllers/        # Route handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication & validation
│   ├── utils/             # Helper functions
│   └── server.js          # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   ├── api/           # API integration
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md
```

## 🔐 Test Credentials

Use these credentials to test different user roles:

### Admin Account
- **Email**: admin@campus.edu
- **Password**: admin123

### Organizer Account
- **Email**: organizer@campus.edu
- **Password**: organizer123

### Student Account
- **Email**: student@campus.edu
- **Password**: student123

### Guest Account
- **Email**: guest@campus.edu
- **Password**: guest123

## 📡 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

### Event Management Routes
- `GET /api/events/public` - Public events (all users)
- `GET /api/events` - All events (admin only)
- `POST /api/events` - Create event (organizers)
- `PUT /api/events/:id` - Update event (organizers/admin)
- `DELETE /api/events/:id` - Delete event (organizers/admin)
- `PATCH /api/events/:id/approve` - Approve event (admin)
- `POST /api/events/:id/register` - Register for event (students)

## 🎨 UI/UX Features

- **Responsive Design** - Works on all device sizes
- **Modern Interface** - Clean and intuitive user experience
- **Role-based Navigation** - Dynamic menus based on user permissions
- **Real-time Updates** - Instant feedback on user actions
- **Accessibility** - WCAG compliant components

## 🔒 Security Features

- JWT token expiration handling
- Password encryption and validation
- Protected API endpoints
- CORS configuration
- Input sanitization and validation
- Rate limiting on sensitive routes

## 📱 Screenshots

*[Add screenshots of different dashboards and key features here]*

## 🚀 Deployment

The repository includes a `render.yaml` Blueprint for a single Render web service.
It builds the frontend, serves the generated files from the Express server, and
keeps API requests on the same origin at `/api`.

Set `MONGODB_URI` in Render to a MongoDB connection string before the first
deploy. Render generates `JWT_SECRET` from the Blueprint automatically.

## 🧪 Testing

Run tests for both frontend and backend:

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

Built as part of the Full-Stack Internship Assignment demonstrating modern web development practices with React, Node.js, and MongoDB.


Demo Link:
https://event-manager-gules-omega.vercel.app/
