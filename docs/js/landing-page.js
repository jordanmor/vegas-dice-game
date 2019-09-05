$('#startBtn').on('click', function() {
  $('body').fadeOut('slow', function() {
    location.href='/vegas-dice-game/game.html';
  });
});