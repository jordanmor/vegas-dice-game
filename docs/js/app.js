// For testing and development
const localHost = 'http://localhost:8080';
// For production and deployment
const herokuHost = 'https://vegas-dice-game.herokuapp.com';
const host = localHost;

const rolls = ['roll-one', 'roll-two', 'roll-three', 'roll-four', 'roll-five', 'roll-six'];

const dieOne = document.getElementById('dieOne');
const dieTwo = document.getElementById('dieTwo');
const animationDuration = 2500;

const setPlayerName = (messageOne, messageTwo, buttonText) => {
  fetch(`${host}/latest-player-number`)
  .then(response => response.json())
  .then(latestPlayerNumber => {
    const currentPlayerNumber = latestPlayerNumber + 1;
    $('.playerName').text(`Player${currentPlayerNumber}`);
    $('#modalMessageMain').text(`${messageOne} ${currentPlayerNumber}!`);
    $('#modalMessageSecondary').text(messageTwo);
    $('#modalBtn').text(buttonText);
    // Start modal on page load after player number fetched
    $('#modal').modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  });
}

setPlayerName('Welcome Player', 'Get ready to crush it playing Vegas Dice!', 'Start Game');

fetch(`${host}/highest-scores`)
  .then(response => response.json())
  .then(players => {
    html = '';
    for(let player of players) {
      html += `<tr><td>${player.name}</td><td>${player.highScore}</td></tr>`;
      console.log(player);
    }
    $('#highScores').html(html);
});

$('#roll').on('click', function() {

  fetch(`${host}/play`)
  .then(response => response.json())
  .then(data => {
    console.log(data);

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
    $('.die-one').addClass(rolls[data.dieOne - 1]);
  
    $('.die-two').removeClass(function(i, className) {
      return className.match(regex);
    });
    
    // restart animation by triggering reflow
    void dieTwo.offsetWidth;
    $('.die-two').addClass(rolls[data.dieTwo - 1]);
  
    // setTimeout ensures button cannot be pressed again until animation sequence ends
    window.setTimeout(() => {
      $(this).css({ 
        "pointer-events":"auto",
        "cursor":"pointer"
      });
      // Game info also updates after the dice stop rolling
      $('#credits').text(data.score);
      $('#point').text(data.point);
      if(data.message != null) {
        $('#playerMessage').text(data.message);
      } else {
        $('#playerMessage').text('Roll!');
      }
    }, animationDuration);
  });
});

$('#cashOut').on('click', function() {

setPlayerName('Thanks for playing Player ', 'Would you like to play again?', 'Play Again');

$('#modal').modal({
  show: true,
  keyboard: false,
  backdrop: 'static'
});

fetch(`${host}/play?action=end`)
  .then(() => {
    fetch(`${host}/latest-player-number`)
    .then(response => response.json())
    .then(latestPlayerNumber => {
      const currentPlayerNumber = latestPlayerNumber + 1;
      $('.playerName').text(`Player${currentPlayerNumber}`);
    })
  });
});