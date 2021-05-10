'use strict';
const playerZero = document.querySelector('.player--0');
const playerOne = document.querySelector('.player--1');
const scoreZeroEl = document.querySelector('#score--0');
const scoreOneEl = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentZero = document.getElementById('current--0');
const currentOne = document.getElementById('current--1');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
const resetScore = [0, 0];
let changed = true;
let playing = true;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerZero.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
};

scoreZeroEl.textContent = 0;
scoreOneEl.textContent = 0;
diceEl.classList.add('hidde');

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove('hidde');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidde');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      switchPlayer();
    }
  }
});

const reset = function () {
  diceEl.classList.remove('hidde');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  scoreOneEl.textContent = 0;
  scoreZeroEl.textContent = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  playing = true;
  currentScore = 0;
  currentOne.textContent = 0;
  currentOne.innerHTML = 0;
  currentZero.innerHTML = 0;
  currentZero.textContent = 0;
  document.getElementById(`score--0`).textContent = resetScore[activePlayer];
};

btnNew.addEventListener('click', reset);
