"use client"
import AddBookForm from '@/components/AddBookForm';
import { getSession } from 'next-auth/react';
import { redirect } from "next/navigation";

export default async function AddBook() {
  const session = await getSession();

  if(!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  };

  return <>
  <p>email: {session?.user?.email}</p>
  <p>role: {session?.user?.role}</p>
  <AddBookForm />
  </>
}
