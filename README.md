## Vegas Dice Game | [Live Demo](https://jordanmor.github.io/vegas-dice-game/)

**Screencast of the Tech Talent Select Midpoint Project - up for review by The Hartford**  
 
![Vegas Dice Game Screen Cast](vegas-dice-game-screencast.gif) 

### My Personal Project Goals
- Use this project as an opportunity to utilize Spring Boot by building a REST API that that interacts with the front end via http requests and responses.
- Persist highest player scores with an online mySQL database utilizing Spring Data JPA for db interaction
- Write game logic in Java following OOP concepts
- Build an interactive front end using responsive web design, jQuery, Bootstrap, CSS3 and HTML
- Animate dice using CSS 3D animations and jQuery.
- Host Spring Boot RESTful app on Heroku. Make front-end application available at a public URL using GitHub pages.
- Produce an MVP by project due date.

**Project Assigned:** 08/30/2019  
**Project Due:** 09/06/2019

### Original Project Instructions
Given the following rules for the game of dice, create a Java program that prints out whether you won or lost on each roll.
- The player rolls two 6-sided dice to generate a random number between 1 and 6.
- Rolling 7 or 11 on the first try is a WIN
- Rolling 2, 3 or 12 on the first try is a LOSE
- Any other roll on the first try becomes the player's POINT
- If a player rolled POINT, the player continues to roll until one of two things happens:
- If a player has POINT and rolls the POINT again, it is a WIN
- If a player has POINT and rolls 7, it is a LOST
