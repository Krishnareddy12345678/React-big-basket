import React, { useState } from 'react';
 import './Pagenation1.css';



function Pagenation() {
  // Sample items (you can replace these with dynamic data)
  const items = ['Apple', 'Banana', 'Carrot', 'Date', 'Eggplant', 'Fig', 'Grapes', 'Honeydew', 'Ivy Gourd', 'Jackfruit','Apple', 'Banana', 'Carrot', 'Date', 'Eggplant', 'Fig', 'Grapes', 'Honeydew', 'Ivy Gourd', 'Jackfruit'];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <h2>Veg & Fruit List</h2>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            style={{
              margin: '0 5px',
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
            }}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default Pagenation;