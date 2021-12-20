import { useRef, useState } from 'react';
import './App.css';
import Player from './player';

function App() {
  const [file, setFile] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const headingRef = useRef(null);

  const handleDragEnter = () => {
    headingRef.current.classList.add('selector-active');
  };

  const handleDragExit = () => {
    headingRef.current.classList.remove('selector-active');
  };

  const handleInputChange = (e) => {
    setFile(e.target.files[0]);
    headingRef.current.classList.add('selector-active');
    headingRef.current.innerHTML = e.target.files[0].name;
    setTimeout(() => {
      headingRef.current.style.transform = 'translate(150%, -50%)';
      setTimeout(() => {
        setShowPlayer(true);
      }, 201);
    }, 400);
  };

  return (
    <div className="app">
      {!showPlayer ? (
        <>
          <h2 ref={headingRef} className="selector-heading">
            Select an audio file <br />
            (or drop it here)
          </h2>
          <input
            onChange={handleInputChange}
            onDragLeave={handleDragExit}
            onDragEnter={handleDragEnter}
            title=""
            className="audio-selector"
            type="file"
            placeholder="Select an audio file"
            accept=".mp3,.ogg,.mpeg"
          />
        </>
      ) : (
        <Player file={file} />
      )}
    </div>
  );
}

export default App;
