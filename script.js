// —————————————————————————————————————————— //
// —————— BEGIN VARIABLE DECLARATIONS ——————— //
// —————————————————————————————————————————— //
// Variables from navigation elements
var logo = document.getElementById("logo");
var highScoresBtn = document.getElementById("btn-hs");
var startQuizBtn = document.getElementById("btn-start");
var timeLeft = document.getElementById("time-left");
// Variables from main content area
var startCard = document.getElementById("start-card");
var quizCards = document.getElementById("q-cards");
var hsCard = document.getElementById("hs-card");
var timeLeftMobile = document.getElementById("time-left-mobile");
// Variables from question card
var questionNumEl = document.getElementById("quizQuestionNum");
var questionEl = document.getElementById("quizQuestion");
var answersEl = document.getElementById("answer-btns");
// Variables from High Score card
var resetFromHS = document.getElementById("returnFromHS");
var startFromHS = document.getElementById("startFromHS");
// Variables for general quiz logic
var secondsLeft = 60;
var timer;
var score = 0;
var currentQuestionIndex = 0;
// —————————————————————————————————————————— //
// ——————— END VARIABLE DECLARATIONS ———————— //
// —————————————————————————————————————————— //



// ————————————————————————————————————————————— //
// ————————— BEGIN QUIZ LIBRARY OBJECT ————————— //
// Questions pulled mainly from the W3Schools Javascript quiz
// ————————————————————————————————————————————— //
var quizLibrary = [
    {
       number: "Question #1",
       question: 'How do you write "Hello World" in an alert box?',
       answers: [
           { choice: 'alert("Hello World")', correct: true },
           { choice: 'msg("Hello World");', correct: false },
           { choice: 'alertBox("Hello World");', correct: false },
           { choice: 'msgBox("Hello World");', correct: false }
       ]
    },
    {
        number: "Question #2",
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { choice: '<javascript>', correct: false },
            { choice: '<scripting>', correct: false },
            { choice: '<js>', correct: false },
            { choice: '<script>', correct: true }
        ]
     },
     {
        number: "Question #3",
        question: 'Where is the correct place to insert a JavaScript?',
        answers: [
            { choice: 'The <head>', correct: false },
            { choice: 'The <body>', correct: true },
            { choice: 'The CSS', correct: false },
            { choice: 'Anywhere', correct: false }
        ]
     },
     {
        number: "Question #4",
        question: 'How do you create a function in JavaScript?',
        answers: [
            { choice: 'function:myFunction()', correct: false },
            { choice: 'function myFunction()', correct: true },
            { choice: 'function = myFunction()', correct: false },
            { choice: 'function -> myFunction[]', correct: false }
        ]
     },
     {
        number: "Question #5",
        question: 'How do you write IF statements in Javascript?',
        answers: [
            { choice: 'if i == 5 then', correct: false },
            { choice: 'if i = 5 then', correct: false },
            { choice: 'if (i === 5)', correct: true },
            { choice: 'if i = 5', correct: false }
        ]
     }
];
// ——————————————————————————————————————————— //
// ————————— END QUIZ LIBRARY OBJECT ————————— //
// ——————————————————————————————————————————— //



// ——————————————————————————————————————————— //
// ——————————— BEGIN QUIZ FUNCTIONS —————————— //
// ——————————————————————————————————————————— //
function startQuiz() {
    startCard.classList.add("d-none");
    quizCards.classList.remove("d-none");
    
    advanceQuizQuestions();
    timerRunning();
};
function advanceQuizQuestions(){
    showNextQuestion();

    
    // console.log(quizLibrary[currentIndex].question); // show questions
    // console.log(quizLibrary[currentIndex].answers);// show choices with a for loop
    // match choice with correct answer
    // move to next question
};

function showNextQuestion(){

};
// ——————————————————————————————————————————— //
// ———————————— END QUIZ FUNCTIONS ——————————— //
// ——————————————————————————————————————————— //



// ——————————————————————————————————————————— //
// ————————— BEGIN TIMER FUNCTIONS ——————————— //
// ——————————————————————————————————————————— //
function startTimer(){
    if (secondsLeft > 0) {
        secondsLeft--;
    }
    timeLeft.textContent = "Time Left :" + secondsLeft;
    timeLeftMobile.textContent = "Time Left :" + secondsLeft;
};
function timerRunning(){
    timer = setInterval(startTimer, 1000);
    timeLeft.classList.remove("btn-outline-success");
    timeLeft.classList.add("btn-warning");
    timeLeft.classList.add("btn");
    timeLeftMobile.classList.remove("btn-outline-success");
    timeLeftMobile.classList.add("btn-warning");
    timeLeftMobile.classList.add("btn");
};
function resetTimer(){
    // clear the timer interval
    clearInterval(timer);
    // Reset the timer button to original state
    timeLeft.classList.add("btn-outline-success");
    timeLeft.classList.remove("btn-warning");
    timeLeft.classList.remove("btn");
    secondsLeft = 60;
    timeLeft.textContent = "Start Quiz :" + secondsLeft;
    timeLeftMobile.textContent = "Start Quiz :" + secondsLeft;
};
// ——————————————————————————————————————————— //
// ————————— END TIMER FUNCTIONS ————————————— //
// ——————————————————————————————————————————— //



// ————————————————————————————————————————— //
// —————— BEGIN HIGH SCORE FUNCTIONS ——————— //
// ————————————————————————————————————————— //
function showHighScores(){
    startCard.classList.add("d-none");
    quizCards.classList.add("d-none");
    hsCard.classList.remove("d-none");
    resetTimer();
};
// ————————————————————————————————————————— //
// ——————— END HIGH SCORE FUNCTIONS ———————— //
// ————————————————————————————————————————— //



// ——————————————————————————————————————————— //
// ———————— BEGIN QUIZ RESET FUNCTION ———————— //
// ——————————————————————————————————————————— //
function reset(){
    // Reset to main card
    startCard.classList.remove("d-none");
    quizCards.classList.add("d-none");
    hsCard.classList.add("d-none");
    resetTimer();
};
// ——————————————————————————————————————————— //
// ————————— END QUIZ RESET FUNCTION ————————— //
// ——————————————————————————————————————————— //



// ——————————————————————————————————————————— //
// —————————— BEGIN EVENT LISTENERS —————————— //
// ——————————————————————————————————————————— //
// Start quiz listeners
startQuizBtn.addEventListener("click", startQuiz);
timeLeft.addEventListener("click", startQuiz);
startFromHS.addEventListener("click", startQuiz);
// Show high scores listener
highScoresBtn.addEventListener("click", showHighScores);
// Reset listeners
logo.addEventListener("click", reset);
resetFromHS.addEventListener("click", reset);
// ——————————————————————————————————————————— //
// ——————————— END EVENT LISTENERS ——————————— //
// ——————————————————————————————————————————— //