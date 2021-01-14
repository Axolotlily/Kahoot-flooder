const { Worker } = require('worker_threads');

for (let i = 0; i < 2; i++) {
  const worker = new Worker('./botworker.js');
}
