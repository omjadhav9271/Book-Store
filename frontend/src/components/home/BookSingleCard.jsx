import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="card border-secondary mb-4 shadow-sm">
      <div className="card-body position-relative">
        <h5 className="badge bg-danger position-absolute top-0 end-0 m-2">
          {book.publishedYear} {/* Updated key */}
        </h5>
        <h6 className="text-muted mb-3">{book._id}</h6>
        <div className="d-flex align-items-center mb-3">
          <PiBookOpenTextLight className="text-danger fs-4 me-2" />
          <h5 className="card-title mb-0">{book.title}</h5>
        </div>
        <div className="d-flex align-items-center mb-3">
          <BiUserCircle className="text-danger fs-4 me-2" />
          <h6 className="card-subtitle mb-0">{book.author}</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <BiShow
            className="fs-3 text-primary cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          <Link to={`/books/details/${book._id}`} className="text-success">
            <BsInfoCircle className="fs-4" />
          </Link>
          <Link to={`/books/edit/${book._id}`} className="text-warning">
            <AiOutlineEdit className="fs-4" />
          </Link>
          <Link to={`/books/delete/${book._id}`} className="text-danger">
            <MdOutlineDelete className="fs-4" />
          </Link>
        </div>
      </div>
      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BookSingleCard;
