window.onload = () => {
  'use strict';
  if ('serviceWorker' in navigator) {
    console.log('found');

    navigator.serviceWorker.register('./sw.js');
    console.log(navigator.serviceWorker);
  } else {
    console.log('no');
  }
};
