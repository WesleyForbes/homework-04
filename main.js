var questions = [{
    question: "1. What is the U.S Capitol?",
    choices: ["austin", "new york", "washington dc", "talahasse"],
    correctAnswer: 2
  }, {
    question: "2. what country is home of the kangaroo?",
    choices: ["germany", "belgium", "australia", "antarctica"],
    correctAnswer: 2
  }, {
    question: "3. What is the capital city of Peru?",
    choices: ["paris", "lima", "texas", "alabama"],
    correctAnswer: 1
  }, {
    question: "4. What is the largest bone in the human body?",
    choices: ["The femur", "arm", "spine", "vertebret"],
    correctAnswer: 0
  }, {
    question: "5. In which year did the Bay of Pigs invasion take place?",
    choices: ["1961", "1876", "8976", "1988"],
    correctAnswer: 0
  },{
  question: "6. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correctAnswer: 1
  },{
  question: "7. Who wrote Das Kapital?",
    choices: ["niche", "obama", "trump", "marx"],
    correctAnswer: 3
  },{
  question: "8. Who was the Greek god of dreams?",
    choices: ["obama", "gandalf", "morpheus", "harry potter"],
    correctAnswer: 2
  },{
  question: "9. Which is the largest island in the Mediterranean Sea?",
    choices: ["turkey", "sicily", "isreal", "None of these"],
    correctAnswer: 1
  },{
  question: "10. Who was the first man to reach the South Pole?",
    choices: ["Roald Amundsen.", "capt america", "hulk", "wonder woman"],
    correctAnswer: 0
  }];
  
  
  var currentQuestion = 0;
  var viewingAns = 0;
  var correctAnswers = 0;
  var quizOver = false;
  var iSelectedAnswer = [];
  var c=180;
  var t;
  $(document).ready(function () 
  {
    
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');
  
  timedCount();
  
  $(this).find(".preButton").on("click", function () 
  {		
    
        if (!quizOver) 
    {
      if(currentQuestion == 0) { return false; }
  
      if(currentQuestion == 1) {
        $(".preButton").attr('disabled', 'disabled');
      }
      
        currentQuestion--; 
        if (currentQuestion < questions.length) 
        {
          displayCurrentQuestion();
          
        } 					
    } else {
      if(viewingAns == 3) { return false; }
      currentQuestion = 0; viewingAns = 3;
      viewResults();		
    }
    });
  
  
  
    $(this).find(".nextButton").on("click", function () 
  {
        if (!quizOver) 
    {
      
            var val = $("input[type='radio']:checked").val();
  
            if (val == undefined) 
      {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } 
      else 
      {
                
                $(document).find(".quizMessage").hide();
        if (val == questions[currentQuestion].correctAnswer) 
        {
          correctAnswers++;
        }
        iSelectedAnswer[currentQuestion] = val;
        
        currentQuestion++; 
        if(currentQuestion >= 1) {
            $('.preButton').prop("disabled", false);
        }
        if (currentQuestion < questions.length) 
        {
          displayCurrentQuestion();
          
        } 
        else 
        {
          displayScore();
          $('#iTimeShow').html('Quiz Time Completed!');
          $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
          c=185;
          $(document).find(".preButton").text("View Answer");
          $(document).find(".nextButton").text("Play Again?");
          quizOver = true;
          return false;
          
        }
      }
          
    }	
    else 
    { 
      quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
      $(document).find(".nextButton").text("Next Question");
      $(document).find(".preButton").text("Previous Question");
       $(".preButton").attr('disabled', 'disabled');
      resetQuiz();
      viewingAns = 1;
      displayCurrentQuestion();
      hideScore();
    }
    });
  });
  
  
  
  function timedCount()
  {
    if(c == 185) 
    { 
      return false; 
    }
    
    var hours = parseInt( c / 3600 ) % 24;
    var minutes = parseInt( c / 60 ) % 60;
    var seconds = c % 60;
    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
    $('#timer').html(result);
    
    if(c == 0 )
    {
          displayScore();
          $('#iTimeShow').html('Quiz Time Completed!');
          $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
          c=185;
          $(document).find(".preButton").text("View Answer");
          $(document).find(".nextButton").text("Play Again?");
          quizOver = true;
          return false;
          
    }
    
    
    c = c - 1;
    t = setTimeout(function()
    {
      timedCount()
    },1000);
  }
  
  
  
  function displayCurrentQuestion() 
  {
  
  if(c == 185) { c = 180; timedCount(); }
    
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    
    $(questionClass).text(question);
    
    $(choiceList).find("li").remove();
    var choice;
  
  
    for (i = 0; i < numChoices; i++) 
  {
        choice = questions[currentQuestion].choices[i];
    
    if(iSelectedAnswer[currentQuestion] == i) {
      $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
    } else {
      $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
    }
    }
  }
  
  function resetQuiz()
  {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
  }
  
  function displayScore()
  {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
  }
  
  function hideScore() 
  {
    $(document).find(".result").hide();
  }
  
  
  function viewResults() 
  {
  
  if(currentQuestion == 10) { currentQuestion = 0;return false; }
  if(viewingAns == 1) { return false; }
  
  hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    
    $(questionClass).text(question);
    
    $(choiceList).find("li").remove();
    var choice;
  
  
  for (i = 0; i < numChoices; i++) 
  {
        choice = questions[currentQuestion].choices[i];
    
    if(iSelectedAnswer[currentQuestion] == i) {
      if(questions[currentQuestion].correctAnswer == i) {
        $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
      } else {
        $('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
      }
    } else {
      if(questions[currentQuestion].correctAnswer == i) {
        $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
      } else {
        $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
      }
    }
    }
  
  currentQuestion++;
  
  setTimeout(function()
    {
      viewResults();
    },3000);
  }
  