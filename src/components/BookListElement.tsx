import Link from "next/link"

type bookType = {
  book: {
    _id: string,
    title: string,
    cover: string,
    author: string,
    isRead: boolean,
    isOnTheShelf: boolean
  }
}

export function BookListElement ({book}:bookType)  {
  return (
    <Link href="/" className="bg-slate-700 border rounded-lg w-fit p-5">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-lg">{book.cover}</p>
      <p className="text-lg"><b>Author:</b> {book.author}</p>
      <p className="text-lg"><b>Read:</b> {book.isRead?"Yes":"No"}</p>
      <p className="text-lg"><b>Avaibility:</b> 
        {book.isOnTheShelf?"On the shelf":"Not Avaiable"}
      </p>
    </Link>
  )
}

 