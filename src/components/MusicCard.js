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
      checked: '',
    };
  }

handleCheck = async (e) => {
  this.setState({
    checked: e.target.checked,
    loading: true,
  });

  const getMusic = await getMusics(e.target.id);
  await addSong(getMusic[0]);
  await getFavoriteSongs();

  this.setState({
    loading: false,
  });
  // this.SomeChecked();
}

// SomeChecked = async () => {
//   const get = await getFavoriteSongs();
//   const musicArray = get.map((obj) => obj.trackId);
//   this.setState({
//     saved: musicArray,
//   });
// }

render() {
  const { music: { trackName, previewUrl, trackId }, check } = this.props;
  const { loading, checked } = this.state;
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
            key={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            checked={ check || checked }
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
  check: PropTypes.bool.isRequired,
};
