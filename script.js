// ----- Game logic (yours, slightly adapted) -----
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();
  if (humanChoice === computerChoice) {
    return "It's a tie!";
  }
  if (
    (humanChoice === 'rock' && computerChoice === 'scissors') ||
    (humanChoice === 'paper' && computerChoice === 'rock') ||
    (humanChoice === 'scissors' && computerChoice === 'paper')
  ) {
    humanScore++;
    return `You win! ${humanChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    return `You lose! ${computerChoice} beats ${humanChoice}.`;
  }
}

// ----- UI wiring -----
(function initRPS() {
  const playerCircle = document.getElementById('Player-Choice');
  const computerCircle = document.getElementById('Computer-Choice');
  const playerScoreEl = document.getElementById('Player-Score');
  const computerScoreEl = document.getElementById('Computer-Score');
  const buttons = document.querySelectorAll('.choice');
  const WIN_SCORE = 5;

  // Create a result banner after the arena if it doesn't exist
  function getOrCreateBanner() {
    let bar = document.getElementById('result');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'result';
      bar.style.margin = '1em auto';
      bar.style.textAlign = 'center';
      bar.style.fontSize = '1.5em';
      bar.style.fontWeight = 'bold';
      const arena = document.querySelector('.arena');
      arena.insertAdjacentElement('afterend', bar);
    }
    return bar;
  }

function getIcon(choice) {
  switch (choice) {
    case 'rock': return '<span class="rps-icon">✊</span>';
    case 'paper': return '<span class="rps-icon">✋</span>';
    case 'scissors': return '<span class="rps-icon">✌️</span>';
    default: return '<span class="rps-icon">❓</span>';
  }
}

  function renderChoice(el, choice) {
    el.innerHTML = `<div class="pick">${getIcon(choice)}</div>`;
  }

  function resetCircles() {
    playerCircle.innerHTML = '<p>Player choice</p>';
    computerCircle.innerHTML = '<p>Computer choice</p>';
  }

  function updateScore() {
    playerScoreEl.textContent = humanScore;
    computerScoreEl.textContent = computerScore;
  }

  function showMessage(msg) {
    getOrCreateBanner().textContent = msg;
  }

  function addReset() {
    if (document.getElementById('reset-btn')) return;
    const reset = document.createElement('button');
    reset.id = 'reset-btn';
    reset.textContent = 'Play again';
    reset.className = 'choice'; // reuse existing button styling
    document.querySelector('.choices').appendChild(reset);
    reset.addEventListener('click', () => {
      humanScore = 0;
      computerScore = 0;
      updateScore();
      resetCircles();
      showMessage('New game! First to 5.');
      buttons.forEach(b => b.disabled = false);
      reset.remove();
    });
  }

  function endIfWin() {
    if (humanScore >= WIN_SCORE || computerScore >= WIN_SCORE) {
      const winner = humanScore > computerScore ? 'You' : 'Computer';
      showMessage(`${winner} win the game ${humanScore}–${computerScore}.`);
      buttons.forEach(b => b.disabled = true);
      addReset();
      return true;
    }
    return false;
  }

  // Hook up the three buttons
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const humanChoice = btn.dataset.choice;               // 'rock' | 'paper' | 'scissors'
      const computerChoice = getComputerChoice();
      const result = playRound(humanChoice, computerChoice);

      renderChoice(playerCircle, humanChoice);
      renderChoice(computerCircle, computerChoice);
      updateScore();
      showMessage(result);
      endIfWin();
    });
  });

  // Initial UI state
  updateScore();
  showMessage('First to 5 wins. Make your move!');
})();
