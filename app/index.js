const path = require('path')
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()
const reel4 = new TouchBarLabel()
const reel5 = new TouchBarLabel()
const reel6 = new TouchBarLabel()
const reel7 = new TouchBarLabel()

// // Spin result label
const result = new TouchBarLabel()
  reel1.label = 'R'
  reel2.label = 'Y'
  reel3.label = 'O'
  reel4.label = 'U'
  reel5.label = 'N'
  reel6.label = 'U'
  reel7.label = 'S'


//
// // Spin button
// const spin = new TouchBarButton({
//   label: '🎰 Spin',
//   backgroundColor: '#7851A9',
//   click: () => {
//     // Ignore clicks if already spinning
//     if (spinning) {
//       return
//     }
//
//     spinning = true
//     result.label = ''
//
//     let timeout = 10
//     const spinLength = 4 * 1000 // 4 seconds
//     const startTime = Date.now()
//
//     const spinReels = () => {
//       //showReels()
//
//       if ((Date.now() - startTime) >= spinLength) {
//         // finishSpin()
//       } else {
//         // Slow down a bit on each spin
//         timeout *= 1.1
//         setTimeout(spinReels, timeout)
//       }
//     }
//
//     spinReels()
//   }
// })

// const getRandomValue = () => {
//   const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
//   return values[Math.floor(Math.random() * values.length)]
// }

//
// const updateReels = () => {
//   reel1.label = getRandomValue()
//   reel2.label = getRandomValue()
//   reel3.label = getRandomValue()
// }

// const finishSpin = () => {
//   const uniqueValues = new Set([reel1.label, reel2.label, reel3.label]).size
//   if (uniqueValues === 1) {
//     // All 3 values are the same
//     result.label = '💰 Jackpot!'
//     result.textColor = '#FDFF00'
//   } else if (uniqueValues === 2) {
//     // 2 values are the same
//     result.label = '😍 Winner!'
//     result.textColor = '#FDFF00'
//   } else {
//     // No values are the same
//     result.label = '🙁 Spin Again'
//     result.textColor = null
//   }
//   spinning = false
// }

const touchBar = new TouchBar([
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
  reel7
])

let window

app.once('ready', () => {
  window = new BrowserWindow({
    width: 200,
    height: 200
  })
  window.loadURL(`file://${path.join(__dirname, '/index.html')}`)
  window.setTouchBar(touchBar)
})

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
  app.quit()
})
