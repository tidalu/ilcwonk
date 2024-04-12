#!/usr/bin/env node
process.setMaxListeners(15);

const { spinner, select, intro, outro } = require('@clack/prompts');
const { setTimeout } = require('node:timers/promises');
const { black, bgMagenta } = require('picocolors');
let total = 0;

async function askQuestion(question, answers, correctAns) {
  const options = answers.map((element) => ({
    value: element,
    label: element,
  }));

  const s = spinner();
  s.start();
  await setTimeout(1000);
  s.stop();

  const answer = await select({
    message: question,
    initialValue: 1,
    options: options,
  });
  if (answer === answers[correctAns]) {
    total++;
  }
}

class Question {
  constructor(question, answersArray, correctAnswer) {
    this.question = question;
    this.answersArray = answersArray;
    this.correctAnswer = correctAnswer;
  }
}

async function main() {
  console.clear();

  await setTimeout(1000);

  intro(
    `${bgMagenta(
      black(' Welcome. Let us find out how much of CLI expert you are!')
    )}`
  );

  const question1 = new Question(
    '1) In what year was PowerShell, a command-line shell and scripting language developed by Microsoft, first released?',
    ['1993', '1999', '2006', '2014'],
    2,
    's',
    'a'
  );

  const question2 = new Question(
    '2) What was the display technology used in early computer terminals that employed glowing green characters on a black background?',
    [
      'Cathode Ray Tube (CRT)',
      'Vapotron Display',
      'Lumigenic Screen Array',
      'Phosphor-Enhanced Matrix (PEM) Display',
    ],
    0
  );

  const question3 = new Question(
    '3) What year did MacOS change their default shell from bash to zsh?',
    ['1990', '2013', '2019', '2022'],
    2
  );

  const question4 = new Question(
    '4) What happens if I run:\n|  echo a && echo b || echo c ; echo d',
    ['abcd', 'abd', 'ab', 'ab\n|    d'],
    3
  );

  const question5 = new Question(
    '5) In the early days of computing, what was the common name for the terminal devices that consisted of a keyboard and a printer, used for interacting with mainframe computers?',
    ['TTY', 'Keyprint Console', 'TypeMaster Terminal', 'PTY'],
    0
  );

  const question6 = new Question(
    "6) newFile.txt does not exist.\n|  What happens on: echo 'Hello World' >> newFile.txt?\n",
    [
      'No file found error',
      "newFile.txt would be created and populated with 'Hello World'",
    ],
    1
  );

  const question7 = new Question(
    "7) After running the above command, what is in newFile.txt if I ran:\n|  'I am red' >> newFile.txt && 'I am green' > newFile.txt ?",
    [
      'Hello WorldI am redI am green',
      'I am redI am green',
      'I am green',
      'Hello World\n|    I am red\n|    I am green',
    ],
    2
  );

  const question8 = new Question(
    "8) Which command does NOT show `echo`'s help?",
    ['/bin/echo --help', 'help echo', 'echo --help', 'man echo'],
    1
  );

  const question9 = new Question(
    "9) Which command will rename a file 'foo' to 'bar'?",
    ['rm foo bar', 'mv foo bar', 'cp foo bar'],
    1
  );

  const question10 = new Question(
    '10) Last one. What command in normal mode in Vim repeats the last change that was made?',
    ["'.' (dot)", "'CTRL + R' (redo)", "'y' (yank)", "'yy' (duplicate line)"],
    0
  );

  const allQuestions = [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
  ];

  const readyToPlay = await select({
    message: 'No cheating. 10 questions. Results at the end. Ready to play?',
    initialValue: 'Yes',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
  });

  if (readyToPlay == 'Yes') {
    // Begin trivia game
    for (const question of allQuestions) {
      await askQuestion(
        question.question,
        question.answersArray,
        question.correctAnswer
      );
    }
    outro(` You got ${total} correct answers! `);

    if (total == 10) {
      const s = spinner();
      s.start('Generating secret message');
      await setTimeout(5000);
      s.stop();
      outro(
        `${bgMagenta(
          black(`The command line is a tool that is ripe for change. `)
        )}`
      );
    } else {
      const s = spinner();
      s.start();
      await setTimeout(3000);
      s.stop();
      outro(
        `${bgMagenta(
          black(
            `You need 10/10 correct to unlock the secret message. Try again.`
          )
        )}`
      );
    }
  } else {
    outro(`${bgMagenta(black(' Ok Bye! '))}`);
  }
}

main().catch(console.error);
