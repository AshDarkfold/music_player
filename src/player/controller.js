import shuffle from '../images/shuffle.svg';
import repeat from '../images/repeat.svg';
import pause from '../images/pause.svg';
import prev from '../images/prev.svg';
import loop from '../images/loop.svg';
import mixer from '../images/mixer.svg';
import SeekBar from './seekbar';

export default function AudioController({ file }) {
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
              <button className="neumorph-big bigger">
                <span>
                  <img src={pause} alt="previous" />
                </span>
              </button>
              <button className="neumorph-big">
                <span>
                  <img src={prev} alt="previous" className="vertically-opp" />
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
          <SeekBar file={file} />
          <div>
            <span className="descriptive">0:24</span>
            <span className="descriptive">3:20</span>
          </div>
        </div>
      </div>
    </section>
  );
}
