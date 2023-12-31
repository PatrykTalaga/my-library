type BookType = {
  book: {
    _id: string;
    title: string;
    cover: string;
    author: string;
    isRead: boolean;
    availability: string;
    pages: Number;
    pageFormat: String;
    year: Number;
    rating: Number;
    review: String;
  };
};

export default function BookDetails({ book }: BookType) {
  return (
    <div
      className="bg-zinc-900 bg-opacity-80 border rounded-lg flex jus
      w-3/4 p-5"
    >
      {book.cover && (
        <img
          className=" my-2 mx-10 h-96"
          src={`/bookCovers/${book.cover}`}
        ></img>
      )}
      <div>
        <h1 className="text-2xl font-bold">{book.title}</h1>
        {book.author !== "" && (
          <p className="text-lg">
            <b>Author:</b> {" " + book.author}
          </p>
        )}
        {book.year !== 0 && (
          <p className="text-lg">
            {" "}
            {/* 0 is default value */}
            <b>Year:</b>
            {" " + book.year.toString()}
          </p>
        )}
        {book.pages !== 0 && (
          <p className="text-lg">
            <b>Pages:</b>
            {" " + book.pages.toString()}
          </p>
        )}
        {book.pageFormat !== "" && (
          <p className="text-lg">
            <b>Page format:</b>
            {" " + book.pageFormat}
          </p>
        )}
        <p className="text-lg">
          <b>Read:</b> {book.isRead ? " Yes" : " No"}
        </p>
        <p className="text-lg">
          <b>Avaibility:</b>
          {" " + book.availability}
        </p>
        {book.rating !== 0 && (
          <p className="text-lg">
            <b>Rating:</b>
            {" " + book.rating.toString() + "/10"}
          </p>
        )}
        {book.review !== "" && (
          <p className="text-lg mt-1">
            <b>Summary:</b>
            <br></br> {book.review}
          </p>
        )}
      </div>
    </div>
  );
}
