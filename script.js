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
var answerBtn1 = document.getElementById("answerBtn1");
var answerBtn2 = document.getElementById("answerBtn2");
var answerBtn3 = document.getElementById("answerBtn3");
var answerBtn4 = document.getElementById("answerBtn4");
// Variables from score card
var userScoreSpan = document.getElementById("userScore");
var userName = document.getElementById("userName").value;
var submitHS = document.getElementById("submitHS");
// Variables from High Score card
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var leaderboardList = document.getElementById("leaderboard")
var submitCard = document.getElementById("submit-card");
var resetFromHS = document.getElementById("returnFromHS");
// Variables for general quiz logic
var secondsLeft = 60;
var timer;
var score = 0;
var currentQuestion = 0;
// —————————————————————————————————————————— //
// ——————— END VARIABLE DECLARATIONS ———————— //
// —————————————————————————————————————————— //



// ——————————————————————————————————————————— //
// ——————————— BEGIN QUIZ FUNCTIONS —————————— //
// ——————————————————————————————————————————— //
function startQuiz(){
    timerRunning();
    runQuiz();
};

function runQuiz() {  

    // End game if timer reaches 0
    if (secondsLeft <= 0){
        showScoreCard();
        return;
    }

    startCard.classList.add("d-none");
    quizCards.classList.remove("d-none");

    // Push question number to div element
    questionNumEl.textContent = quizLibrary[currentQuestion].number;
    
    // Push question to div element
    questionEl.innerHTML = quizLibrary[currentQuestion].question;
    
    // Push answer options to button elements
    answerBtn1.textContent = quizLibrary[currentQuestion].option1;
    answerBtn2.textContent = quizLibrary[currentQuestion].option2;
    answerBtn3.textContent = quizLibrary[currentQuestion].option3;
    answerBtn4.textContent = quizLibrary[currentQuestion].option4;
    
    // Event listeners on selected answers
    answerBtn1.addEventListener("click", answerSelected);
    answerBtn2.addEventListener("click", answerSelected);
    answerBtn3.addEventListener("click", answerSelected);
    answerBtn4.addEventListener("click", answerSelected);
};

// User has selected an answer and we need to compare to the actual answer
function answerSelected(){
    var userSelection = this.innerHTML;
    if (userSelection === quizLibrary[currentQuestion].answer) {
        checkForLastQuestion();
    } else {
        wrongAnswer();
    }
};

// Wrong answer function
function wrongAnswer(){
    if (secondsLeft > 10){
        secondsLeft -= 10;
        checkForLastQuestion();
    } else {
        secondsLeft = 0;
        showScoreCard();
    }
};

// Check to see if they answered the last question of the quiz
function checkForLastQuestion(){
    if (currentQuestion < (quizLibrary.length - 1)) {
        currentQuestion++;
        runQuiz();
    } else {
        showScoreCard();
    }
};

function showScoreCard(){
    // Display only the submit score card
    startCard.classList.add("d-none");
    quizCards.classList.add("d-none");
    hsCard.classList.add("d-none");
    submitCard.classList.remove("d-none");
    // Stop the timer from counting down any further
    clearInterval(timer);
    // Set the user score to the time left on the clock
    var userScore = secondsLeft;
    // Write the final score to the submit score page
    userScoreSpan.innerHTML = userScore;

    timeLeft.textContent = "Time Left :" + secondsLeft;
    timeLeftMobile.textContent = "Time Left :" + secondsLeft;
};
// ——————————————————————————————————————————— //
// ———————————— END QUIZ FUNCTIONS ——————————— //
// ——————————————————————————————————————————— //


// ——————————————————————————————————————————— //
// —————— BEGIN LOCAL STORAGE FUNCTIONS —————— //
// ——————————————————————————————————————————— //
function saveHighscore(e) {
    // Prevent the previous entries from being cleared out automatically
    e.preventDefault();
    // Set the new score values
    var newScore = {
        name: document.getElementById("userName").value,
        score: document.getElementById("userScore").innerHTML
    };
    // Push new scores values to highscores list
    highscores.push(newScore);
    // Sort high scores from best to worst
    highscores.sort((a, b) => b.score - a.score);
    // Cut off high scores at the top 5 results
    highscores.splice(5);
    // Set highscores to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));
    console.log(highscores);

    // Run the show high scores function
    showHighScores();
};
// ——————————————————————————————————————————— //
// ——————— END LOCAL STORAGE FUNCTIONS ——————— //
// ——————————————————————————————————————————— //



