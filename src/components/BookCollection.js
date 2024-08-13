import React from 'react';
import BookCard from './Bookcard';

function BookCollection({ books }) {
  return (
    <>
    <h2>My Books Collection</h2>
     <div className="book-collection">
      {books.map((book) => (
        <BookCard  key={book.id} book={book} />
      ))}
    </div>
    </>
   
  );
}

export default BookCollection;
