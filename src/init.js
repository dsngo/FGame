import initButton from "./buttons";
import { TICK_RATE } from "./constants";
import gameState from "./gameState";

async function init() {
  console.log("Starting game...!");
  initButton(gameState.onUserAction.bind(gameState));

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      gameState.onTick();
      nextTimeToTick = now + TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  requestAnimationFrame(nextAnimationFrame);
}

init();
