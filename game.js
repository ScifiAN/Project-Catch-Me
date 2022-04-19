let buttonCreateElement = document.getElementById('add');
const boardEl = document.getElementById('board');

function createTarget(){
  let x=Math.random()*994.4;
  x=Math.round(x);
  let y=Math.random()*700.594;
  y=Math.round(y);
  let paragrath = document.createElement('p');
  paragrath.classList.add('target');
  paragrath.style.left = x + 32 + 'px';
  paragrath.style.top = y + 112 + 'px';
  boardEl.append(paragrath);
}

function deleteTarget(){
  const targetElement = document.getElementById('target');
  targetElement.remove();
}

buttonCreateElement.addEventListener('click', createTarget);
