import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import './styles.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query === '' || page === 0) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=40461807-ebea3baaa711ea52e01789531&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();

        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalHits(data.totalHits);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageUrl => {
    setLargeImageURL(imageUrl);
  };

  const closeModal = () => {
    setLargeImageURL(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      {loading && <Loader />}
      <ImageGallery images={images} onSelect={openModal} />
      {images.length > 0 && images.length < totalHits && !loading && (
        <Button onClick={loadMore} />
      )}
      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
