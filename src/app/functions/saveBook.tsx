"use server"

//for editing book
import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';
import convertDate from './covertDate';

type BookType ={
  id: string,
  title: string,
  author: string,
  isRead: boolean,
  availability: string,
  pages: number,
  pageFormat: string,
  year: number,
  rating: number,
  review: string,
}

export default async function saveBook({ id, title, author, isRead,
  availability, pages, pageFormat, year, rating, review }: BookType){

  if (title === "") return "Book cannot have empty title";

  const rawDate = new Date();
  const date = convertDate(rawDate);

  try {
    await connectMongo();
    let book = await Book.findOne({ _id: id});
    if( book === null && book.title !== title) {
      return "Book of this title does not exist";
    }
    
    book.title = title;
    book.author = author;
    book.year = year;
    book.pages = pages;
    book.pageFormat = pageFormat;
    book.isRead = isRead;
    book.availability = availability;
    book.rating = rating;
    book.review = review;
    book.editedAt = date;

    await book.save();
    return true;

  }
  catch (error) {
    console.error(error);
    return("Server Error");
  }
}