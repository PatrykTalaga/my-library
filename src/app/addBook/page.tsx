"use client"
import BookForm from './BookForm';

export default async function AddBook() {

  return <>
    <div className='flex flex-col mx-auto bg-zinc-900 bg-opacity-80 px-10
      py-7 border rounded-md'>
      <h1 className="text-5xl mb-5 mx-auto">Add new book</h1>
      <BookForm />
    </div>
  </>
}
