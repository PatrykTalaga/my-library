"use client";

import { useState } from "react";
import { TextInputControlled } from "./TextInputControlled";
import { NumberInputControlled } from "./NumberInputControlled";
import { BooleanInputControlled } from "./BooleanInputControlled";
import { TextAreaInputControlled } from "./TextAreaInputControlled";
import { AvailabilityInputControlled } from "./AvailabilityInputControlled";
import addBook from "@/app/functions/addBook";
import addCover from "@/app/functions/addCover";

import { useRouter } from "next/navigation";

export default function AddBookForm() {
  const [newBook, setNewBook] = useState({
    title: "",
    cover: "",
    author: "",
    isRead: false,
    availability: "not avaible",
    pages: 0,
    pageFormat: "",
    year: 0,
    rating: 0,
    review: "",
    comment: [],
  });
  const router = useRouter();

  const [imgErrorMessage, setImgErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");

  function isReadInput(e: any) {
    const isReadInput = e.target.checked;
    setNewBook({ ...newBook, isRead: isReadInput });
  }

  async function submitForm(formData: FormData) {
    saveEdit();

    const file: File | null = formData.get("cover") as unknown as File;
    if (file.size !== 0) {
      try {
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          `${file.type}`;
          setImgErrorMessage(
            `Wrong file format, uploaded file format:` + `${file.type}`
          );
          return;
        }
        if (file.size > 500000) {
          setImgErrorMessage(
            `File Size is too big, current size: ` +
              `${Math.floor(file.size / 1000) / 1000}Mb`
          );
          return;
        }
      } catch (error) {
        return;
      }
      const result = await addCover(formData, newBook.title);
      if (typeof result === "string") {
        setNewBook({ ...newBook, cover: result });
        setImgErrorMessage("");
      }
    }
    router.refresh();
  }

  async function saveEdit() {
    if (newBook.title == "") {
      setTitleError("Book cannot have empty title");
      return;
    }

    const saveResult = await addBook({ ...newBook });
    if (saveResult !== true) {
      setTitleError(saveResult);
      return;
    }
    setTitleError("");
    alert("Book Saved");
  }

  return (
    <>
      <div
        className="bg-zinc-900 bg-opacity-80 border rounded-lg w-full
    mx-auto p-5 flex flex-col justify-center items-center md:w-1/2"
      >
        <h1 className="text-5xl my-3 mx-auto">Add new book</h1>
        <div
          className=" flex
      w-full mx-auto p-5 md:flex-col"
        >
          {/* form text side */}
          <div className="flex w-full justify-evenly mx-auto md:flex-col">
            {/* form left side */}
            <div className="flex flex-col items-center">
              <p className="text-3xl text-red-600 mx-auto mt-4">
                {titleError && titleError}
              </p>
              <div>
                <div className="flex justify-left">
                  <label className="text-lg w-28 my-auto">Title: </label>
                  <input
                    required
                    type="text"
                    name="title"
                    value={newBook.title || ""}
                    onChange={(e) =>
                      setNewBook({ ...newBook, title: e.target.value })
                    }
                    className="bg-zinc-900 bg-opacity-80 border rounded-md mx-3 my-1.5"
                  />
                </div>
              </div>
              <TextInputControlled
                label={"Author: "}
                name={"author"}
                value={newBook.author}
                change={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
              />
              <NumberInputControlled
                label={"Year: "}
                name={"year"}
                value={newBook.year}
                change={(e) => setNewBook({ ...newBook, year: e.target.value })}
              />
              <TextInputControlled
                label={"Page format: "}
                name={"pageFormat"}
                value={newBook.pageFormat}
                change={(e) =>
                  setNewBook({ ...newBook, pageFormat: e.target.value })
                }
              />
              <NumberInputControlled
                label={"Pages: "}
                name={"pages"}
                value={newBook.pages}
                change={(e) =>
                  setNewBook({ ...newBook, pages: e.target.value })
                }
              />
              <NumberInputControlled
                label={"Rating: "}
                name={"rating"}
                value={newBook.rating}
                change={(e) =>
                  setNewBook({ ...newBook, rating: e.target.value })
                }
              />
              <BooleanInputControlled
                label={"Is it read: "}
                name={"isRead"}
                value={newBook.isRead}
                change={isReadInput}
              />
              <AvailabilityInputControlled
                label={"Availability: "}
                name={"availability"}
                value={newBook.availability}
                change={(e) =>
                  setNewBook({ ...newBook, availability: e.target.value })
                }
              />
            </div>

            {/* form rights side */}
            <div className="flex flex-col mx-auto items-center">
              <TextAreaInputControlled
                label={"Summary: "}
                name={"review"}
                value={newBook.review}
                change={(e) =>
                  setNewBook({ ...newBook, review: e.target.value })
                }
              />
            </div>
          </div>

          {/* cover */}
          <div className="flex flex-col mr-2 lg:border-l lg:pl-5">
            {newBook.cover !== "" && (
              <img
                className=" my-2 mx-auto h-96
        object-scale-down"
                src={`/bookCovers/${newBook.cover}`}
              ></img>
            )}
            <p className="text-3xl text-red-600 mx-auto mt-4">
              {imgErrorMessage && imgErrorMessage}
            </p>
            <form
              action={submitForm}
              className="flex flex-col justify-between
        items-center"
            >
              <input
                type="file"
                name="cover"
                className="bg-zinc-900 bg-opacity-80
        border rounded-md mx-2 my-1.5 text-lg w-80"
              />
              <p className="">Upload only PNG or JPG (MAX. 500kB)</p>
              <button
                type="submit"
                className=" bg-black border
          rounded-lg px-10 py-3 mt-10 text-3xl hover:scale-110"
              >
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
