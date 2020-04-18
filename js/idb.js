function initIndexedDB() {
  initServiceWorker();
  initDB();
  console.log('db initialized');
}

const initDB = () => {
  const db = window.indexedDB.open('greetings');
  db.onupgradeneeded = (e) => {
    const db = e.target.result;
    const objStore = db.createObjectStore('greetings_object_store', { autoIncrement: true });
    objStore.createIndex('greeting', 'greeting', { unique: false });
    objStore.createIndex('username', 'username', { unique: false });
  };
};

function initServiceWorker() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker
      .register('./sw.js')
      .then(() => {
        return navigator.serviceWorker.ready;
      })
      .then((registration) => {
        document.getElementById('form').addEventListener('submit', (e) => {
          console.log('hello');

          e.preventDefault();
          saveMsgs().then(() => {
            if (registration.sync) {
              registration.sync.register('greeting-sync').catch((err) => console.error(err));
            }
          });
        });
      });
  }
}

function saveMsgs() {
  return new Promise(function (resolve, reject) {
    const username = 'laavis';

    var tmpObj = {
      username,
      greeting: document.getElementById('input').value,
    };

    var myDB = window.indexedDB.open('greetings');

    myDB.onsuccess = function (event) {
      var objStore = this.result
        .transaction('greetings_object_store', 'readwrite')
        .objectStore('greetings_object_store');
      objStore.add(tmpObj);
      addGreetings([tmpObj]);
      resolve();
    };

    myDB.onerror = function (err) {
      reject(err);
    };
  });
}
