import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;

function update(time) {

  if(lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y) // paddle needs to know where the ball is

    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
    // change hue by little
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if(isLose()) handleLose();
  }
  
  lastTime = time;
  window.requestAnimationFrame(update)
};

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
};

function handleLose() {
  const rect = ball.rect();
  if(rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();

  const playerScore = parseInt(playerScoreElem.textContent);
  const computerScore = parseInt(computerScoreElem.textContent);

  if(playerScore >= 10 || computerScore >= 10 ) {
    const body = document.querySelector("body");
    const foreground = getComputedStyle(document.documentElement).getPropertyValue("--foreground-color");
    const background = getComputedStyle(document.documentElement).getPropertyValue("--background-color");
    body.style.setProperty("color", foreground)
    body.style.setProperty("width", "100vw");
    body.style.setProperty("height", "100vh");
    body.style.setProperty("font-size", "2rem");
    body.style.setProperty("font-weight", "bold");
    body.style.setProperty("display", "flex");
    body.style.setProperty("flex-direction", "column");
    body.style.setProperty("justify-content", "center");
    body.style.setProperty("align-items", "center");
    if(playerScore >= 10){
      body.innerHTML = `CONGRATS! You Won ! 
      <button
      style="color: ${background}; 
      background-color: ${foreground}; 
      font-weight: bold;
      outline: none;
      border: none;
      padding: 5px;
      font-size: 14px;
      ">Restart</button>`;
      const btn = document.querySelector("button");
      btn.onclick = () => {
        window.location.reload();
      };
      // alert("Congrats! You Won!");
      // window.location.reload();
    }

    if(computerScore >= 10) {
      body.innerHTML = `OOPS! You lose! 
      <button
      style="color: ${background}; 
      background-color: ${foreground}; 
      font-weight: bold;
      outline: none;
      border: none;
      padding: 5px;
      font-size: 14px;
      ">Restart</button>`;
      const btn = document.querySelector("button");
      btn.onclick = () => {
        window.location.reload();
      };
      // alert("Ooops! You lose!")
      // window.location.reload();

    }
  }
};

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100; //e.y is the position in pixels so converted %

});

document.addEventListener("touchmove", e => {
  playerPaddle.position = (e.touches[0].clientY / window.innerHeight) * 100; //e.y is the position in pixels so converted %
  // console.log(53, e)
  // console.log(54, e.touches)
  // console.log(54, e.touches[0].clientY)

});

window.requestAnimationFrame(update);