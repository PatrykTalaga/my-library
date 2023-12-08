import { Schema, model, models } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: String,
  pages: Number,
  pageFormat: String,
  cover: String,
  isRead: Boolean,
  isOnTheShelf: Boolean,
  rating: Number,
  review: String,
  comment: Array
});

const Book = models.Book || model('Book', bookSchema);

export default Book;