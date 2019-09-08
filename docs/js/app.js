let host = 'https://vegas-dice-game.herokuapp.com'; // Heroku
let homePath = '/vegas-dice-game/'; // GitHub Pages

// Local host and path for testing and development
// host = 'http://localhost:8080';
// homePath = '/';

const rolls = ['roll-one', 'roll-two', 'roll-three', 'roll-four', 'roll-five', 'roll-six'];
const dieOne = document.getElementById('dieOne');
const dieTwo = document.getElementById('dieTwo');
const animationDuration = 2300;
const soundIcon = document.getElementById('soundIcon');
let playerName = 'Player';
let currentScore = 0;
let point = 0;
let betAmount = 0;
let changedBetAmount = betAmount;
let muted = false;

// Collection of SVG die faces
const dieFaceSvgs = {
  faceOne: `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 557 557">
              <circle cx="278" cy="278" r="70"/>
             </svg>`,
  faceTwo: `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 557 557">
              <circle cx="439.975" cy="439.974" r="70"/>
              <circle cx="117.026" cy="117.026" r="70"/>
            </svg>`,
  faceThree: `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 557 557">
                <path fill="none" stroke="#000" stroke-dasharray="0,228.4" stroke-linecap="round" stroke-width="140" d="M117 440l325-325"/>
              </svg>`,
  faceFour: `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 557 557">
                <path fill-rule="nonzero" stroke="#000" stroke-dasharray="0,323" stroke-linecap="round" stroke-width="140" d="M117 117v325m323-2V115"/>
             </svg>`,
  faceFive: `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 557 557">
                <path fill-rule="nonzero" stroke="#000" stroke-dasharray="0,228.4" stroke-linecap="round" stroke-width="140" d="M440 440L115 115m2 325l325-325"/>
             </svg>`,
  faceSix: `<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 557 557">
              <path fill-rule="nonzero" stroke="#000" stroke-dasharray="0,161.5" stroke-linecap="round" stroke-width="140" d="M117 117v325m323-2V115"/>
            </svg>`
};

// Initialize app on page load or refresh
init();

/* ==========-==========-==========-========== //
           ******** FUNCTIONS ********
// ==========-==========-==========-========== */

// Initializes app on page load or refresh
function init() {

  // grab muted value from local storage on page load or refresh
  if (localStorage.getItem("muted") !== null) {
    muted = JSON.parse(localStorage.getItem('muted'));
  }

  // Determine whether user set mute by default
  if(muted) {
    soundIcon.src = '/img/mute-icon.png';
  } else {
    soundIcon.src = '/img/sound-icon.png';
  }

  // Add SVG die faces to cubes
  populateCubeFaces();

  fetch(`${host}/game`)
  .then(response => response.json())
  .then(gameData => {
    playerName = gameData.player.name;
    currentScore = gameData.score;
    point = gameData.point;
    betAmount = gameData.bet;
    $('#bet').text(betAmount);
    $('#credits').text(currentScore);
    $('.playerName').text(gameData.player.name);
    $('#changeBet').hide();

    // If the page refreshes when the player's credits have already gone to 0,
    // reopen the modal that gives player a choice to leave the game or start a new one.
    if(gameData.score === 0) {

      setModalInfo('You are out of credits', 'Would you like to play a new game?', 'New Game', 'Leave Game');
  
      $('#modal').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
      });
    }
  });

  // Fetch and populate the page with the top ten players scores
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

