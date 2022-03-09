import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      saved: [],
    };
  }

  componentDidMount = async () => {
    await this.getFavorites();
  }

  componentDidUpdate = async () => {
    await this.getFavorites();
  }

  getFavorites = async () => {
    const get = await getFavoriteSongs();
    const musicArray = get.map((obj) => obj);
    this.setState({
      saved: musicArray,
    });
  }

  render() {
    const { loading, saved } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        { loading ? <Loading />
          : saved.map((obj, index) => (
            <MusicCard
              music={ obj }
              key={ index }
            />
          ))}
      </div>
    );
  }
}

export default Favorites;
