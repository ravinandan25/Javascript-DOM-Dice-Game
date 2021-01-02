var scores, roundScore, activePlayer, finalScore, gamePlaying;

init();

var col = document.querySelector('.player-' + activePlayer + '-panel');
col.classList.add('active');

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //  1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    var diceDom = document.querySelector('.dice');
    var diceDom2 = document.getElementById('dice-2');
    diceDom.style.display = 'block';
    diceDom2.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    diceDom2.src = 'dice-' + dice2 + '.png';

    // 3. Update the score
    if (dice !== 1 && dice2 !== 1) {
      roundScore += dice + dice2;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      col.classList.remove('active');

      roundScore = 0;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
      if (activePlayer === 1) activePlayer = 0;
      else activePlayer = 1;
      col = document.querySelector('.player-' + activePlayer + '-panel');
      col.classList.add('active');
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  scores[activePlayer] += roundScore;
  document.getElementById('score-' + activePlayer).textContent =
    scores[activePlayer];
  document.getElementById('current-' + activePlayer).textContent = '0';
  roundScore = 0;
  var temp = document.querySelector('.final-score').value;
  if (temp) {
    finalScore = temp;
  } else {
    finalScore = 100;
  }
  if (scores[0] < finalScore && scores[1] < finalScore) {
    col.classList.remove('active');
    if (activePlayer === 1) activePlayer = 0;
    else activePlayer = 1;
    col = document.querySelector('.player-' + activePlayer + '-panel');
    col.classList.add('active');
  } else {
    gamePlaying = false;
    document.querySelector('#player-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
  }
});

document.querySelector('.btn-new').addEventListener('click', function () {
  init();
  col.classList.remove('active');
  col = document.querySelector('.player-' + 0 + '-panel');
  col.classList.add('active');
});

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.querySelector('#player-0').textContent = 'Player 1';
  document.querySelector('#player-1').textContent = 'Player 2';
}
