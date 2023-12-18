import connectMongo from '../../../../utils/connectMongo';
import Book from '../../../../models/bookModel';
import BookEditForm from '@/components/BookEditForm';

export default async function EditBook({params}:{params:{editBookID:string}} ){

  async function findBook(bookID:string) {
    try{
      await connectMongo();
      const book = await Book.findOne({ _id: bookID});
      return book;
    }catch(error){
      console.error(error);
    }
  }

  const book = await findBook(params.editBookID);
  if(book == null) return <h2>Serwer Error</h2>

  const bookNoId = {
    title: book.title,
    cover: book.cover,
    author: book.author,
    isRead: book.isRead,
    availability: book.availability,
    pages: book.pages,
    pageFormat: book.pageFormat,
    year: book.year,
    rating: book.rating,
    review: book.review,
  }
  
  return(
    <BookEditForm book={bookNoId} />
  )
}