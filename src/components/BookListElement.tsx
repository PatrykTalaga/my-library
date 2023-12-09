import Link from "next/link"


export function BookListElement ({data})  {
  console.log(data)
  return (
    <Link href="/" className="bg-slate-700 border rounded-lg w-fit p-5">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-lg">{data.cover}</p>
      <p className="text-lg"><b>Author:</b> {data.author}</p>
      <p className="text-lg"><b>Read:</b> {data.isRead?"Yes":"No"}</p>
      <p className="text-lg"><b>Avaibility:</b> {data.isOnTheShelf?"On the shelf":"Not Avaiable"}</p>
    </Link>
  )
}

 