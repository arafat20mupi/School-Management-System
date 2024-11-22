Here’s an updated version of the `README.md` with a revised folder structure for your project:

```markdown
# School Management System

A backend API for managing a school system, including features to manage students, teachers, and classes, along with Cloudinary integration for storing profile pictures.

## Objective

To develop a backend system that supports:
- Student, Teacher, and Class management.
- Secure storage of profile pictures using Cloudinary.
- Authentication using JWT.

---

## Features

### Students
- **Schema**:
  - `name` (String, required)
  - `email` (String, unique, required)
  - `classId` (ObjectId, reference to Class, required)
  - `profileImageUrl` (String, optional)
  - `createdAt` (Date, default: current timestamp)
- **API Endpoints**:
  - Add a new student.
  - Get all students (supports pagination and filtering by class).
  - Get a single student by ID.
  - Update student details (e.g., name, class, profile image).
  - Soft delete a student.

### Teachers
- **Schema**:
  - `name` (String, required)
  - `email` (String, unique, required)
  - `subject` (String, required)
  - `profileImageUrl` (String, optional)
  - `createdAt` (Date, default: current timestamp)
- **API Endpoints**:
  - Add a new teacher.
  - Get all teachers (supports pagination).
  - Get a teacher by ID.
  - Update teacher details (e.g., name, subject, profile image).
  - Soft delete a teacher.

### Classes
- **Schema**:
  - `name` (String, required, e.g., 'Grade 10A')
  - `teacherId` (ObjectId, reference to Teacher, required)
  - `studentCount` (Number, default: 0)
  - `createdAt` (Date, default: current timestamp)
- **API Endpoints**:
  - Create a class.
  - Assign a teacher to a class.
  - Get all classes (supports pagination).
  - Update class details (e.g., name, teacher).
  - Delete a class.

---

## Tech Stack

- **Database**: MongoDB
- **Framework**: Express.js
- **Runtime**: Node.js
- **File Storage**: Cloudinary

---

## Authentication

- **JWT Authentication**:
  - Protects routes to ensure only authorized users can perform operations.

---

## Additional Features

- **Cloudinary Integration**: Allows uploading and updating profile images for students and teachers.
- **Error Handling**: Handles common errors like duplicate entries and invalid data.
- **Pagination Support**: For `Get All` routes.
- **Soft Delete**: Retains data integrity while marking entities as deleted.

### Bonus Features
- Attendance tracking for students in each class.
- Exam and result management for students.
- Class report generation with a list of students and the assigned teacher.

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- MongoDB database.
- Cloudinary account.

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongo-uri>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   JWT_SECRET=<your-jwt-secret>
   COOKIE_SECRET=<your-cookie-secret>
   ```

4. Start the server:
   ```bash
   node index.js
   ```

5. The API will be available at `http://localhost:5000`.

---

## API Endpoints

### Students
- `POST /api/Student`: Add a new student.
- `GET /api/Student`: Get all students (with pagination and filtering by class).
- `GET /api/Student/:id`: Get a student by ID.
- `PUT /api/Student/:id`: Update student details.
- `DELETE /api/Student/:id`: Soft delete a student.

### Teachers
- `POST /api/Teacher`: Add a new teacher.
- `GET /api/Teacher`: Get all teachers (with pagination).
- `GET /api/Teacher/:id`: Get a teacher by ID.
- `PUT /api/Teacher/:id`: Update teacher details.
- `DELETE /api/Teacher/:id`: Soft delete a teacher.

### Classes
- `POST /api/Class`: Create a new class.
- `GET /api/Class`: Get all classes (with pagination).
- `GET /api/Class/:id`: Get a class by ID.
- `PUT /api/Class/:id`: Update class details.
- `DELETE /api/Class/:id`: Delete a class.

---

## Error Handling

The API uses centralized error handling to return meaningful error messages, such as:
- Duplicate entries.
- Invalid request data.
- Unauthorized access.

---

## Contributing

Feel free to fork this repository, create new features, or fix bugs. Make sure to submit a pull request with detailed descriptions of your changes.

