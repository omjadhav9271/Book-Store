import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{book.publishedYear}</h5> {/* Updated key */}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            >
            </button>
          </div>
          <div className="modal-body">
            <h6 className="text-muted">{book._id}</h6>
            <div className="d-flex align-items-center mb-3">
              <PiBookOpenTextLight className="text-danger fs-4 me-2" />
              <h5 className="mb-0">{book.title}</h5>
            </div>
            <div className="d-flex align-items-center mb-3">
              <BiUserCircle className="text-danger fs-4 me-2" />
              <h6 className="mb-0">{book.author}</h6>
            </div>
            <p className="mt-4">Book Details: </p>
            <p>
              Summary: 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
