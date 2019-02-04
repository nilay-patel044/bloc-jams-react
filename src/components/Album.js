import React, { Component } from 'react';
import albumData from './../data/albums.js';
import PlayerBar from './PlayerBar';
import { Document, Page } from 'react-pdf';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
}


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug;
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
    };


    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  formatTime(timeInSeconds) {
    return timeInSeconds ? `${Math.floor(timeInSeconds/60)}:${Number(timeInSeconds % 60 / 100).toFixed(2).substr(2,3)}`: '-:--';
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeChange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumeChange', this.eventListeners.volumeChange);

  }
  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumeChange', this.eventListeners.volumeChange);

  }
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }
  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }
  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }
  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
  handleVolumeChange(e) {
    const newState = {'volume': e.target.value };
    this.audioElement.volume = newState.volume;
    this.setState(newState);
  }

  thisSongIsPlaying(song) {
    return this.state.currentSong === song && this.state.isPlaying;
  }

  render() {
      const { file, numPages } = this.state;
      return (
        <main>
          <section className="album">
            <section id="album-info">
              <div className="pdfLoaded">
                <Document
                  file={this.state.album.pdfFILE}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  options={options}
                >
                {
                  Array.from(
                    new Array(numPages),
                    (el, index) => (
                      <Page
                        key={'page_${index + 1}'}
                        pageNumber={index + 1}
                      />
                    ),
                  )
                }
                </Document>
              </div>
              <div className="album-details">
                <h1 id="album-title">{this.state.album.title}</h1>
                <h2 className="artist">{this.state.album.artist}</h2>
                <div id="release-info">{this.state.album.releaseInfo}</div>
              </div>
            </section>
          <div className = "song-list-container">
          <table id="song-list">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>
              <tbody>
                {this.state.album.songs.map((song, index) =>
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                    <td className="song-actions">
                      <button>
                        <span className={this.thisSongIsPlaying(song) ? "invisible" : "song-number"}>{index+1}</span>
                        <span className={this.thisSongIsPlaying(song) ? "invisible" : "ion-play"}></span>
                        <span className={this.thisSongIsPlaying(song) ? "ion-pause" : "invisible"}></span>
                    </button>
                  </td>
                  <td className="song-title">{song.title}</td>
                  <td className="song-duration">{this.formatTime(song.duration)}</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </section>
    <PlayerBar
      isPlaying={this.state.isPlaying}
      currentSong={this.state.currentSong}
      currentTime={this.audioElement.currentTime}
      duration={this.audioElement.duration}
      currentVolume={this.audioElement.volume}
      formattedTime={this.formatTime(this.audioElement.currentTime, true)}
      formattedTimeLeft={this.formatTime(this.audioElement.duration - Math.floor(this.audioElement.currentTime), true)}
      handleSongClick={() => this.handleSongClick(this.state.currentSong)}
      handlePrevClick={() => this.handlePrevClick()}
      handleNextClick={() => this.handleNextClick()}
      handleTimeChange={(e) => this.handleTimeChange(e)}
      handleVolumeChange={(e) => this.handleVolumeChange(e)}
    />
    </main>
  );
}
}

export default Album;
