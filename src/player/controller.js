import shuffle from '../images/shuffle.svg';
import repeat from '../images/repeat.svg';
import pause from '../images/pause.svg';
import play from '../images/play.svg';
import prev from '../images/prev.svg';
import loop from '../images/loop.svg';
import mixer from '../images/mixer.svg';
import SeekBar from './seekbar';
import { getMinutesAndSeconds } from '../utils';

export default function AudioController({
  duration,
  currentTime,
  playing,
  changeCurrentTime,
  toggleAudio
}) {
  return (
    <section className="controller-container">
      <div className="controller-inner">
        <div className="controller">
          <div className="buttons">
            <button className="ghost-btn">
              <img src={shuffle} alt="shuffle" />
            </button>
            <button className="ghost-btn">
              <img src={repeat} alt="repeat" />
            </button>
            <div>
              <button className="neumorph-big">
                <span>
                  <img src={prev} alt="previous" />
                </span>
              </button>
              <button className="neumorph-big bigger" onClick={toggleAudio}>
                <span>
                  {playing ? (
                    <img src={pause} alt="pause" />
                  ) : (
                    <img src={play} alt="play" />
                  )}
                </span>
              </button>
              <button className="neumorph-big">
                <span>
                  <img src={prev} alt="next" className="vertically-opp" />
                </span>
              </button>
            </div>
            <button className="ghost-btn">
              <img src={loop} alt="loop" />
            </button>
            <button className="ghost-btn">
              <img src={mixer} alt="mixer" />
            </button>
          </div>
        </div>
        <div className="seekbar-container">
          <SeekBar
            duration={duration}
            value={currentTime}
            changeCurrentTime={changeCurrentTime}
          />
          <div>
            <span className="descriptive">
              {getMinutesAndSeconds(currentTime)}
            </span>
            <span className="descriptive">
              {getMinutesAndSeconds(duration)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
