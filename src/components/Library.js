import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
  super(props);
  this.state = {
    albums: albumData,
    maxWidth: 0
   };
  }

  updateMaxWidth() {
    this.setState({ maxWidth: 404* Math.floor((document.body.clientWidth * 0.85) / 404)});
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateMaxWidth.bind(this));
    this.updateMaxWidth();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMaxWidth.bind(this));
  }


  render() {
   return (
     <section className='library' style={{ maxWidth: this.state.maxWidth }}>
       {
         this.state.albums.map( (album, index) =>
            <Link className="album-link" to={`/album/${album.slug}`} key={index}>
             <img src={album.albumCover} alt={album.title} />
             <div className="album-name">{album.title}</div>
             <div className="album-artist">{album.artist}</div>
            </Link>
         )
       }
     </section>
    );
  }
}

export default Library;
