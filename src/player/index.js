import { useEffect, useRef, useState } from 'react';
import 'animate.css';
import albumart from '../images/albumart.jpg';
import jDataView from 'jdataview';
import heart from '../images/heart.svg';
import playlist from '../images/playlist.svg';
import share from '../images/share.svg';
import AudioController from './controller';

export default function Player({ file }) {
  const playerContainerRef = useRef(null);
  const [songData, setSongData] = useState({});

  const getMediaTags = () => {
    var reader = new FileReader();

    reader.onload = (e) => {
      var dv = new jDataView(e.target.result);

      // "TAG" starts at byte -128 from EOF.
      // See http://en.wikipedia.org/wiki/ID3
      if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
        var title = dv.getString(30, dv.tell());
        var artist = dv.getString(30, dv.tell());
        var album = dv.getString(30, dv.tell());
        var year = dv.getString(4, dv.tell());

        setSongData({ title, artist, album, year });
      } else {
        // no ID3v1 data found.
        console.log('not found');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    void playerContainerRef.current.offsetWidth;
    playerContainerRef.current.classList.add('animate__fadeIn');
    console.log(file);
    getMediaTags();
  }, [file]);

  return (
    <div
      ref={playerContainerRef}
      className="animate__animated player-container animate__fast"
    >
      <section className="player-details">
        <div className="art-container">
          <div>
            <img className="music-art" src={albumart} alt="Purple Haze" />
          </div>
        </div>
        <div className="details-contianer">
          <span className="descriptive">Now Playing</span>

          <div>
            <h3 className="song-title">
              {songData.title ? songData.title : file.name}
            </h3>
            <p className="song-artist">
              {songData.artist ? songData.artist : 'Jimi Hendrix'}
            </p>
            <p className="song-album">
              {songData.album ? songData.album : 'Woodstock'}
            </p>
          </div>

          <div className="actions">
            <button className="neumorph-btn mr-5">
              <img src={heart} alt="like" />
            </button>
            <button className="neumorph-btn mr-5">
              <img src={playlist} alt="add to playlist" />
            </button>
            <button className="neumorph-btn mr-5">
              <img src={share} alt="share" />
            </button>
          </div>
        </div>
      </section>
      <AudioController file={file} />
    </div>
  );
}
