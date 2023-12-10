import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';
import { TextInput } from '@/components/TextInput';
import { NumberInput } from '@/components/NumberInput';
import { BooleanInput } from '@/components/BooleanInput';
import { SelectInput } from '@/components/SelectInput';
import { TextAreaInput } from '@/components/TextAreaInput';

export default async function Home() {

  async function addBook(){
    const myBook = {
      title: "myBook4",
      author: "author4",
      pages: 150,
      pageFormat: "A5",
      cover: "Cover",
      isRead: true,
      isOnTheShelf: false,
      rating: 9,
      review: "String4",
      comment: []
    };
  
    try {
      console.log('CONNECTING TO MONGO');
      await connectMongo();
      console.log('CONNECTED TO MONGO');
  
      console.log('CREATING DOCUMENT');
      const book = await Book.create(myBook);
      console.log('CREATED DOCUMENT');
    }
    catch (error) {
      console.log(error);
    }
};

const labels = ["Book Title", "Author", "Pages", "PageFormat", "Publisher"]

  return <>
    <div className='flex flex-col mx-auto w-1/2'>
      <h1 className="text-4xl mb-3">Add new book</h1>
      <form className="flex flex-col justify-self-center">
        {labels.map(label => (
          <TextInput label={label} />
        ))}
        <NumberInput label='Year' />
        <TextInput label='Book Cover' />
        <BooleanInput label='Is it read' />
        <SelectInput label='Avaibility' />
        <NumberInput label='Rating' />
        <TextAreaInput label='Review' />
        <button type="submit" className="bg-slate-700 text-2xl mt-3 py-1 
          border rounded-lg ">Add</button>
        <button type="reset" className="bg-slate-700 text-2xl mt-3 py-1 
          border rounded-lg ">Reset</button>
      </form>
    </div>
  </>
}

{/* <TextInput label={"Book Title"} />
        <TextInput label={"Author"} />
        <TextInput label={"Pages"} />
        <TextInput label={"PageFormat"} />
        <TextInput label={"Publisher"} /> */}