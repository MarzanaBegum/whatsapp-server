const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./db");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

//database connection
dbConnection();

//cors
const allowedOrigins = [
  "http://localhost:3000",
  // Add more trusted origins as needed
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 3600,
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());

//routes
app.use("/api", require("./routes/AllRoutes"));

app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
