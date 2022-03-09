import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      render: false,
    };
  }

componentDidMount = async () => {
  const { match: { params: { id } } } = this.props;
  const getMusic = await getMusics(id);
  this.setState({
    musics: getMusic,
    render: true,
  });

  await getFavoriteSongs();
  // await this.SomeChecked();
}

// SomeChecked = async () => {
//   const get = await getFavoriteSongs();
//   const musicArray = get.map((obj) => obj.trackId);
//   this.setState({
//     saved: musicArray,
//   });
// }

renderAlbum = () => {
  const { musics, render } = this.state;
  return (
    render
      ? (
        <div className="bigContainer">
          <div className="cardContainer">
            <img
              src={ musics[0].artworkUrl100 }
              alt={ musics[0].trackName }
              className="trackImage"
            />
            <h3 data-testid="artist-name">{musics[0].artistName}</h3>
            <h4 data-testid="album-name">
              {' '}
              { musics[0].collectionName }
              {' '}
            </h4>
          </div>
          <div className="trackContainer">
            { musics.map((obj, index) => {
              if (index === 0) return null;
              return (
                (
                  <MusicCard
                    music={ obj }
                    key={ index }
                  />
                )
              );
            })}
          </div>

        </div>
      )
      : null
  );
}

render() {
  const { loading } = this.state;
  return (
    <div data-testid="page-album">
      <Header />
      <p>Album</p>
      { loading ? <Loading /> : this.renderAlbum() }
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
