import Link from "next/link"

type bookType = {
  book: {
    _id: string,
    title: string,
    cover: string,
    author: string,
    isRead: boolean,
    availability: string
  }
}

export function BookListElement ({book}:bookType)  {
  return (
    <Link href="/" className="bg-zinc-900 bg-opacity-80 border rounded-lg
      w-fit p-5">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      {book.cover !== "" && <img className=" my-2 mx-auto h-60" 
        src={`/bookCovers/${book.cover}`}>
        </img>}
      <p className="text-lg"><b>Author:</b> {book.author}</p>
      <p className="text-lg"><b>Read:</b> {book.isRead?"Yes":"No"}</p>
      <p className="text-lg"><b>Avaibility:</b>{book.availability}</p>
    </Link>
  )
}

 