console.log('Starting a project!')

const secondsElement = document.getElementById('seconds');
const minutesElement = document.getElementById('minutes');
const hoursElement = document.getElementById('hours');
const startAndResetButtonElement = document.getElementById('start');

function pad(val){
  const value = val + "";
  if(value.length < 2){
    return "0" + value;
  } else {
    return value;
  }
}

function startTheGame(){
  if (startAndResetButtonElement.textContent = "start") {
    startAndResetButtonElement.textContent = 'stop';
    let totalseconds = 0;
    setInterval(setTime, 1000);
    function setTime(){
      ++totalseconds;
      secondsElement.innerHTML = pad(totalseconds) - (minutesElement.innerHTML*60) - (hoursElement.innerHTML*3600);
      minutesElement.innerHTML = pad(parseInt(totalseconds/60)) - (hoursElement.innerHTML*60);
      hoursElement.innerHTML = pad(parseInt(totalseconds/3600));      
    }
  } else if (startAndResetButtonElement.textContent = "stop") {
    clearInterval()
    totalseconds = 0;
    value = 0
    secondsElement.innerHTML = 0;
    minutesElement.innerHTML = 0;
    hoursElement.innerHTML = 0;
    startAndResetButtonElement.textContent = 'start';
  }
}

startAndResetButtonElement.addEventListener('click', startTheGame);