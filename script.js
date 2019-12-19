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
//Add coordinates to every cell
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
  //The function returns two random values between 1 and 10 in  an Array- PosX and PosY
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  //Минимальное значение по позиции Х должно быть 3. иначе происходит ошибка- несуществующие координаты.
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
}

let coordinates = generateSnake();
//Ищем ячейку
let snakeBody = [
  document.querySelector(
    '[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'
  ),
  document.querySelector(
    '[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'
  ),
  document.querySelector(
    '[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]'
  ) // Чтобы переменные не превратились в обычную строку мы используем эту конструкцию " ' + переменная + ' "
]; //Array with 3 elements- 3 nex-to-each-other cells.

for (
  //Add class snakeBody in a Loop
  let i = 0;
  i < snakeBody.length;
  i++
) {
  snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

//Mouse- random position NOT taken by the snake.
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
  //Цикл while- пока мышь занимает те же координаты что и змея- должна генерироваться новая мышь- пока она не встанет на свободную от змеи ячейку
  while (mouse.classList.contains('snakeBody')) {
    generateMouse();
    mouse = document.querySelector(
      '[posX = "' +
        mouseCoordinates[0] +
        '"][posY = "' +
        mouseCoordinates[1] +
        '"]'
    );
  }
  mouse.classList.add('mouse');
}
createMouse();

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

  //Teach him to eat mice :) когда змея и мышь- их координаты совпадут- то мышь изчезает, змея увеличивается на 1 ячейку- и появляется новая мышь.

  //Проверка условия- если координаты головы совпадают с координатами мыши- у мыши удаляется класс mouse, она исчезает с площадки, продублировать последний элемент из змеиного тела- и запушить его в конец. snakeBody[0] - its the head!
  //Если POsX головы равен posX мыши-

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
  //Пропись окончания игры- если голова змеи упрется в ячейку с уже имеющимся классом snakeBody
  if (snakeBody[0].classList.contains('snakeBody')) {
    setTimeout(() => {
      alert(`Game Over :( Total score: ${score}`);
    }, 300);

    clearInterval(interval);

    snakeBody[0].style.background = 'url(CatScream.jpg)';
    snakeBody[0].style.backgroundSize = 'cover';
  }
  //Kolduem!
  snakeBody[0].classList.add('head');
  for (
    //Add class snakeBody in a Loop
    let i = 0;
    i < snakeBody.length;
    i++
  ) {
    snakeBody[i].classList.add('snakeBody');
  }

  steps = true;
}

let interval = setInterval(move, 300);
// Работа с обработчиком событий. При нажатии кнопок вверх, вниз, вправо, влево- должно что-то происходить меняться направление.
window.addEventListener('keydown', function(e) {
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
  //Код Влево-37. вправо-39. вверх-38. вниз-40.
});
