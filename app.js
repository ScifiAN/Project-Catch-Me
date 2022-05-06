console.log('Starting a project!')

const secondsElement = document.getElementById('seconds');
const milisecondsElement = document.getElementById('miliseconds');
const startAndResetButtonElement = document.getElementById('start');
const hardModeButton = document.getElementById('easy-mode');
const boardElement = document.getElementById('board');
let scoreBoardElement = document.getElementById('score-board');
let scoreBoardLabelElement = document.getElementById('score-board label');
let lifeBoardElement = document.getElementById('lives');
let score = 0;
let intervalId;
let totalmiliseconds = 300;
let isTimerRunning = false;
let life = 3;
let width = 50;
let height = 50;
let easyMode = true;
let reductionEasy = 0.95;
let reductionHard = 0.9;
let intervalTarget;
let currentTargets = [];
let mouseX;
let mouseY;

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
  let x = Math.random() * (boardParams.width - width);
  x=Math.round(x);
  let y = Math.random() * (boardParams.height - height);
  y=Math.round(y);
  let paragrath = document.createElement('p');
  paragrath.classList.add('target');
  paragrath.style.left = x + 'px';
  paragrath.style.top = y + 'px';
  paragrath.style.width = width + 'px';
  paragrath.style.height = height + 'px';
  paragrath.addEventListener('mouseover', onHoveringTarget);
  paragrath.addEventListener('click', onClickTarget);
  boardElement.append(paragrath);
  currentTargets.push(paragrath);
}

function deleteTarget(event){
  event.currentTarget.remove();
  let targetElements = document.getElementsByClassName('target');
  currentTargets = targetElements;
}

function deleteAllTargets() {
  let targetElements = document.getElementsByClassName('target');
  for ( let i = 0; i < targetElements.length; i++) {
    targetElements[i].remove();
  }
  currentTargets = [];
}

function setTime() {
  if (totalmiliseconds <= 0 && life > 0) {
    lifeReduction();
    deleteAllTargets();
    createTarget();
    createTarget();
    reset();
    startTimer();
  }  else if (totalmiliseconds <= 0 && life == 0){
    lifeReduction();
  }
  --totalmiliseconds;
  miliseconds.innerHTML = pad(totalmiliseconds) - (secondsElement.innerHTML * 100)
  secondsElement.innerHTML = pad(parseInt(totalmiliseconds / 100));
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
    if (easyMode === true) {
      totalmiliseconds = Math.round(300 * (reductionEasy / scoreBoardElement.innerHTML));
      if (totalmiliseconds <= 10) {
        totalmiliseconds = 10;
      }
    } else if (easyMode === false) {
      totalmiliseconds = Math.round(300 * (reductionHard / scoreBoardElement.innerHTML));
      if (totalmiliseconds <= 10) {
        totalmiliseconds = 10;
      }
    }
  }
  miliseconds.innerHTML = 0
  secondsElement.innerHTML = 0;
}

function stopTimer() {
  isTimerRunning = false;
  reset();
  startAndResetButtonElement.textContent = 'Start the game';
  score = 0;
  scoreBoardElement.innerHTML = score
}

function onClickstartTheGame() {
  if (isTimerRunning === false) {
    createTarget();
    createTarget();
    startTimer();
  } else if (isTimerRunning === true) {
    stopTimer();
    deleteAllTargets();
    life = 3;
    lifeBoardElement.innerHTML = 3;
  }
}

function onHoveringTarget() {
  console.log('hovering !');  
}

function onClickTarget(event) {
  console.log('great success');
  deleteTarget(event);
  let target = document.getElementsByClassName('target');
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
    deleteAllTargets();
    alert('Game over');
    life = 3;
    lifeBoardElement.innerHTML = 3;
    width = 50;
    height = 50;
  }
}

