import connectMongo from '../../utils/connectMongo';
import Book from '../../models/bookModel';
import { BookListElement } from "@/components/BookListElement";

export default async function Home() {
  
  try{
    await connectMongo();
    const books = await Book.find();
    return <>
    <div className='w-56 flex align-middle justify-center bg-zinc-900
      bg-opacity-80 text-4xl mb-5 px-2 py-2 border rounded-lg hover:scale-110'>
      <a href='/' className='text-3xl'>Refresh page</a>
    </div>
    
    <ul className="grid auto-rows-max grid-flow-row grid-cols-4 gap-5 mt-5">
      {books.map(book=>(
        <BookListElement key={book._id} id={book._id.toString()} book={book} />
      ))}
    </ul>
  </>
  }catch(error){
    console.error(error)
  }
  return <>Server Error</>

  
}