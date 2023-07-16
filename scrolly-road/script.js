const carColors = ['red', 'lightskyblue', 'yellow', 'orange', 'purple', 'pink', 'forestgreen'];
const carInfo = [[0.5, [1]], [1, [1]], [2, [1,2]], [3,[1,2,3]], [4,[1,2]], [6,[2]], [9,[3]]];
var prevRoad = 0;
var score = 0;
var passed = [];

function updatePlayer() {
    var player = document.querySelector('#player');
    var square = player.getBoundingClientRect();
    this.playerTop = square.top;
    this.playerLeft = square.left;
    this.playerBottom = square.bottom;
    this.playerRight = square.right;
}

function updateScore() {
    updatePlayer();
    document.querySelectorAll('.car').forEach(function (cars) {
        var car = cars.getBoundingClientRect();
        
        if (car.top <= this.playerBottom && car.bottom >= this.playerTop && car.left <= this.playerRight && car.right >= this.playerLeft) {
            gameOver();
        }
    });
    
    document.querySelectorAll('.road').forEach(function (road) {
        if (road.getBoundingClientRect().bottom < this.playerTop && !passed.includes(road)) {
            score++;
            document.querySelector('#score').innerHTML = score;
            passed.push(road);
        }
    });
};

function checkDeath() {
    
}

function gameOver() {
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('#gameover-score').innerHTML = 'Score: ' + score;
    document.querySelector('#gameover-dialog').style.display = 'block';
}

function removeComponents() {
    document.querySelectorAll('.component').forEach(function (component) {
        if (component.getBoundingClientRect().bottom < -150) { 
            component.remove();
            if (component.classList.contains('road')) {
                passed.shift();
            }
        }
    });
}

function addPavement() {
    prevRoad = 0;
    var pavement = document.createElement('div');
    pavement.classList.add('component');
    pavement.classList.add('pavement');
    if (Math.floor(Math.random() * 3) + 1 == 2) {
        var rocks = document.createElement('div');
        rocks.classList.add('rocks');
        rocks.appendChild(document.createElement('div'));
        rocks.appendChild(document.createElement('div'));
        rocks.appendChild(document.createElement('div'));
        rocks.style.top = Math.floor(Math.random() * 60) + 20 + '%';
        rocks.style.left = Math.floor(Math.random() * 60) + 20 + '%';
        rocks.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
        pavement.appendChild(rocks);
    }
    document.querySelector('#main').appendChild(pavement);
}

function addRoad() {
    if (prevRoad == 1) {
        const stripes = document.createElement('ul');
        stripes.classList.add('component');
        stripes.classList.add('stripes');
        for (i = 0; i < 13; i++) {
            stripes.appendChild(document.createElement('li'));
        }
        document.querySelector('#main').appendChild(stripes);
    } 

    prevRoad = 1;
    var randomColor = carColors[Math.floor(Math.random() * carColors.length)];
    var randomCarInfo = carInfo[Math.floor(Math.random() * carInfo.length)];
    var randomSpeed = randomCarInfo[0];
    var randomNumber = randomCarInfo[1][Math.floor(Math.random() * randomCarInfo[1].length)];
    var randomDirection = Math.floor(Math.random() * 2) + 1;

    var road = document.createElement('div');
    road.classList.add('component');
    road.classList.add('road');

    var car = document.createElement('div');
    car.classList.add('car');

    car.style.backgroundColor = randomColor;
    car.style.animation = 'car-move-' + randomDirection + ' ' + randomSpeed + 's linear infinite';

    delay = 0;
    for (i = 0; i < randomNumber; i++) {
        var carClone = car.cloneNode(true);
        // carClone.style.backgroundColor = carColors[Math.floor(Math.random() * carColors.length)];
        carClone.style.animationDelay = delay + 's';
        road.appendChild(carClone);
        delay += randomSpeed / randomNumber;
    }

    document.querySelector('#main').appendChild(road);
}

function generate() {
    var loadPoint = 2 * window.innerHeight;
    var currentPoint = document.querySelector('#main').getBoundingClientRect().bottom;
    if (currentPoint < loadPoint) {
        for (j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
            addRoad();
        }

        for (j = 0; j < Math.floor(Math.random() * 2) + 1; j++) {
            addPavement();

        }
        loadPoint += window.innerHeight;
    }
}


document.querySelector('#restart').addEventListener('click', function () {
    score = 0;
    document.querySelector('#score').innerHTML = score;
    prevRoad = 0;
    passed = [];
    document.querySelectorAll('.component').forEach(function (component) {
        component.remove();
    });
    document.querySelector('#gameover-dialog').style.display = 'none';
    document.querySelector('html').style.overflow = 'auto';
});

setInterval(generate, 10);
// TODO Possibly merge checkDeath and updateScore
setInterval(checkDeath, 10);
setInterval(updateScore, 10);
setInterval(removeComponents, 1000);