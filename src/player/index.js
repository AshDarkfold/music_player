import { useEffect, useRef, useState } from 'react';
import 'animate.css';
import albumart from '../images/albumart.jpg';
import heart from '../images/heart.svg';
import playlist from '../images/playlist.svg';
import share from '../images/share.svg';
import AudioController from './controller';
import { readFileMediaTags } from '../utils';

export default function Player({ file, audioBase64 }) {
  const playerContainerRef = useRef();
  const [songData, setSongData] = useState({});
  const [audio] = useState(new Audio(audioBase64));
  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const getMediaTags = async () => {
    const mediaTags = await readFileMediaTags(file);
    setSongData(mediaTags);
  };

  const toggleAudio = () => setPlaying(!playing);

  const changeCurrentTime = (timeInSeconds) => {
    audio.currentTime = timeInSeconds;
  };

  useEffect(() => {
    audio && playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    void playerContainerRef.current.offsetWidth;
    playerContainerRef.current.classList.add('animate__fadeIn');
    getMediaTags();

    //eslint-disable-next-line
  }, [file]);

  useEffect(() => {
    audio.addEventListener('ended', () => {
      setPlaying(false);
    });
    audio.addEventListener('timeupdate', (e) => {
      setCurrentTime(audio.currentTime);
    });
    return () => {
      audio.removeEventListener('ended', () => {});
      audio.removeEventListener('timeupdate', () => {});
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div
      ref={playerContainerRef}
      className="animate__animated player-container animate__fast"
    >
      <section className="player-details">
        <div className="art-container">
          <div>
            <img
              className={`music-art ${playing && 'music-art-animate'}`}
              src={albumart}
              alt="Purple Haze"
            />
          </div>
        </div>
        <div className="details-container">
          <span className="descriptive">Now Playing</span>

          <div>
            <h3 className="song-title" title={file.name}>
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
      <AudioController
        duration={audio.duration}
        changeCurrentTime={changeCurrentTime}
        toggleAudio={toggleAudio}
        currentTime={currentTime}
        playing={playing}
      />
    </div>
  );
}
