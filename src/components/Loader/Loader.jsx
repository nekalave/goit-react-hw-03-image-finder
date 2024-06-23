import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.loader}>
    <ThreeDots color="#00BFFF" height={80} width={80} />
  </div>
);

export default Loader;
