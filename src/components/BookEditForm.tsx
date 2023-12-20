"use client"

import { TextInputControlled } from "./TextInputControlled"
import { NumberInputControlled } from "./NumberInputControlled"
import { BooleanInputControlled } from "./BooleanInputControlled"
import { TextAreaInputControlled } from "./TextAreaInputControlled"
import { AvailabilityInputControlled } from "./AvailabilityInputControlled"
import sumbitToDB from "@/app/editBooks/[editBookID]/submitToDB"
import sumbitCover from "@/app/editBooks/[editBookID]/submitCover"

import { useEffect, useState } from "react"


type BookType = {
    title: string,
    cover: string,
    author: string,
    isRead: boolean,
    availability: string,
    pages: number,
    pageFormat: string,
    year: number,
    rating: number,
    review: string,
}


export default function BookEditForm ({title="", cover="", author="", isRead=true, availability="On the shelf", pages=0, pageFormat="", year=0, rating=0, review=""}:BookType){

  const [newBook, setNewBook] = useState({
    title: title,
    cover: cover,
    author: author,
    isRead: isRead,
    availability: availability,
    pages: pages,
    pageFormat: pageFormat,
    year: year,
    rating: rating,
    review: review,
  });
  console.log()

  
  function isReadInput(e:any){
    const isReadInput = e.target.checked
    setNewBook({...newBook, isRead: !isReadInput}); //Figure out how
  }

  async function submitForm(formData: FormData){
    const file:File | null = formData.get('cover') as unknown as File
    if(file.size !== 0) {
      try{
        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
          `${file.type}`
          throw new Error(`Wrong file format, uploaded file format:`+
           `${file.type}`);
        }
        if(file.size > 500000) {
          throw new Error(`File Size is too big, current size: `+
           `${(Math.floor(file.size/1000)/1000)}Mb`);
        }
      }catch(error){
        console.error(error);
        return;
      }
      const result = await sumbitCover(formData, title);
      console.log(result)
      if(typeof(result) === 'string') setNewBook({...newBook, cover: result})
      
    } 
  }

  return(
    <>
    <div className="bg-zinc-900 bg-opacity-80 border rounded-lg flex
      w-full mx-auto p-5">
      <div className="flex flex-col border-r">
      {newBook.cover !== "" && <img className=" my-2 mx-10 h-96 object-scale-down" 
        src={`/bookCovers/${newBook.cover}`}>
      </img>}
      <form action={submitForm} className="flex flex-col justify-center items-center">
      <input type="file" name="cover" className="bg-zinc-900 bg-opacity-80
        border rounded-md mx-2 my-1.5 text-lg w-80"/>
      <p className=''>Upload only PNG or JPG (MAX. 500kB)</p>
        <button type="submit" className="bg-zinc-900 bg-opacity-80 border rounded-lg
          mt-2 px-5 py-2">Change Cover</button>
      </form>
      </div>


      <div className="flex w-full justify-evenly ml-2">
        <div className="flex flex-col">
          <div>
            <div className="flex justify-left">
              <label className="text-lg w-28 my-auto">Title: </label>
              <input required type="text" name='title'  value={newBook.title || ""}
                onChange={(e)=>setNewBook({...newBook, title: e.target.value})}
                className="bg-zinc-900 bg-opacity-80 border rounded-md mx-3 my-1.5"/>
            </div>
          </div>
          <TextInputControlled label={"Author: "} name={"author"} value={newBook.author}
            change={(e)=>setNewBook({...newBook, author: e.target.value})} />
          <NumberInputControlled label={"Year: "} name={"year"} value={newBook.year}
            change={(e)=>setNewBook({...newBook, year: e.target.value})}/> 
          <TextInputControlled label={"Page format: "} name={"pageFormat"}
            value={newBook.pageFormat}
            change={(e)=>setNewBook({...newBook, pageFormat: e.target.value})} />
          <NumberInputControlled label={"Pages: "} name={"pages"} value={newBook.pages}
            change={(e)=>setNewBook({...newBook, pages: e.target.value})}/>
          <NumberInputControlled label={"Rating: "} name={"rating"} value={newBook.rating}
            change={(e)=>setNewBook({...newBook, year: e.target.value})}/> 
          <BooleanInputControlled label={"Is it read: "} name={"isRead"} value={newBook.isRead}
            change={isReadInput} />
          <AvailabilityInputControlled label={"Availability: "} name={"availability"} value={newBook.availability}
            change={(e)=>setNewBook({...newBook, availability: e.target.value})} />
          <button className="bg-zinc-900 bg-opacity-80 border rounded-lg mx-auto mt-7 p-5"
            onClick={()=>sumbitToDB(newBook)}>Submit</button>
        </div>

        <div className="flex flex-col ml-5">
          <TextAreaInputControlled label={"Review: "} name={"review"} value={newBook.review}
            change={(e)=>setNewBook({...newBook, review: e.target.value})} />
        </div>
      </div>
      
    </div>
    
    </>
 
  )
}