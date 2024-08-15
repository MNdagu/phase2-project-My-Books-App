import React, { useState } from 'react';

function BookTracker() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [minutesPerPage, setMinutesPerPage] = useState(5); // Average reading speed of 5 minutes per page

  const handleStart = () => {
    setStartTime(Date.now());
    setEndTime(null); // Reset end time when starting
    setTimeTaken(0); // Reset time taken when starting
    setPagesRead(0); // Reset pages read when starting a new session
  };

  const handleStop = () => {
    if (startTime === null) return; // Ensure there's a start time

    const end = Date.now();
    setEndTime(end);

    const elapsedTimeInSeconds = (end - startTime) / 1000; // Convert to seconds
    setTimeTaken(elapsedTimeInSeconds);

    // Calculate pages read based on elapsed time and minutes per page
    const calculatedPages = Math.floor(elapsedTimeInSeconds / (minutesPerPage * 60));
    const newPagesRead = Math.min(calculatedPages, totalPages);
    setPagesRead(newPagesRead);
  };

  const handlePagesChange = (event) => {
    setTotalPages(parseInt(event.target.value, 10));
  };

  const handleMinutesPerPageChange = (event) => {
    setMinutesPerPage(parseInt(event.target.value, 10));
  };

  const calculateEstimatedDays = () => {
    if (totalPages <= 0 || pagesRead <= 0) return 'N/A'; // Avoid invalid calculations

    // Calculate the number of days required to finish the book
    const days = Math.ceil(totalPages / pagesRead); // Use Math.ceil to ensure we account for partial days
    return days > 0 ? days.toFixed(2) : 'N/A'; // Ensure days are not negative or zero
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const estimatedDays = calculateEstimatedDays();

  return (
    <div>
      <input 
        type="number" 
        placeholder="Total Pages" 
        value={totalPages} 
        onChange={handlePagesChange} 
      />
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
      <p>Pages Read Today: {pagesRead}</p>
      <p>Estimated Days to Finish: {estimatedDays}</p>
    </div>
  );
}

export default BookTracker;