'use strict';

window.addEventListener('load', async () => {
  const ul = document.querySelector('ul');
  const rfrsh = document.querySelector('#refresh');
  const form = document.querySelector('form');
  const username = 'laavis';
  const greeting = form.elements.greeting;

  const init = async () => {
    const data = [];
    try {
      const greetings = await getGreetingsByUser(username);
      for (const message of greetings) {
        data.push(message);
      }
    } catch (err) {
      console.error(err);
    }

    ul.innerHTML = '';
    console.log(data);

    addGreetings(data);
  };

  init();
  initIndexedDB();

  rfrsh.addEventListener('click', init);
});

const addGreetings = (data) => {
  const ul = document.querySelector('ul');
  data.forEach((x) => {
    ul.innerHTML += `<li>${x.username}: ${x.greeting}</li>`;
  });
};
