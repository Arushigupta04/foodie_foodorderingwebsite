
// // const express = require("express");
// // const cookieParser = require("cookie-parser");
// // const path = require("path");
// // const cors = require("cors");
// // const Review = require('./models/reviewModel');
// // const app = express();
// // // const PORT = 5000;
// // const HOST = "192.168.54.63";
// // const { ConnectMongoDB } = require("./connection");
// // const { CheckforAuthCookie } = require("./middlewares/auth");
// // const userRouter = require("./routes/user");
// // const paymentRoutes = require("./routes/paymentRoutes");
// // const itemRouter = require("./routes/items");
// // const reviewRoutes = require("./routes/reviewRoutes"); // Import review routes
// // const trackingg = require("./routes/tracking"); // Import review routes

// // // Start the server
// // const Port=process.env.PORT||4000;
// // app.listen(Port, () => console.log(`Server Running on PORT:${Port}`));

// // // Connect to MongoDB
// // ConnectMongoDB("mongodb://127.0.0.1:27017/foodie")
// //   .then(() => console.log("MongoDB Connected Successfully."))
// //   .catch((err) => console.log("Error Connecting MongoDB", err));

// // // Middleware
// // app.use('./assets', express.static(path.join(__dirname, 'assets')));
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// // app.use(CheckforAuthCookie("token"));
// // app.use(express.json());
// // app.use(cors());

// // // Routes
// // // app.use("/api/geocode/", MapRouter);
// // app.use("/api/add-new/", itemRouter);
// // app.use("/api", userRouter);
// // app.use("/api/v1/pay", paymentRoutes);
// // app.use("/api/review", reviewRoutes); 
// // app.use("/api/tracking", trackingg); 

// // app.get('/api/reviews/count', async (req, res) => {
// //   try {
// //     // Get the count of reviews in the database
// //     const reviewsCount = await Review.countDocuments(); // Use your DB model here
// //     res.json({ count: reviewsCount });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to fetch reviews count' });
// //   }
// // });
// // // Test route
// // app.get("/test", (req, res) => {
// //   return res.send("Testing server...");
// // });
// require('dotenv').config(); // Load environment variables

// const express = require("express");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// const cors = require("cors");
// const { ConnectMongoDB } = require("./connection");
// const { CheckforAuthCookie } = require("./middlewares/auth");
// const userRouter = require("./routes/user");
// const paymentRoutes = require("./routes/paymentRoutes");
// const itemRouter = require("./routes/items");
// const reviewRoutes = require("./routes/reviewRoutes");
// const trackingg = require("./routes/tracking");
// const Review = require("./models/reviewModel");

// const app = express();

// // Configure Port and Host
// const PORT = process.env.PORT || 4000;

// // Start the server
// app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));

// // Connect to MongoDB
// ConnectMongoDB(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected Successfully."))
//   .catch((err) => console.log("Error Connecting MongoDB", err));

// // Middleware
// app.use('/assets', express.static(path.join(__dirname, 'assets')));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(CheckforAuthCookie("token"));
// app.use(express.json());

// // Enable CORS for frontend URL
// const allowedOrigins = ['http://localhost:3000', 'https://foodie-foodorderingwebsite-1.onrender.com'];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));

// // Routes
// app.use("/api/add-new/", itemRouter);
// app.use("/api", userRouter);
// app.use("/api/v1/pay", paymentRoutes);
// app.use("/api/review", reviewRoutes);
// app.use("/api/tracking", trackingg);

// // Route to fetch review count
// app.get('/api/reviews/count', async (req, res) => {
//   try {
//     const reviewsCount = await Review.countDocuments();
//     res.json({ count: reviewsCount });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch reviews count' });
//   }
// });

// // Test route
// app.get("/test", (req, res) => {
//   res.send("Testing server...");
// });
require('dotenv').config(); // Load environment variables

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require('mongoose');
const { CheckforAuthCookie } = require("./middlewares/auth");
const userRouter = require("./routes/user");
const paymentRoutes = require("./routes/paymentRoutes");
const itemRouter = require("./routes/items");
const reviewRoutes = require("./routes/reviewRoutes");
const trackingg = require("./routes/tracking");
const Review = require("./models/reviewModel");

const app = express();

// Configure Port and Host
const PORT = process.env.PORT || 4000;

// Middleware
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(CheckforAuthCookie("token"));
app.use(express.json());

app.use(express.json());

// Setting the timeout value to 5 minutes (300,000 ms) for slow requests
app.use((req, res, next) => {
  res.setTimeout(300000, () => {
    console.error("Request timed out");
    res.status(408).send("Request Timeout");
  });
  next();
});


// Enable CORS for frontend URL
const allowedOrigins = ['http://localhost:3000', 'https://foodie-foodorderingwebsite-1.onrender.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
// Routes
app.use("/api/add-new/", itemRouter);
app.use("/api", userRouter);
app.use("/api/v1/pay", paymentRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/tracking", trackingg);

// Route to fetch review count
app.get('/api/reviews/count', async (req, res) => {
  try {
    const reviewsCount = await Review.countDocuments();
    res.json({ count: reviewsCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews count' });
  }
});

// Test route
app.get("/test", (req, res) => {
  res.send("Testing server...");
});

// MongoDB connection with retry logic

const connectWithRetry = () => {
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Timeout after 10 seconds
    socketTimeoutMS: 60000, // Set socket timeout to 60 seconds
   
  })
  .then(() => {
    console.log('MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
  });
};

connectWithRetry();


// Start the server
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
