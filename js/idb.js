function init() {
  initServiceWorker();
  initDB();
  console.log('inited :D');
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

const initServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const asd = await navigator.serviceWorker.register('./sw.js');
      console.log(asd);
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log('no service worker found');
  }
};
