import 'rc-slider/assets/index.css';
import './seekbar.css';
import Slider from 'rc-slider';

const { Handle } = Slider;

const handle = (props) => {
  const { value, ...restProps } = props;
  return (
    <Handle value={value} {...restProps}>
      <div className="handle-inner" />
    </Handle>
  );
};

export default function SeekBar({ duration, value, changeCurrentTime }) {
  return (
    <div>
      <Slider
        onChange={(time) => {
          changeCurrentTime(time);
        }}
        handle={handle}
        value={value}
        max={duration}
      />
    </div>
  );
}
