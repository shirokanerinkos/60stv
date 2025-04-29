
const tvScreen = document.getElementById('tvScreen');
const channelDisplay = document.getElementById('channelDisplay');
const scoreboard = document.getElementById('scoreboard');

const votes = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0
};

const programs = {
  1: { background: '#7f00ff', text: 'Program 1' },
  2: { background: '#ff4c4c', text: 'Program 2' },
  3: { background: '#00bfff', text: 'Program 3' },
  4: { background: '#00ff7f', text: 'Program 4' },
  5: { background: '#ffff00', text: 'Program 5' },
  6: { background: '#ff69b4', text: 'Program 6' }
};

let totalVotes = 0;
const maxVotes = 10;

function vote(channel) {
  votes[channel]++;
  totalVotes++;
  updateScoreboard();

  if (totalVotes >= maxVotes) {
    finishVoting();
  }
}

function updateScoreboard() {
  scoreboard.innerHTML = `
    <p>Program 1: ${votes[1]} votes</p>
    <p>Program 2: ${votes[2]} votes</p>
    <p>Program 3: ${votes[3]} votes</p>
    <p>Program 4: ${votes[4]} votes</p>
    <p>Program 5: ${votes[5]} votes</p>
    <p>Program 6: ${votes[6]} votes</p>
    <p>Total Votes: ${totalVotes}/${maxVotes}</p>
  `;
}

function finishVoting() {
  disableVotingButtons();
  tvScreen.style.backgroundColor = 'black';
  channelDisplay.innerText = 'And the winner is...';
  scoreboard.innerHTML = '';

  setTimeout(() => {
    let winningProgram = 1;
    let highestVotes = 0;

    for (let program in votes) {
      if (votes[program] > highestVotes) {
        highestVotes = votes[program];
        winningProgram = program;
      }
    }

    const programInfo = programs[winningProgram];
    tvScreen.style.backgroundColor = programInfo.background;
    channelDisplay.innerText = `Winner: ${programInfo.text} (${highestVotes} votes)`;
  }, 3000);
}

function disableVotingButtons() {
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`voteChannel${i}`).disabled = true;
  }
  document.getElementById('finishVoting').disabled = true;
}

for (let i = 1; i <= 6; i++) {
  document.getElementById(`voteChannel${i}`).addEventListener('click', () => vote(i));
}
document.getElementById('finishVoting').addEventListener('click', finishVoting);
