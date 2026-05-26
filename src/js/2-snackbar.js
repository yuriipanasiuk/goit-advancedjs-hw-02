import iziToast from './helpers/toast.js';

const refs = {
  form: document.querySelector('.form'),
};

const makePromise = ({ delay, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

const onCreateNotification = e => {
  e.preventDefault();
  const elements = e.target.elements;
  const delayValue = Number(elements.delay.value);
  const stateValue = elements.state.value;

  const shouldResolve = stateValue === 'fulfilled';

  makePromise({ delay: delayValue, shouldResolve })
    .then(delay =>
      iziToast.show({
        backgroundColor: '#59C991',
        message: `✅ Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(delay =>
      iziToast.show({
        backgroundColor: '#E26353',
        message: `❌ Rejected promise in ${delay}ms`,
      })
    );

  e.target.reset();
};

refs.form.addEventListener('submit', onCreateNotification);
