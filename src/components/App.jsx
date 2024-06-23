import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';
import { fetchFunc } from '../services/api';

class App extends Component {
  state = {
    search: '',
    page: 1,
    dataStore: [],
    totalPages: 1,
    loading: false,
    isModalOpen: false,
    currentImg: {},
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.addImages();
    }
  }

  addImages = async () => {
    const { search, page } = this.state;
    this.setState({ loading: true });
    const data = await fetchFunc(search, page);
    if (data && data.hits.length > 0) {
      this.setState(prevState => ({
        dataStore: [...prevState.dataStore, ...data.hits],
        loading: false,
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } else {
      this.setState({ loading: false });
    }
  };

  handleSubmit = (value) => {
    if (value.trim() === '') {
      Notiflix.Notify.warning('Please enter a search query.');
      return;
    }
    this.setState({ search: value, page: 1, dataStore: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = evt => {
    const { id, alt } = evt.target;
    this.setState({ isModalOpen: true, currentImg: { src: id, alt: alt } });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { dataStore, loading, isModalOpen, currentImg, totalPages, page } = this.state;
    return (
      <div className={css.app}>
        <Searchbar  onSubmit={this.handleSubmit} />
        {dataStore.length > 0 && (
          <ImageGallery data={dataStore} openModal={this.openModal} />
        )}
        {loading && <Loader />}
        {totalPages !== page && !loading && (
          <Button onClick={this.loadMore} />
        )}
        {isModalOpen && (
          <Modal onClose={this.closeModal} data={currentImg} />
        )}
      </div>
    );
  }
}

export default App;
