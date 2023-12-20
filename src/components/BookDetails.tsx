import fs from 'fs';
import { join } from 'path'

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
  }
}

export default function BookDetails ({book}:BookType)  {
  console.log('******************************************************************************')
  console.log(typeof(book))
  console.log('***_')
  console.log(typeof(book.cover))
  console.log('******************************************************************************')
  const path = join('public/', 'bookCovers/', book.cover)
  
  
  return (
    <div className="bg-zinc-900 bg-opacity-80 border rounded-lg flex jus
      w-3/4 p-5">
      {fs.existsSync(path) && <img className=" my-2 mx-10 h-96" 
        src={`/bookCovers/${book.cover}`}>
      </img>}
      <div>
        <h1 className="text-2xl font-bold">{book.title}</h1>
        {book.author !== "" && <p className="text-lg"><b>Author:</b> {book.author}</p>}
        {book.year && <p className="text-lg"><b>Year:</b>{book.year.toString()}</p>}
        {book.pages && <p className="text-lg"><b>Pages:</b>{book.pages.toString()}</p>}
        {book.pageFormat !== "" && <p className="text-lg"><b>Page format:</b>{book.pageFormat}</p>}
        <p className="text-lg"><b>Read:</b> {book.isRead?"Yes":"No"}</p>
        <p className="text-lg"><b>Avaibility:</b>{book.availability}</p>
        {book.rating && <p className="text-lg"><b>Rating:</b>{book.rating.toString()}</p>}
        {book.review !== "" && <p className="text-lg"><b>Review:</b> {book.review}</p>}
      </div>
      {book.comment.length === 0 && <div className="mx-10">
        <p className="text-2xl font-bold">Comments: </p>
        {book.comment.length !== 0 && book.comment.map(comment => (
          <p>{comment}</p>
        ))}
      </div>}
    </div>
  )
}