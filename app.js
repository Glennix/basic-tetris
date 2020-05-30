document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10

//The tetraminoes
const lTetramino = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2+2],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2]
]

const zTetramino = [
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1]
]

const tTetramino = [
  [1, width, width+1, width+2],
  [1, width+1, width+2, width*2+1],
  [width, width+1, width+2, width*2+1],
  [1, width, width+1, width*2+1]
]

const oTetramino = [
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1]
]

const iTetramino = [
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3]
]

const theTetraminoes = [lTetramino, zTetramino, tTetramino, oTetramino, iTetramino]

let currentPosition = 4
let currentRotation = 0

//randomly select a Tegromino and its first rotation
let random = Math.floor(Math.random()*theTetraminoes.length)
let current = theTetraminoes[random][currentRotation]

//draw the first tetromino
function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetramino')
  })
}

//undraw the Tetramino
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetramino')
  })
}

//make the tetramino move down every second
timerId = setInterval(moveDown, 1000)

//move down function
function moveDown() {
  undraw()
  currentPosition += width
  draw()
  freeze()
}

//freeze function
function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    //start a new tetramino falling
    random = Math.floor(Math.random() * theTetraminoes.length)
    current = theTetraminoes[currentRotation]
    currentPosition = 4
    draw()
  }
}

//move the tetramino left, unless it is at the edge or there is a blockage
function moveLeft() {
  undraw()
  const inAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

  if(!isAtLeftEdge) currentPosition -= 1

  if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
    currentPosition += 1
}

draw()

})
