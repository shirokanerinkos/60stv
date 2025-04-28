const tvScreen = document.getElementById('tvScreen');
const channelDisplay = document.getElementById('channelDisplay');
const scoreboard = document.getElementById('scoreboard');

let totalVotes = 0;
const maxVotes = 10; // Or whatever you want

function finishVoting() {
  // Disable voting immediately
  disableVotingButtons();

  // Show dramatic "And the winner is..." message
  tvScreen.style.backgroundColor = 'black';
  channelDisplay.innerText = 'And the winner is...';
  scoreboard.innerHTML = ''; // Clear scoreboard

  // Wait 3 seconds, then show the real winner
  setTimeout(() => {
    let winningChannel = 1;
    let highestVotes = 0;

    for (let channel in votes) {
      if (votes[channel] > highestVotes) {
        highestVotes = votes[channel];
        winningChannel = channel;
      }
    }

    // Update the TV to show the winner
    const channelInfo = channels[winningChannel];
    tvScreen.style.backgroundColor = channelInfo.background;
    channelDisplay.innerText = `Winner: ${channelInfo.text} (${highestVotes} votes)`;
  }, 3000); // 3000 milliseconds = 3 seconds
}
const votes = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0
};

const channels = {
  1: { background: '#7f00ff', text: 'Channel 1' },
  2: { background: '#ff4c4c', text: 'Channel 2' },
  3: { background: '#00bfff', text: 'Channel 3' },
  4: { background: '#00ff7f', text: 'Channel 4' },
  5: { background: '#ffff00', text: 'Channel 5' }, // New Channel 5 (yellow)
  6: { background: '#ff69b4', text: 'Channel 6' }  // New Channel 6 (pink)
};

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

document.getElementById('voteChannel1').addEventListener('click', () => vote(1));
document.getElementById('voteChannel2').addEventListener('click', () => vote(2));
document.getElementById('voteChannel3').addEventListener('click', () => vote(3));
document.getElementById('voteChannel4').addEventListener('click', () => vote(4));
document.getElementById('voteChannel5').addEventListener('click', () => vote(5));
document.getElementById('voteChannel6').addEventListener('click', () => vote(6));
document.getElementById('finishVoting').addEventListener('click', finishVoting);

function vote(channel) {
  votes[channel]++;
  totalVotes++;
  updateScoreboard();

  if (totalVotes >= maxVotes) {
    finishVoting();
  }
}


function disableVotingButtons() {
  document.getElementById('voteChannel1').disabled = true;
  document.getElementById('voteChannel2').disabled = true;
  document.getElementById('voteChannel3').disabled = true;
  document.getElementById('voteChannel4').disabled = true;
  document.getElementById('voteChannel5').disabled = true; // New
  document.getElementById('voteChannel6').disabled = true; // New
  document.getElementById('finishVoting').disabled = true;
}
