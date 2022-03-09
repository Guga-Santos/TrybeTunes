import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
      saved: [],
    };
  }

  componentDidMount = async () => {
    await this.SomeChecked();

    const { music } = this.props;
    const { saved } = this.state;
    this.setState({
      checked: saved.includes(music.trackId),
    });
  }

  SomeChecked = async () => {
    const get = await getFavoriteSongs();
    const musicArray = get.map((obj) => obj.trackId);
    this.setState({
      saved: musicArray,
    });
  }

handleCheck = async (e) => {
  const { music } = this.props;
  this.setState({
    checked: e.target.checked,
    loading: true,
  });

  const getMusic = await getMusics(e.target.id);
  await addSong(getMusic[0]);
  const valid = e.target.checked;
  if (valid) await removeSong(music);
  await getFavoriteSongs();

  this.setState({
    loading: false,
    checked: !e.target.checked,
  });

  // console.log(await getFavoriteSongs());
}

render() {
  const { music: { trackName, previewUrl, trackId } } = this.props;
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
          Favorita
          <input
            key={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            value={ checked }
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
};
