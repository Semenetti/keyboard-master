
const playCurrentWord = (src) => {
  const audio = new Audio(src);
  audio.preload = 'auto';
  return audio.play();
};

const loseAudioIfClickedWrongKey = () => {
  const audioSrc = './audio/error.mp3';
  playCurrentWord(audioSrc);
};

export default loseAudioIfClickedWrongKey;
