import css from './Searchbar.module.css';
import { Component } from 'react';

class Searchbar extends Component {
  state = {
    searchBarValue: '',

  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ searchBarValue: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchBarValue)
  };

  render() {
    const { searchBarValue } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type='submit' className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
            value={searchBarValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
