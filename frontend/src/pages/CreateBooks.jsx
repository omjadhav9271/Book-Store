import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState(''); // Updated to use publishedYear
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishedYear, // Updated to use publishedYear
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="container mt-4">
      <BackButton />
      <h1 className="text-primary my-4">Create Book</h1>
      {loading && <Spinner />}
      <div className="card border-primary mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label text-muted">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted">Published Year</label>
            <input
              type="number"
              value={publishedYear} // Updated to use publishedYear
              onChange={(e) => setPublishedYear(e.target.value)} // Updated to use setPublishedYear
              className="form-control"
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleSaveBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
