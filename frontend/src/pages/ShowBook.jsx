import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mt-4">
      <BackButton />
      <h1 className="text-primary my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="card border-primary mb-3" style={{ maxWidth: '30rem' }}>
          <div className="card-body">
            <div className="mb-3">
              <h5 className="card-title text-muted">Id</h5>
              <p className="card-text">{book._id}</p>
            </div>
            <div className="mb-3">
              <h5 className="card-title text-muted">Title</h5>
              <p className="card-text">{book.title}</p>
            </div>
            <div className="mb-3">
              <h5 className="card-title text-muted">Author</h5>
              <p className="card-text">{book.author}</p>
            </div>
            <div className="mb-3">
              <h5 className="card-title text-muted">Published Year</h5>
              <p className="card-text">{book.publishedYear}</p>
            </div>
            <div className="mb-3">
              <h5 className="card-title text-muted">Create Time</h5>
              <p className="card-text">{new Date(book.createdAt).toString()}</p>
            </div>
            <div className="mb-3">
              <h5 className="card-title text-muted">Last Update Time</h5>
              <p className="card-text">{new Date(book.updatedAt).toString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
