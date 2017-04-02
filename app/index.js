const path = require('path')
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar

let spinning = false

const handle = new TouchBarLabel()
handle.label = '@rahman_younus'
// Reel labels
const reel1 = new TouchBarLabel(),
      reel2 = new TouchBarLabel(),
      reel3 = new TouchBarLabel(),
      reel4 = new TouchBarLabel(),
      reel5 = new TouchBarLabel(),
      reel6 = new TouchBarLabel(),
      reel7 = new TouchBarLabel(),
      reel8 = new TouchBarLabel(),
      reel9 = new TouchBarLabel(),
      reel10 = new TouchBarLabel();

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  backgroundColor: '#7851A9',
  click: () => {
    // Ignore clicks if already spinning
    if (spinning) {
      return
    }

    spinning = true
    result.label = ''
    window.loadURL(`file://${path.join(__dirname, '/spin.html')}`)
    let timeout = 10
    const spinLength = 4 * 1000 // 4 seconds
    const startTime = Date.now()

    const spinReels = () => {
      updateReels()

      if ((Date.now() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Slow down a bit on each spin
        timeout *= 1.1
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = genCharArray('A','Z')
  return values[Math.floor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1.label = getRandomValue()
  reel2.label = getRandomValue()
  reel3.label = getRandomValue()
  reel4.label = getRandomValue()
  reel5.label = getRandomValue()
  reel6.label = getRandomValue()
  reel7.label = getRandomValue()
  reel8.label = getRandomValue()
  reel9.label = getRandomValue()
  reel10.label = getRandomValue()
}

const finishSpin = () => {
   reel1.label = 'S';
   reel2.label = 'E';
   reel3.label = 'N';
   reel4.label = 'D';
   reel5.label = ' ';
   reel6.label = 'N';
   reel7.label = 'U';
   reel8.label = 'D';
   reel9.label = 'E';
   reel10.label = 'S';

   spinning = false

   result.label = '😎😎'
   window.loadURL(`file://${path.join(__dirname, '/finish.html')}`)
}

const touchBar = new TouchBar([
  handle,
  new TouchBarSpacer({size: 'small'}),
  spin,
  new TouchBarSpacer({size: 'large'}),
  reel1,
  new TouchBarSpacer({size: 'small'}),
  reel2,
  new TouchBarSpacer({size: 'small'}),
  reel3,
  new TouchBarSpacer({size: 'small'}),
  reel4,
  new TouchBarSpacer({size: 'small'}),
  reel5,
  new TouchBarSpacer({size: 'small'}),
  reel6,
  new TouchBarSpacer({size: 'small'}),
  reel7,
  new TouchBarSpacer({size: 'small'}),
  reel8,
  new TouchBarSpacer({size: 'small'}),
  reel9,
  new TouchBarSpacer({size: 'small'}),
  reel10,
  new TouchBarSpacer({size: 'large'}),
  result
])

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    a.push(' ');
    return a;
}

let window

app.once('ready', () => {
  window = new BrowserWindow({
    width: 900,
    height: 535
  })
  window.loadURL(`file://${path.join(__dirname, '/index.html')}`)
  window.setTouchBar(touchBar)
})

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
  app.quit()
})
