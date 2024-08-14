import React, { useState } from 'react';
import Swal from 'sweetalert2'



function AddBook({ onAddnewBook }) {
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
if (isbn){
      fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.totalItems > 0) {
            const newBook = data.items[0];
            onAddnewBook(newBook);
            Swal.fire("New book add successfully!");
            setIsbn('');
            setError('');
          } else {
            setError('No book found with this ISBN.');
            setIsbn('');
          }
        })
        .catch((error) => {
          console.error('Error fetching book:', error);
          setError('An error occurred while fetching the book.');
        });
    
  };
}


  return (
    <>
    <form onSubmit={handleSubmit} className='addisbnform'>
      <div>
        <label htmlFor="isbn">Enter book ISBN:</label>
        <input
          type="text"
          id="isbn"
          placeholder='Enter ISBN code...'
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
      </div>
      {error && <p className='error'>{error}</p>}
      <button type="submit">Add Book</button>
    </form>
    </>
    
  );
}

export default AddBook;
