import css from './Button.module.css'

const Button = ({onClick}) => {
  return (
    <button className={css.button} onClick={onClick}>
      <span>Load More</span>
    </button>
  );
};

export default Button;
