const { parentPort } = require('worker_threads');

const Kahoot = require('kahoot.js-updated');
const client = new Kahoot();

parentPort.on('message', (e) => {
  const { gamePin, name } = JSON.parse(e);

  console.log('Joining kahoot...');
  client.join(gamePin, name + Math.round(Math.random() * 10000));

  client.on('Joined', () => {
    console.log('I joined the Kahoot!');
  });

  client.on('QuizStart', () => {
    console.log('The quiz has started!');
  });

  client.on('QuestionStart', (question) => {
    console.log('A new question has started, answering the first answer.');
    question.answer(0);
  });

  client.on('QuizEnd', () => {
    console.log('The quiz has ended.');
    parentPort.close();
  });
});
