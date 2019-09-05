const rolls = ['roll-one', 'roll-two', 'roll-three', 'roll-four', 'roll-five', 'roll-six'];
const dieOne = document.getElementById('dieOne');
const dieTwo = document.getElementById('dieTwo');
const animationDuration = 2300;
let playerName = 'Player';
let currentScore = 0;

init();

// One page load or refresh
function init() {

  // Add SVG die faces to cubes
  populateCubeFaces();

  fetch(`${host}`)
  .then(response => response.json())
  .then(gameData => {
    playerName = gameData.player.name;
    currentScore = gameData.score;
    $('.playerName').text(gameData.player.name);
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

function populateCubeFaces() {
  $('.side.one').html(dieFaceSvgs.faceOne);
  $('.side.two').html(dieFaceSvgs.faceTwo);
  $('.side.three').html(dieFaceSvgs.faceThree);
  $('.side.four').html(dieFaceSvgs.faceFour);
  $('.side.five').html(dieFaceSvgs.faceFive);
  $('.side.six').html(dieFaceSvgs.faceSix);
}

// Roll the Dice
$('#roll').on('click', function() {

  $('#playerMessage').removeClass('animate-message');

  fetch(`${host}/?action=play`)
  .then(response => response.json())
  .then(gameData => {

    console.log(gameData);

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
      $('#playerMessage').addClass('animate-message');
    }, animationDuration);
  });
});

// ******** BUTTON EVENT LISTENERS ******** //

// End game
$('#modalBtnTwo').on('click', function() {
  fetch(`${host}/?action=end`)
  .then(() => {
    $('body').fadeOut('slow', function() {
      location.href=homePath;
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