import { useEffect, useRef, useState } from 'react';
import './App.css';
import Player from './player';
import { readFileAsBase64 } from './utils';

function App() {
  const [file, setFile] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [audioString, setAudioString] = useState('');
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
      headingRef.current.style.transform = 'translate(200%, -50%) scale(1.1)';
      setTimeout(() => {
        setShowPlayer(true);
      }, 201);
    }, 400);
  };

  const handleAudioSet = async () => {
    const audio = await readFileAsBase64(file);
    setAudioString(audio);
  };

  useEffect(() => {
    if (!file) return;
    handleAudioSet();
    //eslint-disable-next-line
  }, [file]);

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
        audioString && <Player file={file} audioBase64={audioString} />
      )}
    </div>
  );
}

export default App;
