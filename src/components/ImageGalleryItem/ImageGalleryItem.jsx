import css from './ImageGalleryItem.module.css';
import { Component } from 'react';

class ImageGalleryItem extends Component {

  componentDidMount() {
    const { height: cardHeight } = document.querySelector('ul').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 3,
      behavior: 'smooth',
    });
  }

  render() {
    const { src, alt, openModal, src2 } = this.props;

    return (
      <li className={css.imageGalleryItem}>
        <img className={css.imageGalleryItemImage} src={src} alt={alt} id={src2} onClick={openModal} />
      </li>
    );
  }
}

export default ImageGalleryItem;
