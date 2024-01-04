import connectMongo from "../../utils/connectMongo";
import Book from "../../models/bookModel";
import { BookListElement } from "@/components/BookListElement";
import ClearCoverStorageBtn from "@/components/ClearCoverStorageBtn";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);

  try {
    await connectMongo();
    const books = await Book.find();
    return (
      <>
        <div className="flex justify-start">
          <div
            className="w-56 flex align-middle justify-center bg-zinc-900
      bg-opacity-80 text-4xl my-auto px-2 py-2 border rounded-lg hover:scale-110"
          >
            <a href="/" className="text-3xl">
              Refresh page
            </a>
          </div>
          {session && session.user.role == "Admin" && <ClearCoverStorageBtn />}
        </div>

        <ul className="grid auto-rows-max grid-flow-row grid-cols-5 gap-5 mt-10 lgList:grid-cols-4 mdList:grid-cols-3 usm:grid-cols-2">
          {books.map((book) => (
            <BookListElement
              key={book._id}
              id={book._id.toString()}
              book={book}
            />
          ))}
        </ul>
      </>
    );
  } catch (error) {
    console.error(error);
  }
  return <>Server Error</>;
}
