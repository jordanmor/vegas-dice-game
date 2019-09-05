$('#startBtn').on('click', function() {
  $('body').fadeOut('slow', function() {
    location.href=`${homePath}game.html`;
  });
});