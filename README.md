
# Fullstack Authentication Project

This is a fullstack project that includes a **React frontend** and an **Express backend** with MongoDB for authentication. The app supports user signup, login, and protected routes.

## Project Structure

/skygoal
├── client/            # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env           # Client environment variables
├── server/            # Express backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json      
├── .gitignore
└── README.md

## Features

- **User Authentication**: Signup and login with JWT-based authentication.
- **Protected Routes**: Routes accessible only with valid JWT tokens.
- **React Frontend**: User-friendly interface for authentication.
- **Express Backend**: REST API to handle authentication and data requests.
  
## Technologies Used

- Frontend: React, Axios, Vite, tailwindcss, Redux
- Backend: Express, MongoDB with Mongoose, JWT, bcryptjs, cors, body-parser

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the Repository**:

   git clone https://github.com/Soumya7681/skygoal.git
   cd your-repo

2. **Install Dependencies**:
   - Install frontend dependencies:
     - cd client
     - npm install

   - Install backend dependencies:
     - cd ../server
     - npm install

3. **Environment Variables**:
   - Create `.env` files in `client` directory:
   
   **For the backend (`server/.env`):**
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

### Running the Project

1. **Start the Backend**:
   - cd server
   - npm start
   - The server will run on `http://localhost:5000`.

2. **Start the Frontend**:

   - cd client
   - npm run dev
   - The frontend will run on `http://localhost:5173`.



## API Endpoints (Server)

### 1. **Signup**
- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Body**:
  {
    "username": "example",
    "email": "example@example.com",
    "password": "yourpassword"
  }
  
### 2. **Login**
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  {
    "email": "example@example.com",
    "password": "yourpassword"
  }

### 3. **Get User Details** (Protected)
- **URL**: `/api/auth/userdetails`
- **Method**: `GET`
- **Headers**:
  Authorization: Bearer <your_jwt_token>

## License

This project is licensed under the ISC License.

## Acknowledgements

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://reactjs.org/)
- [JWT Guide](https://jwt.io/)