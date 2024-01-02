"use client";

import { useSession } from "next-auth/react";

type entryType = {
  _id: string;
  title: string;
  author: string;
  year: number;
  isRead: boolean;
  toggleRead: (id: string, read: boolean) => void;
  deleteEntry: (id: string) => void;
};

export function ReadingListEntry({
  _id,
  title,
  author,
  year,
  isRead,
  toggleRead,
  deleteEntry,
}: entryType) {
  const { data: session } = useSession({
    required: false,
  });

  return (
    <>
      <li className="flex content-center">
        {session && session.user.role == "Admin" && (
          <input
            type="checkbox"
            defaultChecked={isRead}
            onChange={(e) => toggleRead(_id, e.target.checked)}
            className="text-xl mx-3 my-auto"
          />
        )}
        {(!session || (session && session.user.role !== "Admin")) && isRead && (
          <img src="checkMark.png"></img>
        )}

        <p className="text-xl mx-3 my-auto">
          <b>{title}</b>, <b>Author:</b> {author},<b>Year:</b> {year}
        </p>
        {session && session.user.role == "Admin" && (
          <button
            onClick={() => deleteEntry(_id)}
            className="text-xl mx-3 my-auto
        ml-auto bg-red-600 px-5 py-2 border-slate-950 rounded-lg
        hover:scale-110"
          >
            Delete
          </button>
        )}
      </li>
    </>
  );
}
