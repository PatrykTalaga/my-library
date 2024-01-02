"use client";

import { useState } from "react";
import addComment from "@/app/functions/addComment";
import { useRouter } from "next/navigation";

export default function AddComment({
  bookID,
  userName,
  userId,
}: {
  bookID: string;
  userName: string;
  userId: string;
}) {
  const [comment, setComment] = useState("");
  const router = useRouter();

  async function submitComment() {
    if (comment === "") return;

    await addComment(bookID, comment, userName, userId);
    setComment("");

    router.refresh();
  }

  return (
    <>
      <p
        className="w-52 text-center text-2xl font-bold bg-zinc-900
      bg-opacity-80  my-2 px-2 py-2 border rounded-lg mt-3"
      >
        New Comment:
      </p>
      <textarea
        rows={4}
        name={comment}
        className="bg-zinc-900 bg-opacity-80 
      border rounded-md my-1 px-3 py-2 focus:bg-zinc-900"
        value={comment || ""}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="mx-auto w-48 text-xl bg-blue-600 border-black shadow-lg
              text-center py-2 my-3 rounded-lg order-slate-950 hover:scale-110"
        onClick={submitComment}
      >
        Add Comment
      </button>
    </>
  );
}
