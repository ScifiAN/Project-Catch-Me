console.log('Starting a project!')

const secondsElement = document.getElementById('seconds');
const minutesElement = document.getElementById('minutes');
const hoursElement = document.getElementById('hours');
const startAndResetButtonElement = document.getElementById('start');
const boardElement = document.getElementById('board');
let intervalId;
let totalseconds = 0;
let isTimerRunning = false;

function pad(val){
  const value = val + "";
  if(value.length < 2){
    return "0" + value;
  } else {
    return value;
  }
}

function setTime(){
  ++totalseconds;
  secondsElement.innerHTML = pad(totalseconds) - (minutesElement.innerHTML*60) - (hoursElement.innerHTML*3600);
  minutesElement.innerHTML = pad(parseInt(totalseconds/60)) - (hoursElement.innerHTML*60);
  hoursElement.innerHTML = pad(parseInt(totalseconds/3600));      
}

function startTheGame(){
  if (isTimerRunning === false) {
    startAndResetButtonElement.textContent = 'stop';
    intervalId = setInterval(setTime, 1000);
    let paragrath = document.createElement('p');
    boardElement.append("", paragrath);
    paragrath.classList.add('board-element');
  } else if (isTimerRunning === True) {
    clearInterval(intervalId)
    totalseconds = 0;
    secondsElement.innerHTML = 0;
    minutesElement.innerHTML = 0;
    hoursElement.innerHTML = 0;
    startAndResetButtonElement.textContent = 'Start the game';
  }
}

startAndResetButtonElement.addEventListener('click', startTheGame);