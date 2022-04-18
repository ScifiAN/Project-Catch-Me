function createTarget(){
  let paragrath = document.createElement('p');
  boardElement.append("", paragrath);
  paragrath.classList.add('board-element');
}

function deleteTarget(){
  const targetElement = document.getElementById('board-element');
  targetElement.remove();
}