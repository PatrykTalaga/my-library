import { Schema, model, models } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  author: String,
  pages: Number,
  pageFormat: String,
  year: Number,
  cover: String,
  isRead: Boolean,
  availability: String,
  rating: Number,
  review: String,
  comment: Array
});

const Book = models.Book || model('Book', bookSchema);

export default Book;