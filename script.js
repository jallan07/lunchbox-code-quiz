var startQuizBtn = document.getElementById("btn-start");
var timeLeft = document.getElementById("time-left");
var startCard = document.getElementById("start-card");

var quizCards = document.getElementById("q-cards");

var secondsLeft = 60; // CHANGE BACK TO 60
var timer;

var score = 0;
var currentIndex = 1;
var quiz = [
    {
       question: 'How do you write "Hello World" in an alert box?',
       multiChoice: ['alert("Hello World")', 'msg("Hello World");', 'alertBox("Hello World");', 'msgBox("Hello World");'],
       answer: 'alert("Hello World")' 
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        multiChoice: ["<javascript>", "<script>", "<scripting>", "<js>"],
        answer: "<script>" 
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        multiChoice: ["The <head> section", "The <body> section", "Either the <head> or <body> section is fine", "None of the above"],
        answer: "The <body> section" 
    },
    {
        question: "The external JavaScript file must contain the <script> tag.",
        multiChoice: ["True", "False"],
        answer: "False" 
    },
    {
        question: "How do you create a function in JavaScript?",
        multiChoice: ["function:myFunction()", "function myFunction()", "function = myFunction()"],
        answer: "function myFunction()"
    }
];


function runQuiz(){
    console.log(quiz[currentIndex].question); // show questions
    console.log(quiz[currentIndex].multiChoice);// show choices with a for loop
    console.log(quiz[currentIndex].answer);// match choice with answer
    // move to next question
};

function startTimer(){
    if (secondsLeft > 0) {
        secondsLeft--;
    }
    timeLeft.textContent = "Time Left :" + secondsLeft;
};

function startQuiz() {
    startCard.classList.add("d-none");
    quizCards.classList.remove("d-none");
    
    runQuiz();

    timeLeft.classList.remove("btn-outline-success");
    timeLeft.classList.add("btn-warning");
    timeLeft.classList.add("btn");
    // Need to create some logic that advances through the different question cards
    // q1.
    timer = setInterval(startTimer, 1000);
};

startQuizBtn.addEventListener("click", startQuiz);
timeLeft.addEventListener("click", startQuiz);