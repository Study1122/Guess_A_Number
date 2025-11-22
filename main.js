/**

const random = Math.random().toFixed(4)
const randomNumb = (random * 100 + 1).toFixed(0)
//console.log(random,randomNumb)


const submit = document.getElementById('button')
const remainingGuess = document.querySelector('#remainGuess')
const previouGuess = document.querySelector('#prvGuess')
const hint = document.querySelector('#lowOrhigh')
const reportArea = document.querySelector("#reportArea")
//reportArea.innerHTML = randomNumb
let flag = false
let attempts = 10
let prevInpurList = []

remainingGuess.innerHTML = attempts

submit.addEventListener('click', (e) => {
  e.preventDefault()
  const usrInput = Number(document.querySelector('#guessInput').value)
  
  if (isNaN(usrInput)) {
    hint.innerHTML = "Please enter a valid number!!"
  } else if (usrInput < 0 || usrInput > 100) {
    hint.innerHTML = "Please enter a number between 1 and 100!!"
  } else {
    prevInpurList.push(`${usrInput}`);
    previouGuess.innerHTML = prevInpurList
    
    if (usrInput < randomNumb) {
      attempts--
      remainingGuess.innerHTML = attempts
      hint.innerHTML = "You guessed smaller number!!!"
      
    } else if (usrInput > randomNumb) {
      attempts--
      remainingGuess.innerHTML = attempts
      hint.innerHTML = "You guessed larger number!!"
      
    } else {
      remainingGuess.innerHTML = attempts
      hint.innerHTML = "🎉🎊Congratulations!!! you guessed right number:)"
      submit.disabled = true
      document.querySelector('#guessInput').disabled = true
      return
    }
    if (attempts <= 0) {
      remainingGuess.innerHTML = attempts
      submit.disabled = true
      hint.innerHTML = "🛑Sorry!! you used up all your attempts :( "
      document.querySelector('#guessInput').disabled = true
    }
    document.querySelector('#guessInput').value = "";
  }
  
  
});**/

const random = Math.random().toFixed(4)
let randomNumb = (random * 100 + 1).toFixed(0)

const submit = document.querySelector('#submitButton');
let preGuess = document.querySelector("#prvGuess");
let remainingAttempt = document.querySelector("#remainingAttempt");
let displayMsg = document.querySelector("#msgArea")
let hintMsg = document.querySelector("#hintArea")

let chance = 2
remainingAttempt.innerHTML = chance
let preGuessList = []
let gameOn = true

let p = document.createElement('p');
if (gameOn) {
  submit.addEventListener('click', (e) => {
    e.preventDefault()
    
    let usrInput = Number(document.querySelector('#guessInput').value)
    preGuessList.push(usrInput)
    validateInput(usrInput)
    document.querySelector('#guessInput').value = "";
  })
}

function validateInput(guess) {
  if (isNaN(guess)) {
    displayMassage(`Please enter a valid number ${guess} (Not a Number!!)`)
  } else if (guess < 1 || guess > 100) {
    displayMassage(`Please enter a number between 1 and 100`)
  } else {
    displayMassage(`You entered ${guess}`)
    updateData(guess)
  }
}

function displayMassage(guess) {
  displayMsg.innerHTML = guess
}

function displayHint(guess) {
  hintMsg.innerHTML = guess
}

function updateData(guess) {
  chance--
  if (chance <= 0) {
    remainingAttempt.innerHTML = chance
    displayMassage(`Better Luck next time, the number was ${randomNumb}`)
    endGame()
  } else if (guess < randomNumb) {
    remainingAttempt.innerHTML = chance
    preGuess.innerHTML = preGuessList
    displayHint(`You entered smaller number!!`)
  } else if (guess > randomNumb) {
    remainingAttempt.innerHTML = chance
    preGuess.innerHTML = preGuessList
    displayHint(`You entered larger number!!`)
  } else {
    remainingAttempt.innerHTML = chance
    displayMassage(`Congratulations!! you entered right number:)`)
    endGame()
  }
}

function endGame() {
  gameOn = false
  submit.disabled = true
  document.querySelector('#guessInput').disabled = true
  p.classList.add('button')
  p.innerHTML = `<h3 id='restart'>Restart Game</h3>`
  hintMsg.appendChild(p)
  newGame()
}

function newGame() {
  const restart = document.querySelector('#restart')
  restart.addEventListener('click', (e) => {
    chance = 2
    preGuessList = []
    hintMsg.removeChild(p)
    preGuess.innerHTML = ""
    displayMsg.innerHTML = ""
    hintMsg.innerHTML = ""
    remainingAttempt.innerHTML = chance
    randomNumb = (random * 100 + 1).toFixed(0)
    document.querySelector('#guessInput').removeAttribute('disabled')
    document.querySelector('#submitButton').removeAttribute('disabled')
    
    gameOn = true
  });
}