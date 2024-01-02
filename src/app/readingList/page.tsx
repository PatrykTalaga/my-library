import connectMongo from "../../../utils/connectMongo";
import List from "../../../models/listModel";
import Link from "next/link";
import { ReadingListEntry } from "@/components/ReadingListEntry";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function ReadingList() {
  const session = await getServerSession(options);

  async function toggleRead(id: string, read: boolean) {
    "use server";

    try {
      await connectMongo();
      let entry = await List.findOne({ _id: id });
      entry.isRead = read;
      await entry.save();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteEntry(id: string) {
    "use server";

    try {
      await connectMongo();
      await List.deleteOne({ _id: id });
    } catch (err) {
      console.error(err);
      return;
    }
    redirect("/readingList");
  }

  await connectMongo();
  const list = await List.find();

  return (
    <>
      <div
        className="flex flex-col mx-auto w-3/5 bg-zinc-900 bg-opacity-80
      py-7 px-10 border rounded-md"
      >
        <h1 className="text-3xl mb-3 mx-auto">Books to read:</h1>
        <div className="flex flex-col gap-y-3 w-fit mx-auto">
          {list.map((entry) => (
            <ReadingListEntry
              key={entry._id.toString()}
              toggleRead={toggleRead}
              deleteEntry={deleteEntry}
              title={entry.title}
              author={entry.author}
              _id={entry._id.toString()}
              year={entry.year}
              isRead={entry.isRead}
            />
          ))}
          {session && session.user.role == "Admin" && (
            <Link
              href={"/readingList/newListEntry"}
              className="text-2xl border
          rounded-lg px-3 py-2 my-5 flex justify-center hover:scale-110"
            >
              Add new book to read
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
