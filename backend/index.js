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

app.get("/books", async (request, response) => {
  try {
    // Fetch all books from the database
    // The Book model is used to query the database and retrieve all book documents
    const books = await Book.find({}); // Find all books in the database

    // Send a success response with the list of books
    return response.status(200).json({
      count: books.length, // Include the count of books in the response
      data: books // Include the list of books in the response
    });
  } catch (error) {
    // If an error occurs during the process, log the error message for debugging
    console.log(error.message);
    // Send a 500 Internal Server Error response with the error message
    return response.status(500).send({ message: error.message });
  }
});

app.get("/books/:id", async (request, response) => {
  try {
    // Extract the book ID from the request parameters
    const { id } = request.params;

    // Fetch the book with the specified ID from the database
    // The Book model is used to query the database and retrieve the book document by its ID
    const book = await Book.findById(id); // Correctly pass the ID directly

    // Check if the book exists
    if (!book) {
      // If no book is found, send a 404 Not Found response with an error message
      return response.status(404).send({ message: "Book not found" });
    }

    // Send a success response with the book data
    return response.status(200).json(book);
  } catch (error) {
    // If an error occurs during the process, log the error message for debugging
    console.log(error.message);
    // Send a 500 Internal Server Error response with the error message
    return response.status(500).send({ message: error.message });
  }
});

app.put("/books/:id", async (request, response) => {
  try {
    // Extract the book ID from the request parameters
    const { id } = request.params;

    // Extract the updated data from the request body
    const { title, author, publishedYear } = request.body;

    // Validate request body
    if (!title || !author || !publishedYear) {
      return response.status(400).send({ message: "Data is required: Title, Author, Published Year" });
    }

    // Find the book by ID and update it with the new data
    const updatedBook = await Book.findByIdAndUpdate(
      id, // Find the book by ID
      { title, author, publishedYear }, // Update the book with the new data
      { new: true } // Return the updated book (new: true)
    );

    // Check if the book exists
    if (!updatedBook) {
      return response.status(404).send({ message: "Book not found" });
    }

    // Send a success response with the updated book data and a success message
    return response.status(200).json({
      message: "Book updated successfully",
      data: updatedBook
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

app.delete("/books/:id", async (request, response) => {
  try {
    // Extract the book ID from the request parameters
    const { id } = request.params;

    // Find the book by ID and delete it
    const deletedBook = await Book.findByIdAndDelete(id);

    // Check if the book exists
    if (!deletedBook) {
      return response.status(404).send({ message: "Book not found" });
    }

    // Send a success response with a message indicating that the book has been deleted
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});


// Start the server
// This starts the Express server and listens for incoming requests on the specified port
app.listen(PORT, () => {
  // Log a message indicating that the server is running and listening on the specified port
  console.log(`App (Server) is listening to port ${PORT}`);
});