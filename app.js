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
let totalmiliseconds = 30000;
let initialmiliseconds = 300000 / 10;
let minmiliseconds = 10;
let setIntervalMilisecond = 10;
let isTimerRunning = false;
let life = 3;
let width = 50;
let height = 50;
let easyMode = true;
let easyModeAt = {
  height: 50,
  width: 50,
  reduction: 0.95
}
let hardModeAt = {
  height: 30,
  width: 30,
  reduction: 0.9
}
let intervalTarget;
let currentTargets = [];
let mouseX = null;
let mouseY = null;

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
  currentTargets = [...targetElements];
}

function deleteAllTargets() {
  let targetElements = document.getElementsByClassName('target');
  [...targetElements].forEach(function(target){
    target.remove();
  });
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
  intervalId = setInterval(setTime, setIntervalMilisecond);
  // if (easyMode === false) {
  //   intervalTarget = setInterval(movingATarget, setIntervalMilisecond * 20)
  // }
}

function reset () {
  clearInterval(intervalId)
  if (score == 0) {
    totalmiliseconds = initialmiliseconds;
  } else {
    if (easyMode === true) {
      totalmiliseconds = Math.round((initialmiliseconds) * (easyModeAt.reduction / score));
      if (totalmiliseconds <= minmiliseconds) {
        totalmiliseconds = minmiliseconds;
      }
    } else if (easyMode === false) {
      totalmiliseconds = Math.round((initialmiliseconds) * (hardModeAt.reduction / score));
      if (totalmiliseconds <= minmiliseconds) {
        totalmiliseconds = minmiliseconds;
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
    lifeBoardElement.innerHTML = life;
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
    lifeBoardElement.innerHTML = life;
    if (easyMode === true) {
      width = easyModeAt.width;
      height = easyModeAt.height;
    } else if (easyMode === false) {
      width = hardModeAt.width;
      height = hardModeAt.height;
    }
  }
}

function reduction() {
  let target = document.getElementsByClassName('target');
  if (width > 2 && height > 2){
    if (easyMode === true){
      width = Math.round(width * easyModeAt.reduction);
      height = Math.round(height * easyModeAt.reduction);
    } else if (easyMode === false){
      width = Math.round(width * hardModeAt.reduction);
      height = Math.round(height * hardModeAt.reduction);
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
    width = easyModeAt.width;
    height = easyModeAt.height;
  } else if (easyMode === true) {
    hardModeButton.innerText = 'Hard Mode';
    hardModeButton.removeAttribute('id', 'easy-mode');
    hardModeButton.setAttribute('id', 'hard-mode');
    scoreBoardElement.setAttribute('id', 'hard');
    easyMode = false;
    width = hardModeAt.width;
    height = hardModeAt.height;
  }
}

function movingATarget() {
  if (mouseX === null && mouseY === null){
    return;
  }
  let targetElements = document.getElementsByClassName('target');
  const boardParams = boardElement.getBoundingClientRect();
  for ( let i = 0; i < targetElements.length; i++) {
    let targetElementParams = targetElements[i].getBoundingClientRect();
    let targetPosX = targetElementParams.x - boardParams.x;
    let targetPosY = targetElementParams.y - boardParams.y;
    let mouseXVsTargetX = mouseX - targetPosX;
    let mouseYVsTargetY = mouseY - targetPosY;
    vektorM = Math.sqrt(mouseX * mouseX + mouseY * mouseY)
    vectorT = Math.sqrt(targetPosX * targetPosX + targetPosY * targetPosY)
    vectorMT = vektorM - vectorT;
    let futureX = targetPosX - mouseXVsTargetX;
    let futureY = targetPosY - mouseYVsTargetY;
    if (futureX >= 0 && futureY >= 0 && futureX <= boardParams.width && futureY <= boardParams.height) {
      if (vectorMT <= 50) {        
        targetElements[i].style.left = futureX + 'px';
        targetElements[i].style.top = futureY + 'px';
      }
    }
  }
}

function onMouseMoveCoordinates (event) {
  const positionX = event.clientX;
  const positionY = event.clientY;

  const boardParams = boardElement.getBoundingClientRect();
  let mousePositionX = positionX - boardParams.x;
  let mousePositionY = positionY - boardParams.y;

  mouseX = mousePositionX;
  mouseY = mousePositionY;

  let targetElements = document.getElementsByClassName('target');
  // const boardParams = boardElement.getBoundingClientRect();
  for ( let i = 0; i < targetElements.length; i++) {
    let targetElementParams = targetElements[i].getBoundingClientRect();
    let targetPosX = targetElementParams.x - boardParams.x + targetElementParams.width/2;
    let targetPosY = targetElementParams.y - boardParams.y + targetElementParams.height/2;
    let mouseXVsTargetX = mouseX - targetPosX;
    let mouseYVsTargetY = mouseY - targetPosY;
    vektorM = Math.sqrt(mouseX * mouseX + mouseY * mouseY)
    vectorT = Math.sqrt(targetPosX * targetPosX + targetPosY * targetPosY)
    vectorMT = vektorM - vectorT;
    let futureX = targetPosX - mouseXVsTargetX;
    let futureY = targetPosY - mouseYVsTargetY;
    if (futureX >= 0 && futureY >= 0 && futureX <= boardParams.width && futureY <= boardParams.height) {
      if (vectorMT <= 65) {
        console.log(futureX, futureY)
        targetElements[i].style.left = futureX + 'px';
        targetElements[i].style.top = futureY + 'px';
      }
    }
  }
}

startAndResetButtonElement.addEventListener('click', onClickstartTheGame);
hardModeButton.addEventListener('click', startHardMode);
boardElement.addEventListener('mousemove', onMouseMoveCoordinates);
