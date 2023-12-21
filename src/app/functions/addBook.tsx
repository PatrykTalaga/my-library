"use server"

import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';

type BookType ={
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

export default async function addBook({ title, author, isRead, availability, pages, pageFormat, year, rating, review }: BookType){

  if (title === "") return "Book cannot have empty title";

  try {
    await connectMongo();
    let book = await Book.findOne({ title: title});
    if(book !== null) return "Book of this title already exists";
    
    const myBook = {
      title: title,
      author: author,
      cover: "", //lack of field will mess up server whenever it checks path to img
      year: year,
      pages:  pages,
      pageFormat: pageFormat,
      isRead: isRead,
      availability: availability,
      rating: rating,
      review: review
    }

    const result = await Book.create(myBook);
    console.log(result)
    return true;

  }
  catch (error) {
    console.error(error);
    return("Server Error");
  }
}