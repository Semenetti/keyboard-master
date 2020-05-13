import 'babel-polyfill';
import keys from './js/keys';
import loseAudioIfClickedWrongKey from './js/audio';

const display = document.getElementById('display');

function getRandomNumber(min, max) {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)];
}

function targetRandomKey() {
  const key = document.getElementById(getRandomKey());
  key.classList.add('active');
  if (key.id === 'Space') {
    display.textContent = 'Пробел';
  } else {
    display.textContent = key.textContent;
  }
}


const cancelCommandKeysDefaultActions = (e) => {
  const TAB = 'Tab';
  const ALT = 'Alt';
  const BACKSPACE = 'Backspace';
  const ENTER = 'Enter';

  let key;

  switch (e.key) {
    case TAB:
      e.preventDefault();
      key = e.code;
      break;
    case ALT:
      e.preventDefault();
      key = e.code;
      break;
    case BACKSPACE:
      e.preventDefault();
      key = e.code;
      break;
    case ENTER:
      e.preventDefault();
      key = e.code;
      break;
    default:
      key = e.code;
      break;
  }
  return key;
};


document.addEventListener('keydown', (event) => {
  const keyPressed = cancelCommandKeysDefaultActions(event);

  if (document.getElementById(keyPressed)) {
    const keyElement = document.getElementById(keyPressed);
    keyElement.classList.add('hit');
    keyElement.addEventListener('animationend', () => {
      keyElement.classList.remove('hit');
    });
  }
  const highlightedKey = document.querySelector('.active');


  if (keyPressed === highlightedKey.id) {
    highlightedKey.classList.remove('active');
    targetRandomKey();
  } else {
    loseAudioIfClickedWrongKey();
  }
});

targetRandomKey();
