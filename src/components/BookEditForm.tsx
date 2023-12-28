"use client"

import { useState } from "react"
import { TextInputControlled } from "./TextInputControlled"
import { NumberInputControlled } from "./NumberInputControlled"
import { BooleanInputControlled } from "./BooleanInputControlled"
import { TextAreaInputControlled } from "./TextAreaInputControlled"
import { AvailabilityInputControlled } from "./AvailabilityInputControlled"
import sumbitCover from "@/app/functions/submitCover"
import saveBook from "@/app/functions/saveBook"
import { useRouter } from "next/navigation";

type BookType = {
  id:string,
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

export default function BookEditForm ({
  id=",",
  title="",
  cover="empty",
  author="",
  isRead=true,
  availability="On the shelf",
  pages=0,
  pageFormat="",
  year=0, 
  rating=0,
  review=""}:BookType){

  const [newBook, setNewBook] = useState({
    id: id,
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
  const router = useRouter();

  const [imgErrorMessage, setImgErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");

  
  function isReadInput(e:any){
    const isReadInput = e.target.checked
    setNewBook({...newBook, isRead: isReadInput});
  }

  async function submitForm(formData: FormData){
    const file:File | null = formData.get('cover') as unknown as File
    if(file.size !== 0) {
      try{
        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
          `${file.type}`
          setImgErrorMessage(`Wrong file format, uploaded file format:`+
          `${file.type}`);
          return;
        }
        if(file.size > 500000) {
          setImgErrorMessage(`File Size is too big, current size: `+
          `${(Math.floor(file.size/1000)/1000)}Mb`);
          return;
        }
      }catch(error){
        console.error(error);
        return;
      }
      const result = await sumbitCover(formData, title);
      if(typeof(result) === 'string') {
        setNewBook({...newBook, cover: result});
        setImgErrorMessage("");
        router.refresh();
      }
    } 
  }

  async function saveEdit(){
    if(newBook.title == "") {
      setTitleError("Book cannot have empty title");
      return;
      }

    const saveResult = await saveBook({...newBook,})
    if(saveResult !== true) {
      setTitleError(saveResult);
      return;
      }
    setTitleError("")
    alert("Edit Saved")
    router.refresh();
  }

  return(
    <>
    <div className="bg-zinc-900 bg-opacity-80 border rounded-lg flex w-full
      mx-auto p-5 my-7 md:flex-col md:justify-center md:items-center md:w-1/2">
        
{/* cover */}
      <div className="flex flex-col lg:border-r">
      {newBook.cover !== "" && <img className=" my-2 mx-10 h-96
        object-scale-down" src={`/bookCovers/${newBook.cover}`}>
      </img>}
      <p className="text-3xl text-red-600 mx-auto mt-4">
        {imgErrorMessage && imgErrorMessage}</p>
      <form action={submitForm} className="flex flex-col justify-center
        items-center">
      <input type="file" name="cover" className="bg-zinc-900 bg-opacity-80
        border rounded-md mx-2 my-1.5 text-lg w-80"/>
      <p className=''>Upload only PNG or JPG (MAX. 500kB)</p>
        <button type="submit" className="bg-zinc-900 bg-opacity-80 border
          rounded-lg mt-2 px-5 py-2 hover:scale-110">Change Cover
        </button>
      </form>
      </div>

{/* form left side */}
      <div className="flex w-full justify-evenly items-start ml-2 md:flex-col
        md:justify-center md:items-center">
        <div className="flex flex-col justify-start">
          <p className="text-3xl text-red-600 mx-auto mt-4">
          {titleError && titleError}</p>
          <div>
            <div className="flex justify-left">
              <label className="text-lg w-28 my-auto">Title: </label>
              <input required type="text" name='title'
                value={newBook.title || ""}
                onChange={(e)=>setNewBook({...newBook, title: e.target.value})}
                className="bg-zinc-900 bg-opacity-80 border rounded-md mx-3
                my-1.5"/>
            </div>
          </div>
          <TextInputControlled label={"Author: "} name={"author"}
            value={newBook.author}
            change={(e)=>setNewBook({...newBook, author: e.target.value})} />
          <NumberInputControlled label={"Year: "} name={"year"}
            value={newBook.year}
            change={(e)=>setNewBook({...newBook, year: e.target.value})}/> 
          <TextInputControlled label={"Page format: "} name={"pageFormat"}
            value={newBook.pageFormat}
            change={(e)=>setNewBook({...newBook, pageFormat: e.target.value})} />
          <NumberInputControlled label={"Pages: "} name={"pages"}
            value={newBook.pages}
            change={(e)=>setNewBook({...newBook, pages: e.target.value})}/>
          <NumberInputControlled label={"Rating: "} name={"rating"}
            value={newBook.rating}
            change={(e)=>setNewBook({...newBook, rating: e.target.value})}/> 
          <BooleanInputControlled label={"Is it read: "} name={"isRead"}
            value={newBook.isRead}
            change={isReadInput} />
          <AvailabilityInputControlled label={"Availability: "}
            name={"availability"} value={newBook.availability}
            change={(e)=>setNewBook({...newBook, availability: e.target.value})} />
        </div>

{/* form right side */}
        <div className="flex flex-col ml-5">
          <TextAreaInputControlled label={"Review: "} name={"review"}
            value={newBook.review}
            change={(e)=>setNewBook({...newBook, review: e.target.value})} />
          <button className="bg-zinc-900 bg-opacity-80 border rounded-lg
            mx-auto mt-7 p-5 hover:scale-110" onClick={saveEdit}>Submit
          </button>
        </div>
      </div>
    </div>
    </>
  )
}