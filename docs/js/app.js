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
let currentScore = 0;

init();

// One page load or refresh
function init() {

  fetch(`${host}`)
  .then(response => response.json())
  .then(gameData => {
    playerName = gameData.player.name;
    currentScore = gameData.score;
    $('.playerName').text(gameData.player.name);
    setGameInfo(gameData);
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
    $('#modalMessageMain').text(`${messageOne}`);
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

// Roll the Dice
$('#roll').on('click', function() {

  fetch(`${host}/?action=play`)
  .then(response => response.json())
  .then(gameData => {

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

    currentScore = gameData.score;
  
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

// ******** BUTTON EVENT LISTENERS ******** //

// End game
$('#modalBtnTwo').on('click', function() {
  fetch(`${host}/?action=end`)
  .then(() => {
    $('body').fadeOut('slow', function() {
      location.href='/vegas-dice-game/index.html';
    });
  });
});

$('#cashOut').on('click', function() {

  setModalInfo('Are you sure you want to cash out?', `Your total credits are ${currentScore}`, 'Cash Out');

  $('#modal').modal({
    show: true,
    keyboard: false,
    backdrop: 'static'
  });

});