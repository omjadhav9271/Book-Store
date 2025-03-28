import React from 'react';
import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books }) => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {books.map((item) => (
        <div className="col" key={item._id}>
          <BookSingleCard book={item} />
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
