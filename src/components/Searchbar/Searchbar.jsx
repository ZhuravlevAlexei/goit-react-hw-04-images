import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import sprite from 'search.svg';

class ContactList extends Component {
  state = {
    searchInputText: '',
  };

  handleSearchbarSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchInputText);
  };

  handleSearchbarInputChange = ({ target: { value } }) => {
    this.setState({ searchInputText: value });
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSearchbarSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <svg className={css.searchBtnIcon} width="28" height="28">
              <use href={`${sprite}#search`}></use>
            </svg>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchbarInputChange}
            value={this.state.searchInputText}
          />
        </form>
      </header>
    );
  }
}

ContactList.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactList;
