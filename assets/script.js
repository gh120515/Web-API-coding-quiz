    // Variables

let timeLeft = document.getElementById(".time-left");
let quizScreen = document.getElementById(".quiz-screen");
let restart = document.getElementById(".restart");
let userScore = document.getElementById("user-score")
let startingScreen = document.getElementById(".starting-screen");
let startButton = document.getElementById("start-button");

let scoreCount = 0;
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

    // Restart quiz

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});


    // Timer 

const timerDisplay = () => {
        countdown = setInterval(() => {
          count--;
          timeLeft.innerHTML = `${count}s`;
          if (count == 0) {
            clearInterval(countdown);
            displayNext();
          }
        }, 1000);
    };

