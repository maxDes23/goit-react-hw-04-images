import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import './styles.css';

class App extends React.Component {
  state = {
    images: [],
    loading: false,
    page: 1,
    query: '',
    largeImageURL: null,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    if (!query) return;

    this.setState({ loading: true });

    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=40461807-ebea3baaa711ea52e01789531&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.json();

    this.setState(state => ({
      images: [...state.images, ...data.hits],
      loading: false,
      totalHits: data.totalHits,
    }));
  };

  handleSearch = query => {
    this.setState({ images: [], query, page: 1 });
  };

  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  openModal = largeImageURL => {
    this.setState({ largeImageURL });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const { images, loading, largeImageURL, totalHits } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        {loading && <Loader />}
        <ImageGallery images={images} onSelect={this.openModal} />
        {images.length > 0 && images.length < totalHits && !loading && (
          <Button onClick={this.loadMore} />
        )}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
