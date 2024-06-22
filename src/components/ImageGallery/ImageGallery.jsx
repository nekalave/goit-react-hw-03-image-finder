import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'
const ImageGallery = ({data, openModal}) => {
  return(
    <ul className={css.imageGallery}>
      {data.map(d=>(
        <ImageGalleryItem key={d.id} src={d.webformatURL} src2={d.largeImageURL} alt={d.tags} openModal={openModal}/>
      ))}
    </ul>
  )
}

export default ImageGallery
