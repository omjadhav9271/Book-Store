// Importing Mongoose
// Mongoose is a library that provides a schema-based solution to model application data for MongoDB
import mongoose from 'mongoose';

// Defining the schema for a book
// A schema defines the structure of the documents in a MongoDB collection
const bookSchema = new mongoose.Schema({
  // Title field
  // This field stores the title of the book as a string and is required
  title: {
    type: String, // Data type is String
    required: true, // This field is mandatory
  },
  // Author field
  // This field stores the name of the author as a string and is required
  author: {
    type: String, // Data type is String
    required: true // This field is mandatory
  },
  // Published Year field
  // This field stores the year the book was published as a number and is required
  publishedYear: {
    type: Number, // Data type is Number
    required: true // This field is mandatory
  }
}, {
  // Timestamps option
  // This option automatically adds `createdAt` and `updatedAt` fields to the schema
  timestamps: true,
});

// Creating the Book model
// A model is a wrapper for the schema and provides an interface to interact with the database
export const Book = mongoose.model('Book', bookSchema);

// Explanation for Beginners:
// 1. `bookSchema`:
//    - Defines the structure of a book document in the MongoDB database.
//    - Includes three fields: `title`, `author`, and `publishedYear`, all of which are required.
//    - The `timestamps` option automatically tracks when a document is created (`createdAt`) or updated (`updatedAt`).
//
// 2. `Book` Model:
//    - A model is created from the schema using `mongoose.model()`.
//    - The first argument, `'Book'`, is the name of the model (and the collection in MongoDB will be named `books` in lowercase and pluralized).
//    - The second argument is the schema (`bookSchema`).
//    - The model provides methods like `create()`, `find()`, `findById()`, `findByIdAndUpdate()`, etc., to interact with the database.
//
// 3. Exporting the Model:
//    - The `Book` model is exported so it can be used in other parts of the application, such as routes or controllers.