// Access the TV screen elements
const tvScreen = document.getElementById('tvScreen');
const channelDisplay = document.getElementById('channelDisplay');
const scoreboard = document.getElementById('scoreboard');

// Keep track of votes
const votes = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0
};

// Channel info
const channels = {
  1: { background: '#7f00ff', text: 'Channel 1' },
  2: { background: '#ff4c4c', text: 'Channel 2' },
  3: { background: '#00bfff', text: 'Channel 3' },
  4: { background: '#00ff7f', text: 'Channel 4' },
  5: { background: '#ffff00', text: 'Channel 5' },
  6: { background: '#ff69b4', text: 'Channel 6' }
};

let totalVotes = 0;
const maxVotes = 10;

// Function to vote for a channel
function vote(channel) {
  votes[channel]++;
  totalVotes++;
  updateScoreboard();

  if (totalVotes >= maxVotes) {
    finishVoting();
  }
}

// Function to update scoreboard
function updateScoreboard() {
  scoreboard.innerHTML = `
    <p>Channel 1: ${votes[1]} votes</p>
    <p>Channel 2: ${votes[2]} votes</p>
    <p>Channel 3: ${votes[3]} votes</p>
    <p>Channel 4: ${votes[4]} votes</p>
    <p>Channel 5: ${votes[5]} votes</p>
    <p>Channel 6: ${votes[6]} votes</p>
    <p>Total Votes: ${totalVotes}/${maxVotes}</p>
  `;
}

// Function to finish voting and show winner
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

// Disable all buttons when voting is over
function disableVotingButtons() {
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`voteChannel${i}`).disabled = true;
  }
  document.getElementById('finishVoting').disabled = true;
}

// Add event listeners to buttons
for (let i = 1; i <= 6; i++) {
  document.getElementById(`voteChannel${i}`).addEventListener('click', () => vote(i));
}
document.getElementById('finishVoting').addEventListener('click', finishVoting);
