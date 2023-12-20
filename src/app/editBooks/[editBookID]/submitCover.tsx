"use server"

import { writeFile} from 'fs/promises'
import { join } from 'path'
import fs from 'fs';
import connectMongo from '../../../../utils/connectMongo';
import Book from '../../../../models/bookModel';


export default async function sumbitCover(data: FormData, title:string){

  const file:File | null = data.get('cover') as unknown as File
  if(file.size !== 0) {
    const imageId = crypto.randomUUID();

    try{
      await connectMongo();;
      const book = await Book.findOne({ title: title});
      //save cover
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join('public/', 'bookCovers/', imageId);
      await writeFile(path, buffer);
      //remove old cover if it exist
      const oldPath = join('public/', 'bookCovers/', book.cover);
      if(fs.existsSync(oldPath)){
        console.log(fs.existsSync(oldPath))
        console.log("here")
        /* const fs = require('fs') */

          fs.unlinkSync(oldPath);
          console.log("here")

        
        
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