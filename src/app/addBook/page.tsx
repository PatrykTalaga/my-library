import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';
import { TextInput } from '@/components/TextInput';
import { NumberInput } from '@/components/NumberInput';
import { BooleanInput } from '@/components/BooleanInput';
import { AvailabilityInput } from '@/components/AvailabilityInput';
import { TextAreaInput } from '@/components/TextAreaInput';

export default async function AddBook() {

  async function submitForm(data: FormData){
    "use server"

    const isRead = data.get('isRead')?.valueOf()==='yes'?true:false
    if (data.get('title')?.valueOf()==="") return

    const myBook = {
      title: data.get('title')?.valueOf(),
      author: data.get('author')?.valueOf(),
      pages: data.get('pages')?.valueOf(),
      pageFormat: data.get('pageFormat')?.valueOf(),
      cover: data.get('cover')?.valueOf(),
      isRead: isRead,
      isOnTheShelf: data.get('availability')?.valueOf(),
      rating: data.get('rating')?.valueOf(),
      review: data.get('review')?.valueOf(),
      comment: []
    }
    console.log("myBook object")
    console.log(myBook)

    try {
      console.log('CONNECTING TO MONGO');
      await connectMongo();
      console.log('CONNECTED TO MONGO');
  
      console.log('CREATING DOCUMENT');
      await Book.create(myBook);
      console.log('CREATED DOCUMENT');
    }
    catch (error) {
      console.log(error);
    } 
  }


  return <>
    <div className='flex flex-col mx-auto'>
      <h1 className="text-5xl mb-5 mx-auto">Add new book</h1>
      <form action={submitForm} className='flex flex-col'>
        <div className="flex justify-center w-auto mt-3">
          <div className='grid grid-cols-[1fr, 2fr] ' >
            <TextInput label='Book Title' name='title' />
            <TextInput label='Author' name='author' />
            <TextInput label='Pages' name='pages'/>
            <TextInput label='Page Format' name='pageFormat' />
            <TextInput label='Publisher' name='publisher' />
            <NumberInput label='Year' name='year' />
            <TextInput label='Book Cover' name='cover' />
          </div>
          <div className='grid grid-cols-[1fr, 2fr] ml-6'>
           <BooleanInput label='Is it read' name='isRead'/>
            <AvailabilityInput label='Availability' name='availability' />
            <NumberInput label='Rating' name='rating' />
            <TextAreaInput label='Review' name='review' />
          </div>
        </div>
        <div className='mx-auto mt-5'>
          <button type="submit" className="bg-slate-700 text-2xl mt-3 mr-2 
             px-5 py-2 border rounded-lg mx-auto">
            Add</button>
          <button type="reset" className="bg-slate-700 text-2xl mt-3 ml-2
            px-5 py-2 border rounded-lg mx-auto">
            Reset</button>
        </div>
      </form>
    </div>
  </>
}
