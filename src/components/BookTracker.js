import React, { useState, useEffect } from 'react';

function BookTracker({ isbn }) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [dailyPagesRead, setDailyPagesRead] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);
  const [minutesPerPage, setMinutesPerPage] = useState(5); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSessionDate, setLastSessionDate] = useState(new Date().toDateString());

  useEffect(() => {
    const fetchPages = async () => {
      if (!isbn) return;

      setLoading(true);
      setError(null);

      try {
        // Corrected fetch URL with backticks for template literals
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const data = await response.json();

        if (data.totalItems === 0) {
          throw new Error('No book found with the provided ISBN.');
        }

        const book = data.items[0].volumeInfo;

        if (book.pageCount !== undefined) {
          setTotalPages(book.pageCount);
        } else {
          console.error('Page count not available in book details.');
          setTotalPages(0);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [isbn]); // Fetch pages when ISBN changes

  useEffect(() => {
    const currentDate = new Date().toDateString();
    if (lastSessionDate !== currentDate) {
      setDailyPagesRead(0);
      setLastSessionDate(currentDate);
    }
  }, [lastSessionDate]);

  const handleStart = () => {
    setStartTime(Date.now());
    setEndTime(null); // Reset end time when starting
    setTimeTaken(0); // Reset time taken when starting
  };

  const handleStop = () => {
    if (startTime === null) return; // Ensure there's a start time

    const end = Date.now();
    setEndTime(end);

    const elapsedTimeInSeconds = (end - startTime) / 1000; // Convert to seconds
    setTimeTaken(elapsedTimeInSeconds);

    // Calculate pages read based on elapsed time and minutes per page
    const calculatedPages = Math.floor(elapsedTimeInSeconds / (minutesPerPage * 60));
    const pagesToRead = totalPages - dailyPagesRead;
    const newPagesRead = Math.min(calculatedPages, pagesToRead);

    if (newPagesRead < 0) {
      console.error('Calculated pages read is negative.');
    }

    // Update daily pages read
    setDailyPagesRead(prev => Math.min(prev + newPagesRead, totalPages));
  };

  const handleMinutesPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setMinutesPerPage(value);
    } else {
      console.error('Invalid minutes per page value.');
    }
  };

  const calculateEstimatedDays = () => {
    if (totalPages <= 0 || dailyPagesRead <= 0) return 'N/A'; // Avoid invalid calculations

    const pagesRemaining = totalPages - dailyPagesRead;
    if (pagesRemaining <= 0) return '0.00'; // Already finished the book

    const days = Math.ceil(pagesRemaining / dailyPagesRead); 
    return days > 0 ? days.toFixed(2) : 'N/A'; 
  };

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds < 0) return 'N/A'; // Handle negative time

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Corrected template literal
  };

  const estimatedDays = calculateEstimatedDays();

  return (
    <div className='tracker'>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <input 
        type="number" 
        placeholder="Minutes per Page" 
        value={minutesPerPage} 
        onChange={handleMinutesPerPageChange} 
      />
      <button onClick={handleStart}>Start Reading</button>
      <button onClick={handleStop}>Stop Reading</button>
      <p>Start Time: {startTime ? new Date(startTime).toLocaleString() : 'N/A'}</p>
      <p>End Time: {endTime ? new Date(endTime).toLocaleString() : 'N/A'}</p>
      <p>Time Taken: {formatTime(timeTaken)}</p>
      <p>Pages Read Today: {dailyPagesRead}</p>
      <p>Total Pages: {totalPages}</p>
      <p>Estimated Days to Finish: {estimatedDays}</p>
    </div>
  );
}

export default BookTracker;
