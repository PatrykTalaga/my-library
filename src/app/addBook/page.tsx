
import AddBookForm from '@/components/AddBookForm';
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { options } from '../api/auth/[...nextauth]/options';

export default async function AddBook() {
  const session = await getServerSession(options);
  console.log(session)
  console.log(session?.user)
  console.log(session?.user.role)

  if(!session) {
    redirect("/api/auth/signin?callbackUrl=/addBook");
  };

  return <>
  <p>email: {session?.user?.email}</p>
  <p>role: {session?.user?.role}</p>
  <AddBookForm />
  </>
}