function reduction() {
  let target = document.getElementsByClassName('target');
  if (width > 2 && height > 2){
    if (easyMode === true){
      width = Math.round(width * reductionEasy);
      height = Math.round(height * reductionEasy);
    } else if (easyMode === false){
      width = Math.round(width * reductionHard);
      height = Math.round(height * reductionHard);
    }
    for ( let i = 0; i < target.length; i++) {
      target[i].style.width = width + 'px';
      target[i].style.height = height + 'px';
    }
  } else {
    width = 1;
    height = 1;
    for ( let i = 0; i < target.length; i++) {
      target[i].style.width = width + 'px';
      target[i].style.height = height + 'px';
    }
  }
}

function startHardMode() {
  if (easyMode === false) {
    hardModeButton.innerText = 'Easy Mode';
    hardModeButton.removeAttribute('id', 'hard-mode');
    hardModeButton.setAttribute('id', 'easy-mode');
    scoreBoardElement.setAttribute('id', 'score-board');
    easyMode = true;
    width = 50;
    height = 50;
  } else if (easyMode === true) {
    hardModeButton.innerText = 'Hard Mode';
    hardModeButton.removeAttribute('id', 'easy-mode');
    hardModeButton.setAttribute('id', 'hard-mode');
    scoreBoardElement.setAttribute('id', 'hard');
    easyMode = false;
    width = 30;
    height = 30;
  }
}

function escapingTargetTimer(event) {
  if (easyMode === false){
    intervalTarget = setInterval(escapingTarget(event), 200)
  }  
}

function escapingTarget(event) {
  const targets = document.getElementsByClassName('target');
  mouseX = event.clientX;
  mouseY = event.clientY;
  let targetL;
  let targetT;  
  for ( let i = 0; i < targets.length; i++) {
    targetL = targets[i].style.left;
    targetT = targets[i].style.top;
    targetL = parseInt(targetL);
    targetT = parseInt(targetT);
    vektorM = Math.sqrt(mouseX * mouseX + mouseY * mouseY)
    vectorT = Math.sqrt(targetL * targetL + targetT * targetT)
    vectorMT = vektorM - vectorT;
    if (mouseX >= targetL + width + 50 && mouseY >= targetT + height + 50 && vectorMT <= 50) {
        targetL = targetL - 1;
        targetT = targetT - 1;
        targets[i].style.left = targetL + 'px';
        targets[i].style.top = targetT + 'px';
    } else if (mouseX >= targetL + 50 && mouseY >= targetT + height + 50  && vectorMT <= 50) {
        targetT = targetT - 1;
        targets[i].style.top = targetT + 'px';
    } else if (mouseX <= targetL + 50 && mouseY >= targetT + height + 50  && vectorMT <= 50) {
        targetL = targetL + 1;
        targetT = targetT - 1;
        targets[i].style.left = targetL + 'px';
        targets[i].style.top = targetT + 'px';
    } else if (mouseX >= targetL + width + 50 && mouseY >= targetT+ 50  && vectorMT <= 50) {
        targetL = targetL - 1;
        targets[i].style.left = targetL + 'px';
    } else if (mouseX >= targetL + width + 50 && mouseY <= targetT + 50  && vectorMT <= 50) {
        targetL = targetL - 1;
        targetT = targetT + 1;
        targets[i].style.left = targetL + 'px';
        targets[i].style.top = targetT + 'px';
    } else if (mouseX >= targetL + 50 && mouseY <= targetT + 50  && vectorMT <= 50) {
        targetT = targetT + 1;
        targets[i].style.top = targetT + 'px';
    } else if (mouseX <= targetL + 50 && mouseY >= targetT + 50 && vectorMT <= 50) {
        targetL = targetL + 1;
        targets[i].style.left = targetL + 'px';
    } else if (mouseX <= targetL + 50 && mouseY <= targetT + 50 && vectorMT <= 50) {
        targetL = targetL + 1;
        targetT = targetT + 1;
        targets[i].style.left = targetL + 'px';
        targets[i].style.top = targetT + 'px';
    }
  }
}

startAndResetButtonElement.addEventListener('click', onClickstartTheGame);
hardModeButton.addEventListener('click', startHardMode);
boardElement.addEventListener('mousemove', escapingTargetTimer);
