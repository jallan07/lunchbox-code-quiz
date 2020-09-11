// —————————————————————————————————————————— //
// ————————— VARIABLE DECLARATIONS —————————— //
// —————————————————————————————————————————— //
// Variables from navigation elements
var logo = document.getElementById("logo");
var highScoresBtn = document.getElementById("btn-hs");
var startQuizBtn = document.getElementById("btn-start");
var timeLeft = document.getElementById("time-left");
// Variables from main content area
var startCard = document.getElementById("start-card");
var hsCard = document.getElementById("hs-card");
var timeLeftMobile = document.getElementById("time-left-mobile");
// Variables from question cards
var q1 = document.getElementById("q1-card");
var q2 = document.getElementById("q2-card");
var q3 = document.getElementById("q3-card");
var q4 = document.getElementById("q4-card");
var q5 = document.getElementById("q5-card");
var answerBtn = document.querySelectorAll(".answerBtn");
// Variables from High Score card
var returnFromHS = document.getElementById("returnFromHS");
var startFromHS = document.getElementById("startFromHS");
// Variables for general quiz logic
var secondsLeft = 60;
var timer;
var score = 0;


// ——————————————————————————————————————————— //
// ———————— INITIALIZE HIDDEN STATES ————————— //
// ——————————————————————————————————————————— //
window.onload = onPageLoad;

function onPageLoad(){
    q1.classList.add("d-none");
    q2.classList.add("d-none");
    q3.classList.add("d-none");
    q4.classList.add("d-none");
    q5.classList.add("d-none");
    hsCard.classList.add("d-none");
};



// ——————————————————————————————————————————— //
// ——————————————  QUIZ FUNCTIONS ———————————— //
// ——————————————————————————————————————————— //
function showQuestion1(){
    
    // initiate timer and begin countdown
    startTimer();
    timerRunning();
    // Hide start card, display q1
    startCard.classList.add("d-none");
    q1.classList.remove("d-none");
    answerBtn.addEventListener("click", showQuestion2);
};

function showQuestion2(){
    timerRunning();
    // Hide q1, display q2
    q1.classList.add("d-none");
    q2.classList.remove("d-none");

    answerBtn.addEventListener("click", showQuestion3);
};

function showQuestion3(){
    timerRunning();
    // Hide q2, display q3
    q2.classList.add("d-none");
    q3.classList.remove("d-none");

    answerBtn.addEventListener("click", showQuestion4);
};

function showQuestion4(){
    timerRunning();
    // Hide q3, display q4
    q3.classList.add("d-none");
    q4.classList.remove("d-none");

    answerBtn.addEventListener("click", showQuestion5);
};

function showQuestion5(){
    timerRunning();
    // Hide q4, display q5
    q4.classList.add("d-none");
    q5.classList.remove("d-none");

    // answerBtn.addEventListener("click", showQuestion4);
};

// ——————————————————————————————————————————— //
// ———————————— TIMER FUNCTIONS —————————————— //
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

// ————————————————————————————————————————— //
// ————————— HIGH SCORE FUNCTIONS —————————— //
// ————————————————————————————————————————— //
function showHighScores(){
    startCard.classList.add("d-none");
    hsCard.classList.remove("d-none");
    q1.classList.add("d-none");
    q2.classList.add("d-none");
    q3.classList.add("d-none");
    q4.classList.add("d-none");
    q5.classList.add("d-none");
    resetTimer();
};

// ——————————————————————————————————————————— //
// ——————————— QUIZ RESET FUNCTION ——————————— //
// ——————————————————————————————————————————— //
function reset(){
    // Reset to main card
    startCard.classList.remove("d-none");
    onPageLoad();
    resetTimer();
};


// ——————————————————————————————————————————— //
// ————————————— EVENT LISTENERS ————————————— //
// ——————————————————————————————————————————— //
// Start quiz listeners
startQuizBtn.addEventListener("click", showQuestion1);
timeLeft.addEventListener("click", showQuestion1);
startFromHS.addEventListener("click", showQuestion1);
// Quiz running listeners

// Show high scores listener
highScoresBtn.addEventListener("click", showHighScores);
// Reset listeners
logo.addEventListener("click", reset);
returnFromHS.addEventListener("click", reset);

