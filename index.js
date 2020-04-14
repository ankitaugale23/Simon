
//variabels used in the game.
var colours=["green","red","blue","yellow"];
var colorSequence=[];
var userClickedPattern=[];
var level=0;
var isStarted=false;

//This will work after detecting mouse clicks on buttons.
$(".btn").bind("click",function(){
  var randomId=this.id;
  userClickedPattern.push(randomId);
  playSound(randomId);
  animateOnClick(randomId);
  checkAnswer(userClickedPattern.length-1);
});

//This will work when you press any key.

$(document).on("keydown",function(){
  if(!isStarted){
  $("h1").text("Level " + level);
  nextsequence();
  isStarted=true;
  }
});

//To generate the simon random pattern.
function nextsequence()
{
  level++;
    $("h1").text("Level " + level);
  userClickedPattern=[];
  var randomNumber=Math.floor(4*Math.random());
  var randomColor=colours[randomNumber];
  colorSequence.push(randomColor);
  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

//to play the specfic sound to specfic events.
function playSound(name)
{
  var audio=new Audio("sounds/" + name +".mp3");
  audio.play();
}

//To generate animations corresponding to the user input.
function animateOnClick(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}

//To check if the user is following correct pattern.
function checkAnswer(currentLevel)
{
  if(colorSequence[currentLevel]=== userClickedPattern[currentLevel])
    {
      if(colorSequence.length === userClickedPattern.length)
      {
        setTimeout(function(){
          nextsequence();
        },1000);
      }
    }
    else{
      var wrongAudio=new Audio("sounds/wrong.mp3");
      $("body").addClass("game-over");
      wrongAudio.play();
      $("h1").text("Game Over! Press any key to Restart");
      setTimeout(function(){$("body").removeClass("game-over");},200);
      startOver();
    }

}

//To restart the game.
function startOver()
    {
      isStarted=false;
      colorSequence=[];
      level=0;
    }
