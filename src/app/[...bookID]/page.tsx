import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';
import BookDetails from '../../components/BookDetails';
import Link from 'next/link';

import fs from 'fs';
import { join } from 'path'

type BookType = {
  
    _id: string,
    title: string,
    cover: string,
    author: string,
    isRead: boolean,
    availability: string
    pages: Number,
    pageFormat: String,
    year: Number,
    rating: Number,
    review: String,
    comment: Array<string>
  
}

export default async function BookID ( {params}:{params: {bookID:string}} ){

  async function findBook(bookID:string) {
    try{
      await connectMongo();
      const book = await Book.findOne({ _id: bookID});
      return book;
    }catch(error){
      console.error(error);
    }
  }


  const book:BookType = await findBook(params.bookID[0]);
  if(book === null) {
    return(
      <h1>Book not found</h1>
    )
  }else{
    const path = join('public/', 'bookCovers/', book.cover)
    if(book.cover !=="") {
      if(fs.existsSync(path) !== true) {
        book.cover= "bg-dark.jpg"
    }}
    

    return(
      <div className='flex flex-col items-center'>
        <div className='flex justify-between w-3/4'>
          <div className='w-56 flex align-middle justify-center bg-zinc-900 bg-opacity-80 text-4xl mb-5 px-2 py-2 border rounded-lg hover:scale-110'>
            <a href={`/${params.bookID[0]}`} className='text-3xl'>Refresh page</a>
          </div>
          <Link href={`/editBooks/${params.bookID[0]}`} className='mb-5 text-xl bg-zinc-600 px-8 py-3
           border-slate-950 rounded-lg hover:scale-110'>
            Edit</Link>
        </div>
        <BookDetails book={book} />
        <div className='flex justify-end  w-3/4'>
          <button className='mt-5 text-xl bg-red-600 px-8 py-3
           border-slate-950 rounded-lg hover:scale-110'>
            Delete</button>
        </div>
      </div>
      
      
    )
  }

}