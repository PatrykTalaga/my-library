/* "use client"
import saveDB from "./saveDB"
import { useRef, useState } from "react";
import { TextInput } from '@/components/TextInput';
import { NumberInput } from '@/components/NumberInput';
import { BooleanInput } from '@/components/BooleanInput';
import { AvailabilityInput } from '@/components/AvailabilityInput';
import { TextAreaInput } from '@/components/TextAreaInput';
import { UploadImage } from '@/components/UploadImage';
import SubmitButton from "@/components/SubmitButtton";
import validateTittle from "./validateTitle";

export default function BookForm() {

  const ref = useRef<HTMLFormElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");



  async function submitForm(formData: FormData){

    if(formData.get('title')?.valueOf()==="") return;
    if(formData.get('title') === null) return; //not to mess validateTitle
    const isAvaible = await validateTittle(formData.get('title'));
    
    if(isAvaible !== true) {
      setTitleError(isAvaible);
      return;
    }

    const file:File | null = formData.get('file') as unknown as File
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
        setErrorMessage(error.message);
        return;
      }
    }

    const result = await saveDB(formData);
    if(result === true) alert("Book succesfully added to the library")
    setErrorMessage("");
    setTitleError("");
  }

  return(
    <form ref={ref} action={async (formData) => {
      await submitForm(formData);
      ref.current?.reset();
    }} className='flex flex-col '>
      <div className="flex justify-center w-auto mt-3">
        <div className='grid grid-cols-[1fr, 2fr] ' >
          <p className="text-3xl text-red-600">
            {titleError && titleError}</p>
          <div className="flex justify-left">
            <label className="text-lg w-32 my-auto">Book Title</label>
            <input type="text" name='title' required className="bg-zinc-900
              bg-opacity-80 border rounded-md mx-3 my-1.5"/>
          </div>
          <TextInput label='Author' name='author' />
          <NumberInput label='Pages' name='pages'/>
          <TextInput label='Page Format' name='pageFormat' />
          <TextInput label='Publisher' name='publisher' />
          <NumberInput label='Year' name='year' />
          <p className="text-3xl text-red-600 mx-auto mt-4">
            {errorMessage && errorMessage}</p>
          <UploadImage label='Book Cover' name='cover' />
        </div>
        <div className='grid grid-cols-[1fr, 2fr] ml-6'>
         <BooleanInput label='Is it read' name='isRead'/>
          <AvailabilityInput label='Availability' name='availability' />
          <NumberInput label='Rating' name='rating' />
          <TextAreaInput label='Review' name='review' />
        </div>
      </div>
      <div className='mx-auto mt-5'>
        <SubmitButton />
        <button type="reset" className="bg-zinc-900 bg-opacity-80 text-2xl
          mt-3 ml-2 px-5 py-2 border rounded-lg mx-auto hover:scale-110">
          Reset</button>
      </div>
    </form>
  )
} */

////////////////////////////////////////////////////////////////////////////////////////////////////////
"use client"

import { useState } from "react"
import { TextInputControlled } from "@/components//TextInputControlled"
import { NumberInputControlled } from "@/components/NumberInputControlled"
import { BooleanInputControlled } from "@/components/BooleanInputControlled"
import { TextAreaInputControlled } from "@/components/TextAreaInputControlled"
import { AvailabilityInputControlled } from "@/components/AvailabilityInputControlled"
import validateTittle from "@/app/functions/validateTitle";
import sumbitCover from "@/app/functions/submitCover"
import saveBook from "@/app/functions/saveBook"
import addBook from "../functions/addBook"

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

export default function BookForm (){

  const [newBook, setNewBook] = useState({
    title: "",
    cover: "",
    author: "",
    isRead: false,
    availability: "",
    pages: 0,
    pageFormat: "",
    year: 0,
    rating: 0,
    review: "",
  });

  const [imgErrorMessage, setImgErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");

  
  function isReadInput(e:any){
    const isReadInput = e.target.checked
    setNewBook({...newBook, isRead: isReadInput});
  }

  async function submitForm(formData: FormData){
    /* saveEdit(); */

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
        setImgErrorMessage(error.message);
        return;
      }
      const result = await sumbitCover(formData, newBook.title);
      console.log(result)
      if(result === "book not found"){
        setImgErrorMessage(`There is no Book of coresponding title in the 
          database, please add book first`);
        return
      }
      if(typeof(result) === 'string') {
        setNewBook({...newBook, cover: result});
        setImgErrorMessage("");}
    } 
  }

  async function saveEdit(){
    console.log("Here")
    console.log(newBook.title)
    if(newBook.title == "") {
      setTitleError("Book cannot have empty title");
      return;
      }

    /* const validate = await validateTittle(newBook.title)
    if(validate !== true) {
      setTitleError(validate); 
      return;
    } */

    const saveResult = await addBook({...newBook})
    if(saveResult !== true) {
      setTitleError(saveResult);
      return;
      }
    setTitleError("")

    //////////////////////////////


    alert("Edit Saved")
  }

  return(
    <>
    <div className="bg-zinc-900 bg-opacity-80 border rounded-lg flex
      w-full mx-auto p-5">
          
{/* cover */}
      <div className="flex flex-col border-r">
      {newBook.cover !== "" && <img className=" my-2 mx-10 h-96
        object-scale-down" src={`/bookCovers/${newBook.cover}`}>
      </img>}
      <p className="text-3xl text-red-600 mx-auto mt-4">
        {imgErrorMessage && imgErrorMessage}</p>
      <form action={submitForm} className="flex flex-col justify-center
        items-center">
      <div className="flex flex-col justify-center
        items-center">
      <input type="file" name="cover" className="bg-zinc-900 bg-opacity-80
        border rounded-md mx-2 my-1.5 text-lg w-80"/>
      <p className=''>Upload only PNG or JPG (MAX. 500kB)</p>
        <button type="submit" className="bg-zinc-900 bg-opacity-80 border
          rounded-lg mt-2 px-5 py-2">Change Cover
        </button>
      </div>
      </form>
      </div>

{/* form left side */}
      <div className="flex w-full justify-evenly ml-2">
        <div className="flex flex-col">
        <p className="text-3xl text-red-600 mx-auto mt-4">
        {titleError && titleError}</p>
          <div>
            <div className="flex justify-left">
              <label className="text-lg w-28 my-auto">Title: </label>
              <input required type="text" name='title'  value={newBook.title || ""}
                onChange={(e)=>setNewBook({...newBook, title: e.target.value})}
                className="bg-zinc-900 bg-opacity-80 border rounded-md mx-3 my-1.5"/>
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
          <button onClick={saveEdit} className="bg-zinc-900 bg-opacity-80 border rounded-lg
            mx-auto mt-7 p-5">Submit
          </button>
        </div>

{/* form left side */}
        <div className="flex flex-col ml-5">
          <TextAreaInputControlled label={"Review: "} name={"review"}
            value={newBook.review}
            change={(e)=>setNewBook({...newBook, review: e.target.value})} />
        </div>
      </div>
    </div>
    </>
  )
}