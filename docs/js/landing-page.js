let homePath = '/vegas-dice-game/'; // GitHub Pages

// Local path for testing and development
homePath = '/';

$('#startBtn').on('click', function() {
  $('body').fadeOut('slow', function() {
    location.href=homePath + 'game';
  });
});