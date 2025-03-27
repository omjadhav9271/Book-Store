import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Books List</h1>
        <Link to="/books/create" className="btn btn-success">
          <MdOutlineAddBox className="me-2" />
          Add Book
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
