'use client'
import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  useEffect(() => {
    console.log(pending);
  }, [pending]);

  return(
    <button
      className='bg-zinc-900 bg-opacity-80 text-2xl
      mt-3 mr-2 px-5 py-2 border rounded-lg mx-auto"'
      disabled={pending}
    >
      Submit {pending && '...'}
    </button>
  )
}