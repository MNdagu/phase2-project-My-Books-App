import React from "react";
import BookCard from "./Bookcard";

function ReadingList({ favourite }) {
  return (
    <div>
      <h1>My Reading List</h1>
      {favourite.length > 0 ? (
        favourite.map((book) => (
          <BookCard key={book.id} book={book}/>
        ))
      ) : (
        <p>No books in your reading list.</p>
      )}
    </div>
  );
}

export default ReadingList;
