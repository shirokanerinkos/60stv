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
