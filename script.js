const tvScreen = document.getElementById('tvScreen');
const channelDisplay = document.getElementById('channelDisplay');
const scoreboard = document.getElementById('scoreboard');

const votes = {
  1: 0,
  2: 0,
  3: 0,
  4: 0
};

const channels = {
  1: { background: '#7f00ff', text: 'Channel 1' },
  2: { background: '#ff4c4c', text: 'Channel 2' },
  3: { background: '#00bfff', text: 'Channel 3' },
  4: { background: '#00ff7f', text: 'Channel 4' }
};

let totalVotes = 0;
const maxVotes = 5; // Set how many total votes before automatic finish

function vote(channelNumber) {
  if (totalVotes >= maxVotes) return; // Prevent extra votes

  votes[channelNumber]++;
  totalVotes++;
  updateScoreboard();

  if (totalVotes >= maxVotes) {
    finishVoting();
  }
}

function finishVoting() {
  // Find the channel with the most votes
  let winningChannel = 1;
  let highestVotes = 0;

  for (let channel in votes) {
    if (votes[channel] > highestVotes) {
      highestVotes = votes[channel];
      winningChannel = channel;
    }
  }

  // Update the screen
  const channelInfo = channels[winningChannel];
  tvScreen.style.backgroundColor = channelInfo.background;
  channelDisplay.innerText = `Winner: ${channelInfo.text} (${highestVotes} votes)`;
  scoreboard.innerHTML = ''; // Clear scoreboard

  disableVotingButtons();
}

function updateScoreboard() {
  scoreboard.innerHTML = `
    <p>Channel 1: ${votes[1]} votes</p>
    <p>Channel 2: ${votes[2]} votes</p>
    <p>Channel 3: ${votes[3]} votes</p>
    <p>Channel 4: ${votes[4]} votes</p>
    <p>Total Votes: ${totalVotes}/${maxVotes}</p>
  `;
}

function disableVotingButtons() {
  document.getElementById('voteChannel1').disabled = true;
  document.getElementById('voteChannel2').disabled = true;
  document.getElementById('voteChannel3').disabled = true;
  document.getElementById('voteChannel4').disabled = true;
  document.getElementById('finishVoting').disabled = true;
}

// Hook up buttons
document.getElementById('voteChannel1').addEventListener('click', () => vote(1));
document.getElementById('voteChannel2').addEventListener('click', () => vote(2));
document.getElementById('voteChannel3').addEventListener('click', () => vote(3));
document.getElementById('voteChannel4').addEventListener('click', () => vote(4));
document.getElementById('finishVoting').addEventListener('click', finishVoting);

// Show scoreboard immediately
updateScoreboard();
