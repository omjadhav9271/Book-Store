import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Title</th>
            <th scope="col" className="d-none d-md-table-cell">Author</th>
            <th scope="col" className="d-none d-md-table-cell">Published Year</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{book.title}</td>
              <td className="text-center d-none d-md-table-cell">{book.author}</td>
              <td className="text-center d-none d-md-table-cell">{book.publishedYear}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
