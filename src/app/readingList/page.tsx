import connectMongo from '../../../utils/connectMongo';
import List from '../../../models/listModel';
import Link from "next/link";
import { ReadingListEntry } from '@/components/ReadingListEntry';

export default async function ReadingList() {

  await connectMongo();
  const list = await List.find();

  return <>
    <div className='flex flex-col mx-auto w-1/3 bg-zinc-900 bg-opacity-80
      py-7 px-10 border rounded-md'>
      <h1 className="text-3xl mb-3">Books to read:</h1>
      <div className="flex flex-col w-fit">
        {list.map(entry => (
          <ReadingListEntry key={entry._id} entry={entry} />
        ))}
        
        
        <Link href={"/readingList/newListEntry"} className="text-2xl border
          rounded-lg px-3 py-2 flex justify-center">
          Add new book to read
        </Link>
      </div>
    </div> 
  </>
}