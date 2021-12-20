import { useEffect, useRef } from 'react';
import 'animate.css';

export default function Player({ file }) {
  const playerContainerRef = useRef(null);

  useEffect(() => {
    void playerContainerRef.current.offsetWidth;
    playerContainerRef.current.classList.add('animate__slideInLeft');
  }, []);

  return (
    <div
      ref={playerContainerRef}
      className="animate__animated player-container animate__fast"
    >
      <span>Music player UI will go here</span>
    </div>
  );
}