function setModalInfo (messageOne, messageTwo, buttonTextOne, buttonTextTwo) {
    $('#modalMessageMain').text(`${messageOne}`);
    $('#modalMessageSecondary').text(messageTwo);
    $('#modalBtnOne').text(buttonTextOne);
    $('#modalBtnTwo').text(buttonTextTwo);
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

/* ==========-==========-==========-========== //
        ******** EVENT LISTENERS ********
// ==========-==========-==========-========== */

// ROLL THE DICE
$('#roll').on('click', function() {

  const previousScore = currentScore;

  if(!muted) {
    $('audio#diceRollSound')[0].play();
  }

  $('#playerMessage, #credits, #point').removeClass('animate-data-change');

  fetch(`${host}/game?action=play`)
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
      // Animate message that alerts player to roll result
      $('#playerMessage').addClass('animate-data-change');

      // Audio for losing roll
      if(!muted) {
        if(gameData.message !== null && gameData.message.includes('You Lost')) {
          $('audio#crowdOh')[0].play();
          // Audio for winning roll
        } else if(gameData.message !== null && gameData.message.includes('You Won')) {
          $('audio#cheers')[0].play();
        }
      }

      // On a losing roll, if player credits are less than bet amount, match bet amount to player credits
      if(gameData.message !== null && gameData.message.includes('You Lost') && betAmount > currentScore) {
        betAmount = currentScore;
        // Update server side logic with new bet amount
        fetch(`${host}/change-bet?bet=${betAmount}`);
        $('#bet').text(betAmount);
      }

      // Animate score if there is a change
      if(currentScore !== previousScore) {
        $('#credits').addClass('animate-data-change');
      }

      // When player is out of credits, show modal for game exit or new game
      if(gameData.score === 0) {

        setModalInfo('You are out of credits', 'Would you like to play a new game?', 'New Game', 'Leave Game');

        $('#modal').modal({
          show: true,
          keyboard: false,
          backdrop: 'static'
        });
      }

      // Animate point when it is first set
      if(point !== gameData.point && gameData.point !== 0) {
        $('#point').addClass('animate-data-change');
        point = gameData.point;
      }
    }, animationDuration); // <-- END OF SET TIMEOUT -->
  });
});

// ***** BUTTON EVENT LISTENERS ***** //

// Start New Game
$('#modalBtnOne').on('click', function() {
  if(this.textContent === 'New Game') {
    fetch(`${host}/game?action=end`)
    .then(() => {
      $('body').fadeOut('slow', function() {
        location.href=homePath + 'game';
      });
    });
  }
  $('#changeBet').hide();
});

// When clicked, modal button two will either... 
// Set the bet amount on the backend or... 
// End the game
$('#modalBtnTwo').on('click', function() {
  if(this.textContent === 'Change Bet') {
    $('#changeBet').hide();
    // Update server side logic with new bet amount
    fetch(`${host}/change-bet?bet=${changedBetAmount}`);
    $('#bet').text(changedBetAmount);
    betAmount = changedBetAmount;
    // End game
  } else {
    fetch(`${host}/game?action=end`)
    .then(() => {
      $('body').fadeOut('slow', function() {
        location.href=homePath;
      });
    });
  }
});

// Populate and display modal when player clicks the Cash Out button
$('#cashOut').on('click', function() {

  if(!muted) {
    $('audio#cashRegister')[0].play();
  }

  setModalInfo('Are you sure you want to cash out?', `Your total credits are ${currentScore}`, 'Continue Game','Cash Out');

  $('#modal').modal({
    show: true,
    keyboard: false,
    backdrop: 'static'
  });
});

// Open Modal with a change bet option
$('#openBetModal').on('click', function() {
  const betHighRange = currentScore > 100 ? 100 : currentScore;
  setModalInfo('Change Bet Amount', `Bet can be from 10 to ${betHighRange} credits`, 'Go Back','Change Bet');

  $('#changeBet').show();

  changedBetAmount = betAmount;
  $('.amount').text(changedBetAmount);

  $('#modal').modal({
    show: true,
    keyboard: false,
    backdrop: 'static'
  }); 

  if(!muted) {
    $('audio#pop')[0].play();
  }
});

// Change Bet Amount on front end
$('#changeBet').on('click', function(e) {
  if($(e.target).hasClass('plus')) {
    // A bet can range from 10 to 100 credits, unless a player has less than 100 credits, 
    // in which case, a bet can range from 10 credits to the player's total credits
    if(changedBetAmount < currentScore && changedBetAmount < 100) {
      changedBetAmount += 10;
      $('.amount').text(changedBetAmount);
    }
  } else if ($(e.target).hasClass('minus'))
    if(changedBetAmount > 10) {
      changedBetAmount -= 10;
      $('.amount').text(changedBetAmount);
    }
});

// Sound / Mute toggle button
$('#soundBtn').on('click', function() {
  if(soundIcon.src.includes('sound')) {
    soundIcon.src = '/img/mute-icon.png';
    muted = true;
    localStorage.setItem('muted', 'true');
  } else {
    soundIcon.src = '/img/sound-icon.png';
    muted = false;
    localStorage.setItem('muted', 'false');
  }
});