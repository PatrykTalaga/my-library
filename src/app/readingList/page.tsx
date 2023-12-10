import Link from "next/link";

export default function ReadingList() {
  return <>
    <div className='flex flex-col mx-auto w-1/3'>
      <h1 className="text-3xl mb-3">Books to read:</h1>
      <div className="flex flex-col w-fit">
        <ul className="mb-5">
          <li className="flex">
            <input type="checkbox" />
            <p className="text-xl m-3">
              <b>Book Title</b>, <b>Author:</b> Author, <b>Year:</b> Year
            </p>
          </li>
          <li className="flex">
            <input type="checkbox" />
            <p className="text-xl m-3">
              <b>Book Title</b>, <b>Author:</b> Author, <b>Year:</b> Year
            </p>
          </li>
          <li className="flex">
            <input type="checkbox" />
            <p className="text-xl m-3">
              <b>Book Title</b>, <b>Author:</b> Author, <b>Year:</b> Year
            </p>
          </li>
        </ul>
        <Link href={"/readingList/newListEntry"} className="text-2xl border rounded-lg px-3 py-2 flex justify-center">
          Add new book to read
        </Link>
      </div>
    </div> 
  </>
}