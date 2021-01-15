const express = require('express');
const app = express();
const port = 4001;
const { Worker } = require('worker_threads');
const bottedRooms = new Map();
const maxBots = 50;

app.post('/api/:gamePin/:botNumber', (req, res) => {
  const { gamePin, botNumber } = req.params;
  console.log(gamePin, botNumber);

  const amount = Math.min(
    (bottedRooms.get(gamePin) ? bottedRooms.get(gamePin) : 0) + botNumber,
    maxBots
  );

  for (let i = 0; i < amount; i++) {
    const worker = new Worker('./botworker.js');
    worker.postMessage(gamePin);
  }

  bottedRooms.set(gamePin, amount);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
