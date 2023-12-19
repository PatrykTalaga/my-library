"use server"
import { writeFile} from 'fs/promises'
import { join } from 'path'
import connectMongo from '../../../../utils/connectMongo';
import Book from '../../../../models/bookModel';



export default async function sumbitToDB(newBook:File){
 /*  console.log(newBook.uploadImage)
  console.log()
  console.log(newBook.uploadImage.size) */
  console.log("")
  console.log(newBook)
  console.log("")
  console.log("")
/*   if (newBook.title !== "") return;


  ////////file upload///////
  if(newBook.uploadImage.size !== 0){
    const imageId = crypto.randomUUID();
    try{
      const bytes = await newBook.uploadImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join('public/', 'bookCovers/', imageId);
      await writeFile(path, buffer);
      }catch(err){
        console.error(err)
        return(false)
  }

  
  } */
}