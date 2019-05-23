let $attempt = [0,0];
let $question;
let $form;
let $submit;

$(()=>{
$form = $('#quiz');
$submit = $("#sub");

$('#quiz').removeClass('hidden');
$("#score").removeClass('hidden');

//prevent default on submit and reset
$submit.click( e => e.preventDefault());

// check answer on submit
$submit.click(()=> {
    let $ans = $('input[name=answer]:checked').val();
    checkAnswer();
});
$question = $questions.splice(Math.floor(Math.random()*$questions.length), 1)[0];
getQuestion();
});

function getQuestion(){

    if($questions.length<= 0){
        endQuiz();
    }
    displayQuestions();
}

function  displayQuestions(){
    $('input[type="radio"]').prop('checked', false); 
    $("#quiz_question").html($question.question);
    $("label[for='answer_a']").html($question.a);
    $("label[for='answer_b']").html($question.b);
    $("label[for='answer_c']").html($question.c);
    $("label[for='answer_d']").html($question.d);
    $('#attempted').html('Attempted: ' + $attempt[0]);
    $('#correct').html('Correct: ' + $attempt[1]);
    $('#incorrect').html('Incorrect: ' + ($attempt[0] - $attempt[1]));
}

function checkAnswer(){
    let $answer = $('input[type="radio"]:checked').val();

    if($answer !== "undefined"){
        $attempt[0]++;
        if($answer === $question.answer){ 
            $attempt[1]++;
            $question = $questions.splice(Math.floor(Math.random()*$questions.length), 1)[0];
            getQuestion();
        }
        else{
            displayQuestions();
        }
    }
}

function endQuiz(){
    const $form = $('#quiz');
    const $submit = $("input[type=submit]",$form);
    const $radio = $("input[type=radio]",$form);
    $submit.attr("disabled", "disabled");
    $radio.attr("disabled", "disabled");
    //maybe remove this before submit?
    $('#answers').append("<hr /><p class='centered'>Quiz Finished! Please refresh to play again!</p>");
}

