console.log('Starting a project!')

const secondsElement = document.getElementById('seconds');
const milisecondsElement = document.getElementById('miliseconds');
const startAndResetButtonElement = document.getElementById('start');
const boardElement = document.getElementById('board');
let scoreBoardElement = document.getElementById('score-board');
let lifeBoardElement = document.getElementById('lives')
let score = 0;
let intervalId;
let totalmiliseconds = 300;
let isTimerRunning = false;
let life = 3;
let width = 50;
let height = 50;

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
  let target = document.getElementsByClassName('target');
  if (totalmiliseconds == 0 && life > 0) {
    lifeReduction();
    deleteTarget();
    if (target[0]){
      deleteTarget();
    }
    createTarget();
    createTarget();
    reset();
    startTimer();
  }  else if (totalmiliseconds == 0 && life == 0){
    lifeReduction();
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
  if (scoreBoardElement.innerHTML == 0) {
    totalmiliseconds = 300
  } else {
    totalmiliseconds = Math.round(300 * (0.95 / scoreBoardElement.innerHTML));
  }
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
    createTarget();
    startTimer();
  } else if (isTimerRunning === true) {
    stopTimer();
    deleteTarget();
    deleteTarget()
    life = 3;
    lifeBoardElement.innerHTML = 3;
  }
}

function onHoveringTarget() {
  console.log('hovering !');  
}

function onClickTarget() {
  console.log('great success');
  let target = document.getElementsByClassName('target');
  deleteTarget();
  if (!target[0]) {
    score = score + 1;
    scoreBoardElement.innerHTML = score;
    createTarget();
    createTarget();
    reduction();
    reset();
    startTimer();
  }
}

function lifeReduction() {
  if (life > 0){
    life = life - 1;
    lifeBoardElement.innerHTML = life;
  } else if (life == 0) {
    stopTimer();
    deleteTarget();
    deleteTarget();
    alert('Game over');
    life = 3;
    lifeBoardElement.innerHTML = 3;
    width = 50;
    height = 50;
  }
}

function reduction() {
  let target = document.getElementsByClassName('target');
  width = Math.round(width * 0.95);
  height = Math.round(height * 0.95);
  target[0].style.width = width + 'px';
  target[0].style.height = height + 'px';
}

startAndResetButtonElement.addEventListener('click', onClickstartTheGame);
