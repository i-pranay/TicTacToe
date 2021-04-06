const tics = ["X", "0"];

const getTick = (function* getNextTick() {
  let currentTickIndex = 0;
  while (true) {
    yield tics[currentTickIndex];
    currentTickIndex = Math.abs(currentTickIndex - 1);
  }
})();

export { getTick };
