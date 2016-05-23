var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
             1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8,8, 9, 9, 10, 10];
var shuffledCards = shuffle(cards);
var playerDeck = shuffledCards.slice(0,20);
var computerDeck = shuffledCards.slice(20);
var playerlife = 25;
var computerLife = 25;
var playerFeedback = document.getElementById('playerFeedback');
var playerName;
var sword = new Audio('sounds/sword.mp3');
var block = new Audio('sounds/block.mp3');

function getPlayerName() {
    playerName = document.getElementById('userInput').value;
    if (playerName.length == 0) {
        return false;
    }
    document.getElementById('playerName').innerHTML = playerName;
    document.getElementById('playerName').innerHTML = playerName;
    document.getElementById('overlay').style.display = 'none';
}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function getTopCard(deck) {
    return deck[0];
}

function dealCards() {
    var playerTopCard = getTopCard(playerDeck);
    var computerTopCard = getTopCard(computerDeck);
    var cardImage = "<img src='images/cardBack.png'/>";

    whoWon();

    document.getElementById("card1").innerHTML = "<div class='cardNumber'>" + playerTopCard + '</div>' + cardImage;
    document.getElementById("card2").innerHTML = "<div class='cardNumber'>" + computerTopCard + '</div>' + cardImage;
    document.getElementById("scoreComputer").innerHTML = computerLife;
    document.getElementById("scorePlayer").innerHTML = playerlife;
}

function whoWon() {
    var playerTopCard = getTopCard(playerDeck);
    var computerTopCard = getTopCard(computerDeck);
    document.getElementById('computerDamageImage').setAttribute('src', 'images/empty.png');
    document.getElementById('playerDamageImage').setAttribute('src', 'images/empty.png');

    if (playerTopCard > computerTopCard) {
        computerLife = computerLife - (playerTopCard - computerTopCard);
        sword.play();
        document.getElementById('computerDamageImage').setAttribute('src', 'images/damage.gif');
        playerFeedback.innerHTML = 'Hunter lost: ' + (playerTopCard - computerTopCard) + ' HP';
        checkIsGameOver();
        playerDeck.shift();
        computerDeck.shift();
    } else if (playerTopCard < computerTopCard) {
        playerlife = playerlife - (computerTopCard - playerTopCard);
        sword.play();
        document.getElementById('playerDamageImage').setAttribute('src', 'images/damage.gif');
        playerFeedback.innerHTML = playerName + ' lost: ' + (computerTopCard - playerTopCard) + ' HP';
        checkIsGameOver();
        playerDeck.shift();
        computerDeck.shift();
    } else {
        block.play();
        playerDeck.shift();
        computerDeck.shift();
        playerFeedback.innerHTML = 'It was a tie!';
    }
}

shuffle(cards);

document.getElementById("click").addEventListener("click", dealCards);
document.getElementById("replay").addEventListener("click", replay);
document.getElementById("userSubmit").addEventListener("click", getPlayerName);
 function replay() {
     window.location.reload();
 }

function checkIsGameOver() {
    var gameResult = document.getElementById('gameResult');
    var gameResultContent = gameResult.innerHTML;
    var replay = document.getElementById('replay');
    var click = document.getElementById('click');
    var dodgeL = document.getElementById('dodgeL');
    var dodgeR = document.getElementById('dodgeR');

    function gameIsOver() {
        playerFeedback.innerHTML = 'Game Over, do you want to play again?';
        gameResult.innerHTML = gameResultContent;
        gameResult.style.display = 'block';
        replay.style.display = 'inline';
        click.style.display = 'none';
        dodgeL.style.display = 'none';
        dodgeR.style.display = 'none';
    }

    if (playerlife <= 0) {
        playerlife = 'Lost';
        computerLife = 'Won';
        gameResultContent = '<p>Hunter won the game!</p>';
        gameIsOver();
    } else if (computerLife <= 0) {
        computerLife = 'Lost';
        playerlife = 'Won';
        gameResultContent = '<p>' + playerName + ' won the game!</p>';
        gameIsOver();
    }
}