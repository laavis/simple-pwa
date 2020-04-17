window.onload = () => {
  'use strict';
  if ('serviceWorker' in navigator) {
    console.log('found');

    navigator.serviceWorker.register('../sw.js');
  } else {
    console.log('no');
  }
};
