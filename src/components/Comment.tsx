"use client";

import convertDate from "@/app/functions/covertDate";
import deleteComment from "@/app/functions/deleteComment";
import editComment from "@/app/functions/editComment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Comment({
  commentId,
  createdAt,
  bookId,
  editedAt,
  userName,
  userId,
  comment,
}: {
  commentId: string;
  bookId: string;
  createdAt: Date;
  editedAt: Date;
  userName: string;
  userId: string;
  comment: string;
}) {
  const [text, setText] = useState(comment);
  const [editStatus, setEditStatus] = useState(true);
  const router = useRouter();
  const { data: session } = useSession({
    required: false,
  });

  function handleDelete() {
    deleteComment(bookId, commentId);
    router.refresh();
  }

  function saveComment() {
    editComment(bookId, commentId, text, userName, userId);
    setEditStatus(true);
    router.refresh();
  }

  const createdAtString = convertDate(createdAt);
  const editedAtString = convertDate(editedAt);

  return (
    <li
      className=" mx-auto flex flex-col align-baseline justify-center
    bg-zinc-900 bg-opacity-80  my-2 px-2 py-2 border rounded-lg"
    >
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex py-1 my-1">
            <p className="font-bold text-xl">{userName}</p>
            {createdAtString === editedAtString && (
              <p className="text-xl text-zinc-400 ml-5">
                Posted: {createdAtString}
              </p>
            )}
            {createdAtString !== editedAtString && (
              <p className="text-xl text-zinc-400 ml-5">
                Edited: {editedAtString}
              </p>
            )}
          </div>
          <div className="flex">
            {session &&
              (userId == session?.user.id || session.user.role == "Admin") && (
                <button
                  className="my-1 mx-5 text-xl bg-orange-500 w-24
             text-center py-1 border-slate-950 rounded-lg hover:scale-110"
                  onClick={() => setEditStatus(false)}
                >
                  Edit
                </button>
              )}
            {session &&
              (userId == session?.user.id || session.user.role == "Admin") && (
                <button
                  className="my-1 mx-5 text-xl bg-red-600 w-24
              text-center py-1 rounded-lg order-slate-950 hover:scale-110"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
          </div>
        </div>
        <div className="flex flex-col items-center mx-2 mt-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={editStatus}
            className="w-full py-2 px-3 border-black
            rounded-md text-white bg-slate-500 disabled:bg-transparent
            disabled:p-1"
          ></textarea>
          {!editStatus && (
            <button
              className="text-xl bg-blue-600 w-24
              text-center py-1 my-3 rounded-lg order-slate-950 hover:scale-110"
              onClick={saveComment}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
