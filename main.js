'use strict';
//all elements
var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
const delay = 1200;
var timerId = 0;
var timerOut = 0;
var id = 1;
var cardsArray = [
    'pictures/p1.jpg',
    'pictures/p2.jpg',
    'pictures/p3.jpg',
    'pictures/p4.jpg',
    'pictures/p5.jpg',
    'pictures/p6.jpg',
    'pictures/p7.jpg',
    'pictures/p8.jpg',
    'pictures/p9.jpg',
    'pictures/p10.jpg',
    'pictures/p11.jpg',
    'pictures/p12.jpg',
    'pictures/p13.jpg',
    'pictures/p14.jpg',
    'pictures/p15.jpg',
    'pictures/p16.jpg',
    'pictures/p17.jpg',
    'pictures/p18.jpg',
    'pictures/p19.jpg',
    'pictures/p20.jpg',
    'pictures/p21.jpg',
    'pictures/p22.jpg',
    'pictures/p23.jpg',
    'pictures/p24.jpg',
    'pictures/p25.jpg',
    'pictures/p26.jpg',
    'pictures/p27.jpg',
    'pictures/p28.jpg',
    'pictures/p29.jpg',
    'pictures/p30.jpg',
    'pictures/p31.jpg',
    'pictures/p32.jpg',
    'pictures/p33.jpg',
    'pictures/p34.jpg',
    'pictures/p35.jpg',
    'pictures/p36.jpg',
    'pictures/p37.jpg',
    'pictures/p38.jpg',
    'pictures/p39.jpg',
    'pictures/p40.jpg',
    'pictures/p41.jpg',
    'pictures/p42.jpg',
    'pictures/p43.jpg',
    'pictures/p44.jpg',
    'pictures/p45.jpg',
    'pictures/p46.jpg',
    'pictures/p47.jpg',
    'pictures/p48.jpg',
    'pictures/p49.jpg',
    'pictures/p50.jpg'
];

var t = document.getElementById('time');
var min = 0;
var sec = 0;

var radio = 0;

var game = document.getElementById('game');
var grid = document.createElement('section');
var countmatch = 0;

grid.setAttribute('class', 'grid');
game.appendChild(grid);

var match = function match() {

    console.log(countmatch);
    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
        card.classList.add('match');
        countmatch++;
    });
};

var resetGuesses = function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
        console.log("resetGuesses");
        card.classList.remove('selected');
    });
};

grid.addEventListener('click', function (event) {

    var clicked = event.target;
    console.log("clicked"+clicked);
    // var clicked =this.id;
    if (clicked.nodeName === 'SECTION' || 
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')) {
        return;
    }

    if (count < 2) {
        count++;
        
        console.log("count"+count);
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});
function changeTable(e) {
    e.preventDefault();
    console.log("Hello new game");

    console.log(game);
    clearInterval(timerId);
    clearTimeout(timerOut);

    var radio = document.querySelector('[name="size"]:checked').value;
    console.log(radio);
    min = 0;
    sec = 0;
    countmatch = 0;
    timerId = setInterval(check, 1 * 1000);
    var carddel = "";
    if (radio == "s4") {

        timerOut = setTimeout(afterSeconds, 120 * 1000);
        carddel = cardsArray.slice();
        console.log(cardsArray);
        carddel = carddel.splice(0, 8);
        console.log(carddel);
        grid.style.width = "440px";

    } if (radio == "s6") {
        timerOut = setTimeout(afterSeconds, 300 * 1000);
        carddel = cardsArray.slice();
        console.log(cardsArray);
        carddel = carddel.splice(0, 18);
        console.log(carddel);
        grid.style.width = "660px";
    } if (radio == "s8") {
        timerOut = setTimeout(afterSeconds, 480 * 1000);
        carddel = cardsArray.slice();
        console.log(cardsArray);
        carddel = carddel.splice(0, 32);
        console.log(carddel);
        grid.style.width = "880px";

    } if (radio == "s10") {
        timerOut = setTimeout(afterSeconds, 600 * 1000);
        carddel = cardsArray.slice();
        console.log(cardsArray);
        carddel = carddel.splice(0, 50);
        console.log(carddel);
        grid.style.width = "1100px";
    }
    var gameGrid = carddel.concat(carddel);//dublicate cards array
    console.log("gameGrid");
    console.log(gameGrid);
    gameGrid = gameGrid.sort(function () {
        return 0.5 - Math.random();// need more explane
    });
    var a = gameGrid.length;
    console.log(a);
    console.log("child " + grid.childElementCount);

    while (grid.childElementCount != 0) {
        console.log(grid.firstChild);
        grid.removeChild(grid.firstChild);
    }

    console.log("child " + grid.childElementCount);

    for (var i = 0; i < gameGrid.length; i++) {

        console.log(gameGrid.length);
        var img = gameGrid[i];
        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = img;

        var front = document.createElement('div');
        front.classList.add('front');

        var back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = 'url(' + img + ')';

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    }
}

function check() {
    t.innerHTML = mone();//52
  //  console.log(t);
    WinGame();
}
function mone() {
    let str = "";
    sec++;
    if (min < 10) {
        str = "0" + min + ":";
    }
    if (sec < 10) {
        str = str + "0" + sec;
    }

    else if (sec < 60) {
        str = str + sec;
    }

    if (sec == 60) {
        sec = 0;
        min++;
        str = "0" + min + ":" + "0" + sec;
    }
    return str;
}
function WinGame() {
    let temp = grid.childElementCount;
   // console.log("temp");
   // console.log(temp);
    if (countmatch == temp) {
        console.log("You win!");
        alert("You win!");
        clearInterval(timerId);
        return true;
    }
    else {
        return false;
    }

}
function afterSeconds() {
    if (!WinGame()) {
        clearInterval(timerId);
        clearTimeout(timerOut);
        alert("Time end");
    }
}

document.getElementById('btn').addEventListener('click', changeTable);