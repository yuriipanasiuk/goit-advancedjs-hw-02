import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  messageSize: '24',
  position: 'topRight',
  close: false,
  progressBar: false,
  messageColor: 'white',
});

export default iziToast;
