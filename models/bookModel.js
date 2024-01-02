import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  id: String,
  createdAt: Date,
  editedAt: Date,
  user: String,
  comment: String,
});

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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
  createdAt: Date,
  editedAt: Date,
  comment: [commentSchema],
});

const Book = models.Book || model("Book", bookSchema);

export default Book;
