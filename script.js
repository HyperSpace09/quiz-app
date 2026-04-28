const questions = [
    {
      question: "What is rarest thing in the universe ?",
      answers:[
          {text: "Nebula" , correct: false},
          {text: "Pulsars" , correct: false},
          {text: "Humans" , correct: true},
          {text: "Black Hole" , correct: false},
      ]
    },
    {
      question: "Who is the god of war in Greek mythology ?",
      answers:[
          {text: "Hades" , correct: false},
          {text: "Kratos" , correct: true},
          {text: "Zeus" , correct: false},
          {text: "Poseidon" , correct: false},      
      ]
    },
    {
      question:"Which is the biggest company in the world in terms of Asset Under Management(AUM)",
      answers:[
          {text: "Vanguard" , correct: false},
          {text: "JP Morgan" , correct: false},
          {text: "Goldman Sachs" , correct: false},
          {text: "Black Rock" , correct: true},
      ]  
    },
    {
      question:"Which country won the FIFA World Cup 2022",
      answers:[
          {text: "Portugal" , correct: false},
          {text: "France" , correct: false},
          {text: "England" , correct: false},
          {text: "Argentina" , correct: true},
      ]        
    },
    {
      question:"Who is the 23rd Tirthankar of Jainism ?",
      answers:[
          {text: "Bhagwan Mahavir" , correct: false},
          {text: "Bhagwan Neminath" , correct: false},
          {text: "Bhagwan Rishabdev" , correct: false},
          {text: "Bhagwan Parasnath" , correct: true},
      ]        
    },
    // Added 10 more questions
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Jane Austen", correct: false },
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Fe", correct: false },
            { text: "Au", correct: true },
            { text: "Pb", correct: false },
        ]
    },
    {
        question: "Which element has the atomic number 1?",
        answers: [
            { text: "Helium", correct: false },
            { text: "Oxygen", correct: false },
            { text: "Hydrogen", correct: true },
            { text: "Carbon", correct: false },
        ]
    },
    {
        question: "What is the smallest prime number?",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false },
        ]
    },
    {
        question: "What is the currency of Japan?",
        answers: [
            { text: "Yuan", correct: false },
            { text: "Won", correct: false },
            { text: "Yen", correct: true },
            { text: "Baht", correct: false },
        ]
    },
    {
        question: "Which is the tallest mountain in the world?",
        answers: [
            { text: "K2", correct: false },
            { text: "Kangchenjunga", correct: false },
            { text: "Lhotse", correct: false },
            { text: "Mount Everest", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton =  document.getElementById("next-btn");
const setupScreen = document.getElementById("setup-screen");
const quizScreen = document.getElementById("quiz-screen");
const dropDown = document.getElementById("question-count");
const startBtn = document.getElementById("start-btn");
const timerDisplay = document.getElementById("timer-display");



let currentQuestionIndex = 0;
let score = 0;
let maxQues = 5;
let timer;
let timeLeft = 20;




function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn"); 
      answerButton.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click" , selectAnswer)
    });

     startTimer();

}

function resetState(){

  clearInterval(timer);

  nextButton.style.display = "none";
  while(answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
}
}

function selectAnswer(anything){ 
  
    clearInterval(timer); 
  
  // we can use e here that stands for event but does not have a proper significance
  const selectedBtn  =anything.target; // here the target means the exact piece of HTML code where my pointer was touching when we clicked it
  const isCorrect  =selectedBtn.dataset.correct === "true";

  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;

  }else{
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
      button.disabled = true;

  });
  nextButton.style.display = "block"; //This is used to 
}


function showScore(){
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${maxQues} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}



function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < maxQues){
    showQuestion();
  }else{
    showScore();
  }
}



nextButton.addEventListener("click" , () => {

  if(currentQuestionIndex <maxQues){
    handleNextButton();
  }else{
    quizScreen.style.display = "none";
    setupScreen.style.display = "block";
  }

})

function startTimer(){
  timeLeft = 20;
  timerDisplay.innerHTML = `Time left ${timeLeft} sec`;

  timer = setInterval(()=>{
    timeLeft--;
    timerDisplay.innerHTML = `Time left ${timeLeft} sec`;

    if(timeLeft<0){
      clearInterval(timer);

      handleNextButton();
    }
  }, 1000);
}


startBtn.addEventListener('click' , () => {
  
  maxQues = parseInt(dropDown.value);
  setupScreen.style.display = "none";
  quizScreen.style.display = "block";
  startQuiz();
})
//startQuiz();
