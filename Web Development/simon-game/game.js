var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

/*
 * Next Level
 */
function nextSequence() {
  // Pick a random color for Simon and push to pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Flash and play sound when Simon picks a move
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  // Update level #
  $("h1").text("Level " + level);
  level++;

  // Reset User Choices after each level
  userPattern = [];
}

/*
 * Play Sound when a button gets clicked
 */
function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

/*
 * Aninates when a button gets clicked
 */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/*
 * Decide how the game continue
 */
function checkAnswers(currentLevel) {
  // Wrong move
  if (userPattern[currentLevel] !== gamePattern[currentLevel]) {
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();

    // Flash red screen for 200ms
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Change H1 to Game Over
    $("h1").text("Game Over! Press any key to restart.");
    gameOver();
  } else {
    playSound(userPattern[currentLevel]);

    // Check if the user finishes the sequence
    // If yes, move to next sequence
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 500);
    }
  }
}

/*
 * Reset the game
 */
function gameOver() {
  level = 0;
  gamePattern = [];
  userPattern = [];
}

/*
 * jQuery controls when the user clicks to play current game
 */
$(".btn").click(function() {
  // Get color by element
  var userChosenColor = $(this).attr("id");
  // Push each move to the UserPattern
  userPattern.push(userChosenColor);
  animatePress(userChosenColor);
  // Check answers for every move
  checkAnswers(userPattern.length - 1);
});

/*
 * jQuery controls when user type to play new Game
 */
$(document).keypress(function() {
  gameOver();
  nextSequence();
});
