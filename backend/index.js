// Importing required modules
import express from "express"; // Express is a web framework for building APIs
import { PORT, MongoDB_URI } from './config.js'; // Importing configuration variables (port and MongoDB URI)
import mongoose from 'mongoose'; // Mongoose is an ODM (Object Data Modeling) library for MongoDB
import { Book } from './models/bookModel.js'; // Importing the Book model to interact with the database
import booksRoute from './routes/booksRoute.js'; // Importing the book routes
import cors from 'cors'; // CORS (Cross-Origin Resource Sharing) is a mechanism that allows resources to be requested from another domain

// Creating an instance of the Express application
const app = express(); // This initializes the Express application

// Middleware to parse JSON requests
// Middleware functions are executed for every incoming request before it reaches the route handler
app.use(express.json()); // This middleware parses incoming JSON data in the request body

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the specified origin
  methods: ['GET,POST,PUT,DELETE'], // Allow the specified methods
  allowedHeaders: ['Content-Type'], // Allow the specified headers
})); // Enable CORS for all requests



// Mounting the book routes
// All routes defined in the "booksRoute.js" file will be accessible under the "/books" endpoint
app.use('/books', booksRoute);

// Connecting to MongoDB
// Mongoose is used to establish a connection to the MongoDB database
mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Options for better compatibility
  .then(() => {
    console.log('Connected to MongoDB'); // Log a success message if the connection is successful

    // Root route
    // This is the default route that responds with a simple message when the server is accessed at "/"
    app.get("/", (request, response) => {
      // Log the incoming request object for debugging purposes (optional)
      console.log("Incoming request:", request.method, request.url);

      // Send a success response with a message
      return response.status(200).send("Server Responding: Hello World!");
    });
  })
  .catch((error) => {
    // Log an error message if the connection to MongoDB fails
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application if the database connection fails
  });

// Start the server
// This starts the Express server and listens for incoming requests on the specified port
app.listen(PORT, () => {
  // Log a message indicating that the server is running and listening on the specified port
  console.log(`App (Server) is listening on port ${PORT}`);
});