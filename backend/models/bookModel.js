import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
})

export const Book = mongoose.model('Book', bookSchema);
// The bookModel.js file defines a Mongoose schema for a book object, which includes the title, author, and publishedYear fields. The schema also includes a timestamps option, which automatically adds createdAt and updatedAt fields to the document. The Book model is then exported for use in other parts of the application.