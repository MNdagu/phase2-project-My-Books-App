import React from "react";
import BookCard from "./Bookcard";

function ReadingList({ favourite, removeBook }) {
  return (
    <div>
      <h2>My Reading List</h2>
      <div className="book-collection">
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
        <p className="nothing"> You have nothing on your reading list.</p>
      )}
      </div>
    </div>
  );
}

export default ReadingList;
