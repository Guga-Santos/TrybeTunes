import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

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
}

renderAlbum = () => {
  const { musics } = this.state;
  const { artistName, artworkUrl100, collectionName, trackName } = musics[0];
  return (
    <>
      <div className="cardContainer">
        <img src={ artworkUrl100 } alt={ trackName } />
        <h3 data-testid="artist-name">{artistName}</h3>
        <h4 data-testid="album-name">
          {' '}
          {collectionName}
          {' '}
        </h4>
      </div>
      <div className="trackContainer">
        { musics.map((obj, index) => (
          index === 0
            ? null : (
              <>
                <p>
                  { obj.trackName }
                </p>
                <audio
                  data-testid="audio-component"
                  src={ obj.previewUrl }
                  key={ obj.artistId }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>

              </>
            )))}
      </div>

    </>
  );
}

render() {
  const { render } = this.state;
  return (
    <div data-testid="page-album">
      <Header />
      <p>Album</p>
      { render ? this.renderAlbum() : null }
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
