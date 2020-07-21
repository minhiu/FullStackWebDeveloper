// Getting random numbers for dices
var randomNumber1 = Math.ceil(Math.random() * 6);
var randomNumber2 = Math.ceil(Math.random() * 6);

// Assign new numbers to both dices
document.querySelector(".img1").setAttribute("src", `images/dice${randomNumber1}.png`);
document.querySelector(".img2").setAttribute("src", `images/dice${randomNumber2}.png`);

// Find the winners
if (randomNumber1 > randomNumber2) {
  document.getElementById("title").innerHTML = "Player 1 wins!";
} else if (randomNumber1 < randomNumber2) {
  document.getElementById("title").innerHTML = "Player 2 wins!";
} else {
  document.getElementById("title").innerHTML = "Draw!";
}
