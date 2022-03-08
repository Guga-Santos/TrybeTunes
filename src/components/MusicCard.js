import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

handleCheck = async (e) => {
  this.setState({
    loading: true,
  });
  const getMusic = await getMusics(e.target.id);
  await addSong(getMusic[0]);
  await getFavoriteSongs();

  this.setState({
    loading: false,
  });
  this.SomeChecked();
}

render() {
  const { music: { trackName, previewUrl, trackId }, checked } = this.props;
  const { loading } = this.state;
  return (
    loading ? <Loading /> : (
      <div className="tracks">
        <p className="trackName">{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            checked={ checked }
            onChange={ this.handleCheck }
          />
        </label>
      </div>
    ));
}
}

export default MusicCard;

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
};
