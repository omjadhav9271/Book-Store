// Importing required modules
import express from "express"; // Express is used to create routes and handle HTTP requests
import { Book } from "../models/bookModel.js"; // Importing the Book model to interact with the database

// Creating a router instance
const router = express.Router(); // Router is used to define routes for the "/books" endpoint

// Route to create a new book
// Handles POST requests to "/books" to create a new book in the database
router.post("/", async (request, response) => {
  try {
    // Extracting data from the request body
    const { title, author, publishedYear } = request.body;

    // Validate request body
    // Check if all required fields (title, author, publishedYear) are provided
    if (!title || !author || !publishedYear) {
      return response.status(400).send({ message: "Data is required: Title, Author, Published Year" });
    }

    // Create and save the new book
    const newBook = { title, author, publishedYear }; // Create a new book object with the provided data
    const savedBook = await Book.create(newBook); // Save the book to the database using Mongoose

    // Send a success response with the saved book data
    return response.status(201).send(savedBook); // 201 status code indicates a new resource was created
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error.message);
    // Send a 500 Internal Server Error response with the error message
    return response.status(500).send({ message: error.message });
  }
});

// Route to fetch all books
// Handles GET requests to "/books" to retrieve all books from the database
router.get("/", async (request, response) => {
  try {
    // Fetch all books from the database
    const books = await Book.find({}); // Find all books in the database

    // Send a success response with the list of books
    return response.status(200).json({
      count: books.length, // Include the count of books in the response
      data: books // Include the list of books in the response
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error.message);
    // Send a 500 Internal Server Error response with the error message
    return response.status(500).send({ message: error.message });
  }
});

// Route to fetch a book by ID
// Handles GET requests to "/books/:id" to retrieve a specific book by its ID
router.get("/:id", async (request, response) => {
  try {
    // Extract the book ID from the request parameters
    const { id } = request.params;

    // Fetch the book with the specified ID from the database
    const book = await Book.findById(id); // Find the book by its ID

    // Check if the book exists
    if (!book) {
      return response.status(404).send({ message: "Book not found" }); // 404 status code indicates resource not found
    }

    // Send a success response with the book data
    return response.status(200).json(book);
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error.message);
    // Send a 500 Internal Server Error response with the error message
    return response.status(500).send({ message: error.message });
  }
});

// Route to update a book by ID
// Handles PUT requests to "/books/:id" to update a specific book by its ID
router.put("/:id", async (request, response) => {
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

    // Send a success response with the updated book data
    return response.status(200).json({
      message: "Book updated successfully",
      data: updatedBook
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error.message);
    // Send a 500 Internal Server Error response with the error message
    return response.status(500).send({ message: error.message });
  }
});

// Route to delete a book by ID
// Handles DELETE requests to "/books/:id" to delete a specific book by its ID
router.delete("/:id", async (request, response) => {
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
    // Log the error for debugging purposes
    console.log(error.message);
    // Send a 500 Internal Server Error response with the error message
    return response.status(500).send({ message: error.message });
  }
});

// Export the router to be used in other parts of the application
export default router;