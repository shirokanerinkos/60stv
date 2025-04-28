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
