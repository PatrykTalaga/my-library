"use client"
import saveDB from "./saveDB"
import { useRef, useState } from "react";
import { TextInput } from '@/components/TextInput';
import { NumberInput } from '@/components/NumberInput';
import { BooleanInput } from '@/components/BooleanInput';
import { AvailabilityInput } from '@/components/AvailabilityInput';
import { TextAreaInput } from '@/components/TextAreaInput';
import { UploadImage } from '@/components/UploadImage';
import SubmitButton from "@/components/SubmitButtton";
import validateTittle from "../validateTitle";

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
}