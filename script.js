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

const channels = {
  1: { background: '#7f00ff', text: 'program 1' },
  2: { background: '#ff4c4c', text: 'program 2' },
  3: { background: '#00bfff', text: 'program 3' },
  4: { background: '#00ff7f', text: 'program 4' },
  5: { background: '#ffff00', text: 'program 5' },
  6: { background: '#ff69b4', text: 'program 6' }
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
  totalVotes++;


function finishVoting() {
  disableVotingButtons();
  tvScreen.style.backgroundColor = 'black';
  channelDisplay.innerText = 'And the winner is...';
  scoreboard.innerHTML = '';

  setTimeout(() => {
    let winningChannel = 1;
    let highestVotes = 0;

    for (let channel in votes) {
      if (votes[channel] > highestVotes) {
        highestVotes = votes[channel];
        winningChannel = channel;
      }
    }

    const channelInfo = channels[winningChannel];
    tvScreen.style.backgroundColor = channelInfo.background;
    channelDisplay.innerText = `Winner: ${channelInfo.text} (${highestVotes} votes)`;
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
