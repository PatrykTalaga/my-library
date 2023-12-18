import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';
import BookDetails from '../../components/BookDetails';
import Link from 'next/link';

type BookType = {
  book: {
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
  } | null
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

  const book = await findBook(params.bookID);
  if(book === null) {
    return(
      <h1>Book not found</h1>
    )
  }else{
    return(
      <div className='flex flex-col items-center'>
        <div className='flex justify-end  w-3/4'>
          <Link href={`/editBooks/${book._id}`} className='mb-5 text-xl bg-zinc-600 px-8 py-3
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