"use server"

import { writeFile} from 'fs/promises'
import { join } from 'path'
import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';

export default async function saveDB(data: FormData){

  if (data.get('title')?.valueOf()==="") return;
  const imageId = crypto.randomUUID();

  ////////file upload///////
  const file:File | null = data.get('file') as unknown as File
  if(file.size !== 0) {
    try{
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join('public/', 'bookCovers/', imageId);
      await writeFile(path, buffer);
      }catch(err){
        console.error(err)
        return(false)
      }
  }
  
  /////////////////////DB///////////////
  const isRead = data.get('isRead')?.valueOf()==='yes'?true:false

  const myBook = {
    title: data.get('title')?.valueOf(),
    author: data.get('author')?.valueOf(),
    pages: data.get('pages')?.valueOf(),
    pageFormat: data.get('pageFormat')?.valueOf(),
    cover: file.size !== 0 ? imageId : "",
    isRead: isRead,
    availability: data.get('availability')?.valueOf(),
    rating: data.get('rating')?.valueOf(),
    review: data.get('review')?.valueOf(),
    comment: []
  }

  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    await Book.create(myBook);
    console.log('CREATED DOCUMENT');
  }
  catch (error) {
    console.error(error);
    return(false);
  }
  return(true)
}