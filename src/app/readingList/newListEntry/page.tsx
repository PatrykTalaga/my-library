import connectMongo from '../../../../utils/connectMongo';
import List from '../../../../models/listModel';
import { AddListInput } from "@/components/AddListInput"
import { redirect } from "next/navigation";

async function addNewListEntry(data: FormData){
  "use server"
  
  if (data.get('title')?.valueOf()==="") return
  const listEntry = {
    title: data.get('title')?.valueOf(),
    author: data.get('author')?.valueOf(),
    year: data.get('year')?.valueOf(),
    isRead: false
  }
  console.log(listEntry)

  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    await List.create(listEntry);
    console.log('CREATED DOCUMENT');
  }
  catch (error) {
    console.log(error);
    return
  }
  redirect("/readingList/");
  
}

const NewListEntry = () => {
  return <>
    <div className='flex flex-col mx-auto w-1/3 bg-zinc-900 bg-opacity-80
      py-7 px-10 border rounded-md'>
      <h1 className="text-4xl mb-3">Add new book to read</h1>
      <form action={addNewListEntry} className=" flex flex-col">
        <AddListInput label='Book Title: ' name='title' />
        <AddListInput label='Author: ' name='author' />
        <div className="flex justify-between">
          <label className="text-lg">Year: </label>
          <input type="number" name='year' className=" mx-3 mb-2 border
          rounded-md bg-zinc-900 bg-opacity-80  "/>
        </div>
        <button type="submit" className="border rounded-md bg-zinc-900
          bg-opacity-80 w-1/2 mx-auto mt-3">
          Add</button>
          <button type="reset" className="border rounded-md bg-zinc-900
          bg-opacity-80 w-1/2 mx-auto mt-3">
          Reset</button>
      </form>
    </div>  
  </>
  }
  
export default NewListEntry