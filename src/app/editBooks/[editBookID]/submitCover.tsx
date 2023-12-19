"use server"

import { writeFile} from 'fs/promises'
import { join } from 'path'
import connectMongo from '../../../../utils/connectMongo';
import Book from '../../../../models/bookModel';
import { unlink } from 'fs';
import { redirect } from 'next/dist/server/api-utils';


export default async function sumbitCover(data: FormData, title:string){

  const file:File | null = data.get('cover') as unknown as File
  if(file.size !== 0) {
    const imageId = crypto.randomUUID();
    console.log(file)

    try{
      console.log('CONNECTING TO MONGO');
      await connectMongo();
      console.log('CONNECTED TO MONGO');
      console.log('LOOKINF FOR DOCUMENT');
      const book = await Book.findOne({ title: title});
      console.log('Found DOCUMENT');

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join('public/', 'bookCovers/', imageId);
      console.log("Before save")
      await writeFile(path, buffer);
      console.log("After save")
      console.log(title)
      

      if(book.cover !== ""){
        const fs = require('fs')
        const oldPath = join('public/', 'bookCovers/', book.cover);
        try{
          fs.unlinkSync(oldPath);
        }
        catch(err){
        }
        
      }
      
      book.cover = imageId;

      await book.save();
      return(imageId);
      }catch(err){
        console.error(err);
        return(false);
      }
  }

    
}