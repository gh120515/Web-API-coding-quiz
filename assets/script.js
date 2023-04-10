    // Variables

let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("quiz-container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

let submitBtn = document.getElementById(".submit");
let highscoreName = document.getElementById("highscoreName");

let questionCount;
let scoreCount = 0;
let count = 50;
let countdown;

    // Questions

const quizArray = [
    {
        id: "0",
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts",
    },

    {
        id: "1",
        question: "The condition in an if / else statement is enclosed within ______.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct: "parentheses",
    },

    {
        id: "2",
        question: "Arrays in JavaScript can be used to store _____. ",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above",
    },

    {
        id: "3",
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        correct: "parentheses",
    },

    {
        id: "4",
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correct: "console.log",
    },

];

    //Restart Quiz

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});


//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      gameOver();
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
    }
  })
);

  //Timer functions
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      gameOver();
    }
  }, 1000);
};

  // Game over if all questions answered OR time ran out
function gameOver() {
  clearInterval(countdown);
  displayContainer.classList.add("hide");
  scoreContainer.classList.remove("hide");

  //user score
  userScore.innerHTML =
    "Your score is " + scoreCount + " out of " + questionCount;
};

    //Display quiz

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

    //Quiz Creation

function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

    //Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");
  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    // lose time with incorrect answer
    count -= 10;

    // game over if count < 0
    if (count < 0) {
      gameOver();
    }

    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 50;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

  //when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});
  //hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};


  // submit highscore button

function submitHighscore() {
  highscoreName.value.trim();

  if (highscoreName) {
    let highscores = JSON.parse(window.localStorage.getItem("highscores"));

    let userHighscore = {
      score: scoreCount,
      initials: initial
    };

    highscores.push(userHighscore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // clicking submit will also redirect into the highscore page
    window.location.href = "./highscore.html";

  }
}


  //onclick functions

submitBtn.onclick = submitHighscore();
