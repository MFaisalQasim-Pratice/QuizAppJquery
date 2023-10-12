$(document).ready(function () {
  const question = $('#question');
  const choices = $('.choice-text');
  const game = $('#game');
  const loader = $('#loader');
  const scoreText = $("#score")
  const progressBarFull = $("#progressBarFull")

  let currentQuestion = {};
  let questionCounter = 0;
  let acceptingAnswers = false;
  let score = 0;

  let questions = [

    {
      question: "Inside which HTML element do we put the JavaScript??",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1
    },
    {
      question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
    },
    {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
    }
  ]

  // COSTANTS

  const CORRECT_BONUS = 10;
  const MAX_QUESTIONS = 3;

  function startQuiz() {
    availableQuestions = [...questions];
    getNewQuestion();
    game.removeClass('hidden');
    loader.addClass('hidden');
  }

  function getNewQuestion() {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem(('mostRecentScore'), score);
      return window.location.assign('/end.html');
    }

    questionCounter++
    const questionIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex];
    question.text(currentQuestion.question);

    choices.each(function() {
      const number = $(this).data('number');
      $(this).text(currentQuestion['choice' + number]);
    });
    availableQuestions.splice(questionIndex, 1);
    progressBarFull.css('width', `${(questionCounter/MAX_QUESTIONS) * 100}%`)
    acceptingAnswers = true;
  }

  $(choices).click(function (e) { 
    e.preventDefault();
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = $(this);
    const selectedAnswer = selectedChoice.data('number');

    if (selectedAnswer == currentQuestion.answer) {
      incrementScore(CORRECT_BONUS);
    }

    const classApplyTo = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    selectedChoice.parent().addClass(classApplyTo);
    setTimeout(function(){
      selectedChoice.parent().removeClass(classApplyTo);
      getNewQuestion()
    }, 1000);
  });

  function incrementScore(num) {
    score += num;
    scoreText.text(score);
  }
  startQuiz()
});