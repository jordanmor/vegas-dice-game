// For testing and development
const localHost = 'http://localhost:8080';
// For production and deployment
const herokuHost = 'https://vegas-dice-game.herokuapp.com';
const host = herokuHost;

const rolls = ['roll-one', 'roll-two', 'roll-three', 'roll-four', 'roll-five', 'roll-six'];

const dieOne = document.getElementById('dieOne');
const dieTwo = document.getElementById('dieTwo');
const animationDuration = 2500;
let playerName = 'Player';

init();

// One page load or refresh
function init() {

  fetch(`${host}`)
  .then(response => response.json())
  .then(gameData => {
    console.log(gameData);
    playerName = gameData.playerName;
    $('.playerName').text(gameData.playerName);
    setGameInfo(gameData);
    if(gameData.newGame == true) {
      // Start modal on page load after player number fetched
      setModalInfo('Welcome Player', 'Get ready to crush it playing Vegas Dice!', 'Start Game');
      $('#modal').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
      });
    }
  });

  fetch(`${host}/highest-scores`)
    .then(response => response.json())
    .then(players => {
      html = '';
      for(let player of players) {
        html += `<tr><td>${player.name}</td><td>${player.highScore}</td></tr>`;
      }
      $('#highScores').html(html);
  });
}

function setModalInfo (messageOne, messageTwo, buttonText) {
    $('#modalMessageMain').text(`${messageOne} ${playerName}!`);
    $('#modalMessageSecondary').text(messageTwo);
    $('#modalBtn').text(buttonText);
}

function setGameInfo (gameData) {
  $('#credits').text(gameData.score);
  $('#point').text(gameData.point);
  if(gameData.message != null) {
    $('#playerMessage').text(gameData.message);
  } else {
    $('#playerMessage').text('Roll!');
  }
}

// Start new game
$('#modalBtn').on('click', function() {
  fetch(`${host}/?action=start`)
  .then(() => {
    init();
  });
});

// Roll the Dice
$('#roll').on('click', function() {

  fetch(`${host}/?action=play`)
  .then(response => response.json())
  .then(gameData => {
    // console.log(gameData);

    const regex = /roll-\w+/;
    $(this).css({ 
      "pointer-events":"none",
      "cursor":"none"
    });
  
    $('.die-one').removeClass(function(i, className) {
      return className.match(regex);
    });
    // Restart animation by triggering reflow
    // Current use case assures die will roll if the same number comes up again
    void dieOne.offsetWidth;
    $('.die-one').addClass(rolls[gameData.dieOne - 1]);
  
    $('.die-two').removeClass(function(i, className) {
      return className.match(regex);
    });
    
    // restart animation by triggering reflow
    void dieTwo.offsetWidth;
    $('.die-two').addClass(rolls[gameData.dieTwo - 1]);
  
    // setTimeout ensures button cannot be pressed again until animation sequence ends
    window.setTimeout(() => {
      $(this).css({ 
        "pointer-events":"auto",
        "cursor":"pointer"
      });
      // Game info also updates after the dice stop rolling
      setGameInfo(gameData);
    }, animationDuration);
  });
});

$('#cashOut').on('click', function() {

  setModalInfo('Thanks for playing', 'Would you like to play again?', 'Play Again');

  $('#modal').modal({
    show: true,
    keyboard: false,
    backdrop: 'static'
  });

  fetch(`${host}/?action=end`);
});