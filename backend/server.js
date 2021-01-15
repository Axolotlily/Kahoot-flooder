const express = require('express');
const app = express();
const port = 4001;
const { Worker } = require('worker_threads');

app.post('/:gamePin/:botNumber', (req, res) => {
  const { gamePin, botNumber } = req.params;
  console.log(gamePin, botNumber);

  for (let i = 0; i < botNumber; i++) {
    const worker = new Worker('./botworker.js');
    worker.postMessage(gamePin);
  }
  res.send(200);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
