import css from './Searchbar.module.css'

const Searchbar = ({ value, onChange, onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type='submit' className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          value={value}
          onChange={onChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
