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
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton =  document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

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

}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
}
}

function selectAnswer(anything){ // we can use e here that stands for event but does not have a proper significance
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
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}



function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length){
    showQuestion();
  }else{
    showScore();
  }
}




nextButton.addEventListener("click" , () => {

  if(currentQuestionIndex <questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }

})

startQuiz();


