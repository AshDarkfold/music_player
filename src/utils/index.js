import jDataView from 'jdataview';

export const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      resolve(e.target.result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
};

export const readFileMediaTags = (file) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();

    reader.onload = (e) => {
      var dv = new jDataView(e.target.result);
      // "TAG" starts at byte -128 from EOF.
      // See http://en.wikipedia.org/wiki/ID3
      if (dv.getString(3, dv.byteLength - 128) === 'TAG') {
        var title = dv.getString(30, dv.tell());
        var artist = dv.getString(30, dv.tell());
        var album = dv.getString(30, dv.tell());
        var year = dv.getString(4, dv.tell());

        resolve({ title, artist, album, year });
      } else {
        reject('no media tags found');
      }
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};

export const getMinutesAndSeconds = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const seconds = Math.floor(timeInSeconds - minutes * 60).toLocaleString(
    'en-US',
    {
      minimumIntegerDigits: 2,
      useGrouping: false
    }
  );

  return `${minutes}:${seconds}`;
};
