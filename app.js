console.log('Starting a project!')

const secondsElement = document.getElementById('seconds');
const milisecondsElement = document.getElementById('miliseconds');
const startAndResetButtonElement = document.getElementById('start');
const boardElement = document.getElementById('board');
let scoreBoardElement = document.getElementById('score-board');
let score = 0;
let intervalId;
let totalmiliseconds = 300;
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
  paragrath.addEventListener('mouseover', onHoveringTarget);
  paragrath.addEventListener('click', onClickTarget);
  boardElement.append(paragrath);
}

function deleteTarget(){
  const targetElement = document.getElementsByClassName('target');
  targetElement[0].remove();
}

function setTime() {
  if (totalmiliseconds == 0) {
    deleteTarget();
    createTarget();
    reset();
    startTimer();
  }  
  --totalmiliseconds;
  miliseconds.innerHTML = pad(totalmiliseconds) - (secondsElement.innerHTML*100)
  secondsElement.innerHTML = pad(parseInt(totalmiliseconds/100));
}

function startTimer() {
  isTimerRunning = true;
  startAndResetButtonElement.textContent = 'stop';
  intervalId = setInterval(setTime, 10);
  
}

function reset () {
  clearInterval(intervalId)
  totalmiliseconds = 300;
  miliseconds.innerHTML = 0
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

function onHoveringTarget() {
  console.log('hovering !');  
}

function onClickTarget() {
  console.log('great success');
  score = score + 1;
  scoreBoardElement.innerHTML = score;
  deleteTarget();
  createTarget();
  reset();
  startTimer();
}

function reduction() {
  let targetElement = document.getElementsByClassName('target');
  let target
  target = targetElement.style.width * 0.95;
  target = targetElement.style.width * 0.95;
}

function resetReduction () {
  clearInterval(intervalId)
  totalmiliseconds = 300 * (0.95 / scoreBoardElement.innerHTML);
  miliseconds.innerHTML = 0
  secondsElement.innerHTML = 0;
}

startAndResetButtonElement.addEventListener('click', onClickstartTheGame);
