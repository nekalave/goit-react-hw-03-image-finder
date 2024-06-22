import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import Notiflix from 'notiflix';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css'

const fetchFunc = async function(search, page) {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '44209717-4a56fa844a5258582c59ce6a4',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: page,
      },
    });
    return response.data;

  } catch (error) {
    console.error('Error fetching data:', error);
    Notiflix.Notify.failure('Failed to fetch data');
  }
};

class App extends Component {
  state = {
    search: '',
    searchBarValue: '',
    page: 1,
    dataStore: [],
    currentHits: 12,
    totalHits: 0,
    loading: false,
    isModalOpen: false,
    currentImg: {},
  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ searchBarValue: value });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    const { searchBarValue } = this.state;
    if (searchBarValue.trim() === '') {
      Notiflix.Notify.warning('Please enter a search query.');
      return;
    }
    this.setState({ search: searchBarValue, page: 1, dataStore: [], currentHits: 12, totalHits: 0, loading: true });
    const data = await fetchFunc(searchBarValue, 1);
    if (data && data.hits.length > 0) {
      this.setState({ dataStore: data.hits, totalHits: data.totalHits, loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = async () => {
    const { search, page, dataStore, currentHits } = this.state;
    this.setState({ loading: true });
    const nextPage = page + 1;
    const hitsStep = currentHits + 12;
    const data = await fetchFunc(search, nextPage);
    if (data && data.hits.length > 0) {
      this.setState({
        dataStore: [...dataStore, ...data.hits],
        page: nextPage,
        currentHits: hitsStep,
        loading: false,
      });
    }else {
      this.setState({ loading: false });
    }

  };

  openModal = evt => {
    const {id, alt} = evt.target
    this.setState({isModalOpen: true, currentImg:{src: id, alt: alt}})
  }

  closeModal = () => {
    this.setState({isModalOpen: false})
  }

  render() {
    const { dataStore, currentHits, totalHits, loading, isModalOpen, currentImg } = this.state;
    return (
      <div className={css.app}>
        <Searchbar value={this.searchBarValue} onChange={this.handleChange} onSubmit={this.handleSubmit} />
        {dataStore && (
          <ImageGallery data={dataStore} openModal={this.openModal}/>
        )}
        {loading && <Loader />}
        {totalHits > currentHits && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isModalOpen && (
          <Modal onClose={this.closeModal} data={currentImg}/>
        )}
      </div>
    );
  }
}

export default App;
