const express = require("express");
const path = require("path");
const connectDB = require("./Config/dbConfig");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
connectDB()
app.use(express.json());
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const StudentRoute = require('./Student/StudentRoute')
const TeacherRoute = require('./Teacher/TeacherRoute')
const ClassRoute = require('./Class/ClassRoute')
// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://career-canvas365.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // 
  credentials: true, 
}));




app.get("/", (req, res) => {
  res.send("hello Developer");
});




// Routes
app.use('/api/Student' , StudentRoute)

app.use('/api/Teacher', TeacherRoute)

app.use('/api/Class', ClassRoute)

// Error Handler

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Server Error");
});
// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});