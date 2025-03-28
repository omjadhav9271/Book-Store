import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishedYear(response.data.publishedYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching book details', { variant: 'error' });
        console.log(error);
      });
  }, [enqueueSnackbar, id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="container mt-4">
      <BackButton />
      <h1 className="text-primary my-4">Edit Book</h1>
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
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleEditBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
