const rolls = ['roll-one', 'roll-two', 'roll-three', 'roll-four', 'roll-five', 'roll-six'];

const dieOne = document.getElementById('dieOne');
const dieTwo = document.getElementById('dieTwo');
const animationDuration = 2500;

$('#roll').on('click', function() {
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
  $('.die-one').addClass(rolls[Math.floor(Math.random() * 6)]);

  $('.die-two').removeClass(function(i, className) {
    return className.match(regex);
  });
  
  // restart animation by triggering reflow
  void dieTwo.offsetWidth;
  $('.die-two').addClass(rolls[Math.floor(Math.random() * 6)]);

  // setTimeout ensures button cannot be pressed again until animation sequence ends
  window.setTimeout(() => {
    $(this).css({ 
      "pointer-events":"auto",
      "cursor":"pointer"
    });
  }, animationDuration);
});