'use strict';

//Field
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

//Cells
for (let i = 1; i < 101; i++) {
  let excel = document.createElement('div');
  field.appendChild(excel);
  excel.classList.add('excel');
}

//Add coordinates to each cell
let excel = document.getElementsByClassName('excel');
let x = 1,
  y = 10;

for (let i = 0; i < excel.length; i++) {
  if (x > 10) {
    x = 1;
    y--;
  }
  excel[i].setAttribute('posX', x);
  excel[i].setAttribute('posY', y);
  x++;
}


//Let the snake appear at the random position every time the game starts
//What the Snake is made of - a few cells next to each other, with a new class name
function generateSnake() {
  //The function returns two random values between 1 and 10 in an Array- PosX and PosY
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  //Minimal value of posX has to be equal to 3- otherwise there will be an error because of non-existing coordinates.
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
}

let coordinates = generateSnake();

//Find the appropriate cell:
let snakeBody = [
  document.querySelector(
    '[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'
  ),
  document.querySelector(
    '[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'
  ),
  document.querySelector(
    '[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]'
  )
];
//To stop variables from turning into a string- we use this construction- " ' + variable + ' "
//Array with 3 elements- 3 next-to-each-other cells.

//Put the snakeBody in a Loop
for (
  let i = 0; i < snakeBody.length; i++
) {
  snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

//Mouse- to appear on a random position NOT taken by the snake.
let mouse;

function createMouse() {
  function generateMouse() {
    let posX = Math.round(Math.random() * (10 - 1) + 1);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
  }
  let mouseCoordinates = generateMouse();
  //console.log(mouseCoordinates);
  mouse = document.querySelector(
    '[posX = "' +
    mouseCoordinates[0] +
    '"][posY = "' +
    mouseCoordinates[1] +
    '"]'
  );

  //While loop- while the mouse is on the same coordinate cell as the snake- new mice have to keep generating until they take an empty cell.
  while (mouse.classList.contains('snakeBody')) {
    generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] +
      '"]'
    );
    break;
  }
  mouse.classList.add('mouse');

}
createMouse();


//Rules

let rules = document.createElement('paragraph');
document.body.appendChild(rules);
// rules.classList.add('.rules-style');
rules.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 20px;
font-family: 'Calibri';
display: block;
width: 500px;
text-align: center;
text-transform: uppercase;
font-weight: bold;
`;
rules.innerHTML = `
Keep chasing and eating mice!<br><br> For every mouse you catch - you will get 1 point.<br> Remember, there are no boundaries in this maze.<br> The game will stop once the snake bites itself -<br> or there is nowhere else to grow.<br> Good luck ^_^
`;


// 'Keep catching and eating mice!<br> For every mice you catch - you get 1 point.<br> Remember, there are no boundaries in the maze.<br> The game will only stop once the snake bites itself or there is nowhere else to frow.<br> Good luck ^_^';
// rules.innerHTML += 'Keep catching and eating mice!';
// rules.innerHTML += 'For every mice you catch - you will get 1 point.';
// rules.innerHTML += 'Remember, there are no boundaries in the maze.';
// rules.innerHTML += 'The game will stop once the snake bites itself or there is nowhere else to grow.';
// rules.innerHTML += 'Good luck ^_^';


//Points Count
let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display: block;
`;
let score = 0;
input.value = `Total score: ${score}`;


//Make the snake MOVE
let direction = 'right';
let steps = false;

function move() {
  let snakeCoordinates = [
    snakeBody[0].getAttribute('posX'),
    snakeBody[0].getAttribute('posY')
  ];
  snakeBody[0].classList.remove('head');
  snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
  snakeBody.pop();
  //RIGHT

  if (direction == 'right') {
    if (snakeCoordinates[0] < 10) {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' +
          (+snakeCoordinates[0] + 1) +
          '"][posY = "' +
          snakeCoordinates[1] +
          '"]'
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'
        )
      );
    }
  }

  //LEFT
  else if (direction == 'left') {
    if (+snakeCoordinates[0] > 1) {
      /////////////
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' +
          (+snakeCoordinates[0] - 1) +
          '"][posY = "' +
          snakeCoordinates[1] +
          '"]'
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'
        )
      );
    }
  }
  //UP
  else if (direction == 'up') {
    if (+snakeCoordinates[1] < 10) {
      ///////////
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' +
          snakeCoordinates[0] +
          '"][posY = "' +
          (+snakeCoordinates[1] + 1) +
          '"]'
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' + snakeCoordinates[0] + '"][posY = "1"]' //1
        )
      );
    }
  }
  //DOWN
  else if (direction == 'down') {
    if (+snakeCoordinates[1] > 1) {
      ////
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' +
          snakeCoordinates[0] +
          '"][posY = "' +
          (+snakeCoordinates[1] - 1) + //////+++++
          '"]'
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'
        )
      );
    }
  }

  //Teach the Snake to eat mice :) when the snake and the mice are on the same cooridantes- the mouse has to dissappear, the snake becomes +1 cell longer- and another mouse is randomly generated.
  //Run and check the 
  //if PositionX of SnakeHead == PositionX of the mouse-


  if (
    snakeBody[0].getAttribute('posX') === mouse.getAttribute('posX') &&
    snakeBody[0].getAttribute('posY') === mouse.getAttribute('posY')
  ) {
    mouse.classList.remove('mouse');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(
      document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]')
    );
    createMouse(); //PosX равен вспомогательной переменной А, posY - переменной В
    score++;
    input.value = `Total score: ${score}`;
  }

  //Code the end of game- ehrn snakeHead gets onto a cell that already has snakeBody class.
  if (snakeBody[0].classList.contains('snakeBody')) {
    setTimeout(() => {
      alert(`Game Over :( Total score: ${score}`);
    }, 300);

    clearInterval(interval);

    snakeBody[0].style.background = 'url(CatScream.jpg)';
    snakeBody[0].style.backgroundSize = 'cover';
  }

  //the magic begins!
  snakeBody[0].classList.add('head');
  for (
    //Put "class snakeBody" in a Loop
    let i = 0; i < snakeBody.length; i++
  ) {
    snakeBody[i].classList.add('snakeBody');
  }

  steps = true;
}

let interval = setInterval(move, 200);

// Work with eventListener. Something has to happen- direction changes when these buttons are clicked- up, down, left, right.
//e.Keycodes- Left - 37; Up - 38; Right - 39; Down - 40.
window.addEventListener('keydown', function (e) {
  if (steps == true) {
    if (e.keyCode == 37 && direction !== 'right') {
      direction = 'left';
      steps = false;
    } else if (e.keyCode == 38 && direction !== 'down') {
      direction = 'up';
      steps = false;
    } else if (e.keyCode == 39 && direction !== 'left') {
      direction = 'right';
      steps = false;
    } else if (e.keyCode == 40 && direction !== 'up') {
      direction = 'down';
      steps = false;
    }
  }
});