import { useState } from 'react';
import 'rc-slider/assets/index.css';
import './seekbar.css';
import Slider from 'rc-slider';

const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Handle value={value} {...restProps}>
      <div className="handle-inner" />
    </Handle>
  );
};

export default function SeekBar({ file }) {
  return (
    <div>
      <Slider handle={handle} />
    </div>
  );
}
