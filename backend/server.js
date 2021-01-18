const express = require('express');
const app = express();
const cors = require('cors');
const port = 4001;
const { Worker } = require('worker_threads');
const ips = new Map(); // IP : List<RoomID>
const maxBots = 50;

app.use(cors());
app.use(express.json());

app.post('/api/:gamePin/:botNumber', (req, res) => {
  const { gamePin, botNumber } = req.params;
  const name = req.body.name;
  console.log(gamePin, botNumber);

  if (ips.has(req.ip) && ips.get(req.ip).includes(gamePin))
    return res.sendStatus(403);

  const amount = Math.min(botNumber, maxBots);

  for (let i = 0; i < amount; i++) {
    const worker = new Worker('./botworker.js');

    setTimeout(() => {
      worker.postMessage(JSON.stringify({ gamePin, name }));
    }, 100);
  }

  if (ips.has(req.ip)) {
    ips.set(req.ip, [...ips.get(req.ip), gamePin]);
  } else ips.set(req.ip, [gamePin]);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
