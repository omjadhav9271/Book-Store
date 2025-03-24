import express from "express";
import { PORT, MongoDB_URI } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MongoDB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // Root route
    app.get("/", (request, response) => {
      console.log(request);
      return response.status(200).send("Server Responding: Hello World!");
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Route to create a new book
app.post("/books", async (request, response) => {
  try {
    const { title, author, publishedYear } = request.body;

    // Validate request body
    if (!title || !author || !publishedYear) {
      return response.status(400).send({ message: "Data is required: Title, Author, Published Year" });
    }

    // Create and save the new book
    const newBook = { title, author, publishedYear };
    const savedBook = await Book.create(newBook);

    return response.status(201).send(savedBook);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`App (Server) is listening to port ${PORT}`);
});