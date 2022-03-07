import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      length: 0,
      value: '',
      name: '',
      disable: true,
      loading: false,
      fetched: false,
      searchResult: null,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      value,
      length: value.length,
    }, () => this.setState((before) => ({
      disable: before.length <= 1,
    })));
  }

  handleFetch = async () => {
    const { value } = this.state;
    this.setState({
      name: value,
      value: '',
      loading: true,
    });
    const response = await searchAlbumsAPI(value);

    this.setState({
      searchResult: response,
    }, () => this.setState({
      loading: false,
    }));
  }

  handleClick = async (e) => {
    e.preventDefault();
    await this.handleFetch();

    this.setState({
      fetched: true,
    });
  }

  renderAlbum = () => {
    const { searchResult } = this.state;

    return (
      searchResult.length < 1 ? <p>Nenhum álbum foi encontrado</p>
        : searchResult.map((obj) => (
          <Link
            key={ obj.collectionId }
            to={ `/album/${obj.collectionId}` }
            data-testid={ `link-to-album-${obj.collectionId}` }
            className="album-link"
          >
            <img src={ obj.artworkUrl100 } alt={ obj.artistName } />
            { obj.artistName }
            { obj.collectionName }
          </Link>))
    );
  }

  render() {
    const { disable, value, loading, fetched, name } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <div data-testid="page-search">
            <Header />
            <h2>Search</h2>
            <form>
              <input
                type="text"
                data-testid="search-artist-input"
                className="input-search"
                onChange={ this.handleChange }
                value={ value }
              />
              <button
                type="submit"
                className="search-btn"
                data-testid="search-artist-button"
                disabled={ disable }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
            {
              fetched
                ? (
                  <div>
                    <h2>
                      Resultado de álbuns de:
                      {' '}
                      { name }
                    </h2>
                    {this.renderAlbum()}
                  </div>
                )
                : null
            }

          </div>
        )
    );
  }
}

export default Search;
