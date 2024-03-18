import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const PDFViewer = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const numPages = 5; // Set the total number of pages here

  const navigateToPage = (newPage) => {
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
    }
  };

  return (
    <div className="container">
      <div className='btn btn-secondary my-5'>
        <Link to="/books" className='text-light text-decoration-none'>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className='mx-1'>Back to Books</span>
        </Link>
      </div>
      <div>
        <embed
          src={`https://res.cloudinary.com/du5fgvlvs/image/upload/v1710735680/Books/guab0frirswknthhhli6.pdf`}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      </div>
      <p className="mt-3">
        Page {pageNumber} of {numPages}
      </p>
      <div className="btn-group" role="group" aria-label="Navigation buttons">
        <button
          className="btn btn-primary me-2"
          onClick={() => navigateToPage(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigateToPage(pageNumber + 1)}
          disabled={pageNumber >= numPages}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
