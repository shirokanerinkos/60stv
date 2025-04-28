const powerButton = document.getElementById('powerButton');
const channelUp = document.getElementById('channelUp');
const channelDown = document.getElementById('channelDown');
const tvScreen = document.getElementById('tvScreen');
const channelDisplay = document.getElementById('channelDisplay');

let powerOn = false;
let channel = 1;

const channels = [
  { background: 'black', text: 'TV OFF' },
  { background: '#7f00ff', text: 'Channel 1' },
  { background: '#ff4c4c', text: 'Channel 2' },
  { background: '#00bfff', text: 'Channel 3' },
  { background: '#00ff7f', text: 'Channel 4' }
];

function updateScreen() {
  if (!powerOn) {
    tvScreen.style.backgroundColor = channels[0].background;
    channelDisplay.innerText = channels[0].text;
  } else {
    const currentChannel = channels[channel] || channels[1];
    tvScreen.style.backgroundColor = currentChannel.background;
    channelDisplay.innerText = currentChannel.text;
  }
}

powerButton.addEventListener('click', () => {
  powerOn = !powerOn;
  updateScreen();
});

channelUp.addEventListener('click', () => {
  if (powerOn) {
    channel++;
    if (channel >= channels.length) channel = 1;
    updateScreen();
  }
});

channelDown.addEventListener('click', () => {
  if (powerOn) {
    channel--;
    if (channel < 1) channel = channels.length - 1;
    updateScreen();
  }
});

// Start with TV off
updateScreen();
