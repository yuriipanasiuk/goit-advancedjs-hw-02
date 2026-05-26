import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from './helpers/toast.js';
import { convertMs } from './helpers/convertMs.js';
import { addLeadingZero } from './helpers/addLeadingZero.js';

const refs = {
  startButton: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  dataInput: document.getElementById('datetime-picker'),
};

let userSelectedData = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() <= Date.now()) {
      iziToast.show({
        backgroundColor: '#E26353',
        message: 'Please choose a date in the future',
      });

      refs.startButton.disabled = true;
      userSelectedData = null;
      timerId = null;

      return;
    }

    userSelectedData = selectedDate;
    refs.startButton.disabled = false;
  },
};

flatpickr(refs.dataInput, options);

const updateDom = ({ days, hours, minutes, seconds }) => {
  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);
};

const updateTimerInterface = () => {
  const diff = userSelectedData.getTime() - Date.now();

  if (diff <= 0) {
    clearInterval(timerId);
    timerId = null;
    refs.dataInput.disabled = false;
    updateDom({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }

  const times = convertMs(diff);
  updateDom(times);
};

const onStartButtonClick = () => {
  if (timerId || !userSelectedData) {
    return;
  }

  refs.dataInput.disabled = true;
  refs.startButton.disabled = true;

  updateTimerInterface();

  timerId = setInterval(() => updateTimerInterface(), 1000);
};

refs.startButton.addEventListener('click', onStartButtonClick);
