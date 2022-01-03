import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));

let lastTime;

function update(time) {

  if(lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta);
    computerPaddle.update(delta, ball.y) // paddle needs to know where the ball is
  }
  
  lastTime = time;
  window.requestAnimationFrame(update)
};

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100; //e.y is the position in pixels so converted %

});

window.requestAnimationFrame(update);