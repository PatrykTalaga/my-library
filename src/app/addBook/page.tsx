import connectMongo from '../../../utils/connectMongo';
import Book from '../../../models/bookModel';

export default async function Home() {

  async function addBook(){
    const myBook = {
      title: "myBook4",
      author: "author4",
      pages: 150,
      pageFormat: "A5",
      cover: "Cover",
      isRead: true,
      isOnTheShelf: false,
      rating: 9,
      review: "String4",
      comment: []
    };
  
    try {
      console.log('CONNECTING TO MONGO');
      await connectMongo();
      console.log('CONNECTED TO MONGO');
  
      console.log('CREATING DOCUMENT');
      const book = await Book.create(myBook);
      console.log('CREATED DOCUMENT');
    }
    catch (error) {
      console.log(error);
    }
};

  return <>
    <h1>Add New Book</h1>
  </>
}

{/* <p>Pages: Pages</p>
<p>Page Format: A5</p>
<p>Year: 1212</p>
<p>Publisher: Wololo Books</p> */}