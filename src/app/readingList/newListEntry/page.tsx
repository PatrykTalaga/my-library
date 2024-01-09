import connectMongo from "../../../../utils/connectMongo";
import List from "../../../../models/listModel";
import { AddListInput } from "@/components/AddListInput";
import { redirect } from "next/navigation";

async function addNewListEntry(data: FormData) {
  "use server";

  if (data.get("title")?.valueOf() === "") return;
  const listEntry = {
    title: data.get("title")?.valueOf(),
    author: data.get("author")?.valueOf(),
    year: data.get("year")?.valueOf(),
    isRead: false,
  };

  try {
    await connectMongo();
    await List.create(listEntry);
  } catch (error) {
    console.error(error);
    return;
  }
  redirect("/readingList/");
}

const NewListEntry = () => {
  return (
    <>
      <div
        className="flex flex-col mx-auto w-1/3 bg-zinc-900 bg-opacity-80
      py-7 px-10 border rounded-md"
      >
        <h1 className="text-4xl mb-4 mx-auto">Add new book to read</h1>
        <form action={addNewListEntry} className=" flex flex-col">
          <AddListInput label="Book Title: " name="title" />
          <AddListInput label="Author: " name="author" />
          <div className="flex justify-between">
            <label className="text-lg">Year: </label>
            <input
              type="number"
              name="year"
              className=" mx-3 mb-2 border
          rounded-md bg-zinc-900 bg-opacity-80  "
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="border-zinc-900 rounded-md bg-blue-600 
          w-32 text-xl mb-1 py-1 mx-3 mt-3 hover:scale-110"
            >
              Add
            </button>
            <button
              type="reset"
              className="border-zinc-900 rounded-md bg-red-600 
              w-32 text-xl mb-1 py-1 mx-3 mt-3 hover:scale-110"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewListEntry;