// ——————————————————————————————————————————— //
// ————————— BEGIN TIMER FUNCTIONS ——————————— //
// ——————————————————————————————————————————— //
function startTimer(){
    if (secondsLeft > 0) {
        secondsLeft--;
    } else {
        showScoreCard();
        return;
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
    timeLeft.classList.add("btn btn-outline-success");
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
    // Display only the high scores card
    startCard.classList.add("d-none");
    quizCards.classList.add("d-none");
    hsCard.classList.remove("d-none");
    submitCard.classList.add("d-none");
    // Show the leaderboard if there are any saved scores in local storage
    showLeaderBoard();
    // Rest the timer back to 0
    clearInterval(timer);
};

function showLeaderBoard(){
    leaderboardList.innerHTML = highscores.map(score => {
        return `<li class="text-center"><h4>${score.name} ................................ ${score.score}</h4></li>`
    }).join("");
};
// ————————————————————————————————————————— //
// ——————— END HIGH SCORE FUNCTIONS ———————— //
// ————————————————————————————————————————— //



// ——————————————————————————————————————————— //
// ———————— BEGIN QUIZ RESET FUNCTION ———————— //
// ——————————————————————————————————————————— //
function reset(){
    // Reset to main card
    location.reload();
};
// ——————————————————————————————————————————— //
// ————————— END QUIZ RESET FUNCTION ————————— //
// ——————————————————————————————————————————— //



// ——————————————————————————————————————————— //
// —————————— BEGIN EVENT LISTENERS —————————— //
// ——————————————————————————————————————————— //
// Start quiz listeners
startQuizBtn.addEventListener("click", startQuiz);
// Show high scores listener
highScoresBtn.addEventListener("click", showHighScores);
// Reset listeners
logo.addEventListener("click", reset);
resetFromHS.addEventListener("click", reset);
// Submit score from the score card
submitHS.addEventListener("click", saveHighscore);
// ——————————————————————————————————————————— //
// ——————————— END EVENT LISTENERS ——————————— //
// ——————————————————————————————————————————— //



// ————————————————————————————————————————————— //
// ————————— BEGIN QUIZ LIBRARY OBJECT ————————— //
// Questions pulled mainly from the W3Schools Javascript quiz
// ————————————————————————————————————————————— //
var quizLibrary = [
    {
       number: "Question #1",
       question: 'How do you write "Hello World" in an alert box?',
       option1: 'alert("Hello World");',
       option2: 'msg("Hello World");',
       option3: 'alertBox("Hello World");',
       option4: 'msgBox("Hello World");',
       answer: 'alert("Hello World");'
    },
    {
        number: "Question #2",
        question: 'Inside which HTML element do we put the JavaScript?',
        option1: '<javascript>',
        option2: '<scripting>',
        option3: '<js>',
        option4: '<script>',
        answer: '&lt;script&gt;'
     },
     {
        number: "Question #3",
        question: 'Where is the correct place to insert a JavaScript?',
        option1: 'The <head>',
        option2: 'The <body>',
        option3: 'The CSS',
        option4: 'Anywhere',
        answer: 'The &lt;body&gt;'
     },
     {
        number: "Question #4",
        question: 'How do you create a function in JavaScript?',
        option1: 'function:myFunction()',
        option2: 'function myFunction()',
        option3: 'function = myFunction()',
        option4: 'function -> myFunction[]',
        answer: 'function myFunction()'
     },
     {
        number: "Question #5",
        question: 'How do you write IF statements in Javascript?',
        option1: 'if i == 5 then',
        option2: 'if i = 5 then',
        option3: 'if (i === 5)',
        option4: 'if i = 5',
        answer: 'if (i === 5)'
     },
     {
        number: "Question #6",
        question: 'How do you round the number 7.25, to the nearest integer?',
        option1: 'Math.round(7.25)',
        option2: 'Math.rnd(7.25)',
        option3: 'rnd(7.25)',
        option4: 'round(7.25)',
        answer: 'Math.round(7.25)'
     },
     {
        number: "Question #7",
        question: 'How do you find the number with the highest value of x and y?',
        option1: 'top(x, y)',
        option2: 'Math.ceil(x, y)',
        option3: 'ceil(x, y)',
        option4: 'Math.max(x, y)',
        answer: 'Math.max(x, y)'
     },
     {
        number: "Question #8",
        question: 'Which event occurs when the user clicks on an HTML element?',
        option1: 'onmouseclick',
        option2: 'onchange',
        option3: 'onclick',
        option4: 'onmouseover',
        answer: 'onclick'
     }
];
// ——————————————————————————————————————————— //
// ————————— END QUIZ LIBRARY OBJECT ————————— //
// ——————————————————————————————————————————— //


