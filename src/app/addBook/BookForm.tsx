"use client"
import saveDB from "./saveDB"
import { useRef } from "react";

import { TextInput } from '@/components/TextInput';
import { NumberInput } from '@/components/NumberInput';
import { BooleanInput } from '@/components/BooleanInput';
import { AvailabilityInput } from '@/components/AvailabilityInput';
import { TextAreaInput } from '@/components/TextAreaInput';
import { UploadImage } from '@/components/UploadImage';
import { useFormStatus } from "react-dom";
import SubmitButton from "@/components/SubmitButtton";

export default function BookForm() {

  const ref = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function submitForm(formData: FormData){

    if (formData.get('title')?.valueOf()==="") return;

    const file:File | null = formData.get('file') as unknown as File
    if(file.size !== 0) {
      try{
        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
          `${file.type}`
          throw new Error(`Wrong file format, uploaded file format:`+
           `${file.type}`);
        }
        if(file.size > 10000000) {
          throw new Error(`File Size is too big, current size: `+
           `${(Math.floor(file.size/1000)/1000)}Mb`);
        }
      }catch(error){
        console.error(error);
        alert(error.message);
        return;
      }
    }

    const result = await saveDB(formData);
    if(result === true) alert("Book succesfully added to the library")
    
  }

  return(
    <form ref={ref} action={async (formData) => {
      await submitForm(formData);
      ref.current?.reset();
    }} className='flex flex-col '>
      <div className="flex justify-center w-auto mt-3">
        <div className='grid grid-cols-[1fr, 2fr] ' >
          <TextInput label='Book Title' name='title' />
          <TextInput label='Author' name='author' />
          <NumberInput label='Pages' name='pages'/>
          <TextInput label='Page Format' name='pageFormat' />
          <TextInput label='Publisher' name='publisher' />
          <NumberInput label='Year' name='year' />
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
        {/* <button type="submit" className="bg-zinc-900 bg-opacity-80 text-2xl
          mt-3 mr-2 px-5 py-2 border rounded-lg mx-auto">
            Submit
          </button> */}
        <button type="reset" className="bg-zinc-900 bg-opacity-80 text-2xl
          mt-3 ml-2 px-5 py-2 border rounded-lg mx-auto">
          Reset</button>
      </div>
    </form>
  )
}