console.log('Starting a project!')

const secondsElement = document.getElementById('seconds');
const startAndResetButtonElement = document.getElementById('start');
const boardElement = document.getElementById('board');
let intervalId;
let totalseconds = 0;
let isTimerRunning = false;

function pad(val){
  const value = val + "";
  if (value.length < 2) {
    return "0" + value;
  } else {
    return value;
  }
}

function createTarget() {
  const boardParams = boardElement.getBoundingClientRect();
  let x=Math.random()*(boardParams.width - 50);
  x=Math.round(x);
  let y=Math.random()*(boardParams.height - 50);
  y=Math.round(y);
  let paragrath = document.createElement('p');
  paragrath.classList.add('target');
  paragrath.style.left = x + 'px';
  paragrath.style.top = y + 'px';
  boardElement.append(paragrath);
}

function deleteTarget(){
  const targetElement = document.getElementsByClassName('target');
  targetElement[0].remove();
}

function setTime() {
  ++totalseconds;
  secondsElement.innerHTML = pad(totalseconds);
  if (totalseconds == 4) {
    deleteTarget();
    createTarget();
    reset();
    startTimer();
  }  
}

function startTimer() {
  isTimerRunning = true;
  startAndResetButtonElement.textContent = 'stop';
  intervalId = setInterval(setTime, 1000);
  
}

function reset () {
  clearInterval(intervalId)
  totalseconds = 0;
  secondsElement.innerHTML = 0;
}

function stopTimer() {
  isTimerRunning = false;
  reset();
  startAndResetButtonElement.textContent = 'Start the game';
}

function onClickstartTheGame() {
  if (isTimerRunning === false) {
    createTarget();
    startTimer();
  } else if (isTimerRunning === true) {
    stopTimer();
    deleteTarget();
  }
}

startAndResetButtonElement.addEventListener('click', onClickstartTheGame);