const gameState = {
  clock: 1,
  current: "INIT",
  tick() {
    this.clock++, console.log("clock", this.clock);

    return this.clock;
  },
};

export default gameState;
