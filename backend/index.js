// Importing required modules
import express from "express"; // Express is a web framework for building APIs
import { PORT, MongoDB_URI } from './config.js'; // Importing configuration variables (port and MongoDB URI)
import mongoose from 'mongoose'; // Mongoose is an ODM (Object Data Modeling) library for MongoDB
import { Book } from './models/bookModel.js'; // Importing the Book model to interact with the database

// Creating an instance of the Express application
const app = express(); // This initializes the Express application

// Middleware to parse JSON requests
// Middleware functions are executed for every incoming request before it reaches the route handler
app.use(express.json()); // This middleware parses incoming JSON data in the request body

// Connect to MongoDB
// Mongoose is used to establish a connection to the MongoDB database
mongoose.connect(MongoDB_URI)
  .then(() => {
    console.log('Connected to MongoDB'); // Log a success message if the connection is successful

    // Root route
    // This is the default route that responds with a simple message when the server is accessed at "/"
    app.get("/", (request, response) => {
      console.log(request); // Logs the incoming request object for debugging purposes
      return response.status(200).send("Server Responding: Hello World!"); // Sends a success response with a message
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error); // Log an error message if the connection fails
  });

// Route to create a new book
// This route handles POST requests to "/books" to create a new book in the database
app.post("/books", async (request, response) => {
  try {
    // Extracting data from the request body
    // The request body contains the data sent by the client (e.g., title, author, publishedYear)
    const { title, author, publishedYear } = request.body;

    // Validate request body
    // Check if all required fields (title, author, publishedYear) are provided
    if (!title || !author || !publishedYear) {
      // If any field is missing, send a 400 Bad Request response with an error message
      return response.status(400).send({ message: "Data is required: Title, Author, Published Year" });
    }

    // Create and save the new book
    // The Book model is used to create a new book document in the MongoDB database
    const newBook = { title, author, publishedYear }; // Create a new book object with the provided data
    const savedBook = await Book.create(newBook); // Save the book to the database using Mongoose

    // Send a success response with the saved book data
    // The 201 status code indicates that a new resource (book) has been successfully created
    return response.status(201).send(savedBook);
  } catch (error) {
    // If an error occurs during the process, log the error message for debugging
    console.log(error.message);
    // Send a 500 Internal Server Error response with the error message
    return response.status(500).send({ message: error.message });
  }
});

// Start the server
// This starts the Express server and listens for incoming requests on the specified port
app.listen(PORT, () => {
  // Log a message indicating that the server is running and listening on the specified port
  console.log(`App (Server) is listening to port ${PORT}`);
});