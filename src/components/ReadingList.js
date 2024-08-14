import React from "react";
import BookCard from "./Bookcard";

function ReadingList({ favourite, removeBook }) {
  return (
    <div>
      <h1>My Reading List</h1>
      {favourite.length > 0 ? (
        favourite.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            added={true}
            removeBook={removeBook}
          />
        ))
      ) : (
        <p> You have nothing to read.</p>
      )}
    </div>
  );
}

export default ReadingList;
