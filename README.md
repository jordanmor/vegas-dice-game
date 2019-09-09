## Vegas Dice Game | [Live Demo](https://jordanmor.github.io/vegas-dice-game/)

A craps game, implemented mixing Spring Boot, RESTful web services, and a jQuery front end to create a complete solution that is deployed on Heroku and GitHub pages.

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
**Project Due:** 09/09/2019  
**Project Completed:** 09/08/2019

**--NOTES FOR REVIEWER--**  
The following application was built with the express purpose of learning how to write business logic using Java, how to create a REST API using Spring Boot, 
how to integrate a mySQL database into the project, how to communicate with a REST API from a front end application via http requests and responses and how to deploy a Spring boot app on Heroku. 

If I were to create this app without these conditions, this app would be better served being built using a front end framework with state, 
such as React or Angular, and a simpler REST API whose only purpose is to store the players with the highest scores, with a minimal amount of calls to the server during game play.

### Original Project Instructions
Given the following rules for the game of dice, create a Java program that prints out whether you won or lost on each roll.
- The player rolls two 6-sided dice to generate a random number between 1 and 6.
- Rolling 7 or 11 on the first try is a WIN
- Rolling 2, 3 or 12 on the first try is a LOSE
- Any other roll on the first try becomes the player's POINT
- If a player rolled POINT, the player continues to roll until one of two things happens:
- If a player has POINT and rolls the POINT again, it is a WIN
- If a player has POINT and rolls 7, it is a LOST

### Installation Instructions
1. git clone https://github.com/jordanmor/vegas-dice-game.git
2. Open project in your IDE of choice, e.g., IntelliJ, Eclipse.
3. Choose the project SDK and wait for the IDE to sync the Maven project.
4. The data access sections use a MySQL database named `vegas_dice_game` running on localhost.
Go to the `application.properties` file in `src/main/resources`, comment out the JDBC URL, username and password 
for the Heroku connection and use the following properties for using the app with your local mySQL db
    ```
    spring.datasource.url=jdbc:mysql://localhost:3306/vegas_dice_game?useSSL=false&serverTimezone=UTC
    spring.datasource.username={YOUR MYSQL USERNAME}
    spring.datasource.password={YOUR MYSQL PASSWORD}
    ```
    The assumed username is root and no password is set.  
    **Note: Make sure mySQL is running on your local machine.**  
5. Run the application, which will run the REST API part of the app and connect to the local mySQL db
6. The front end of this application is located in the directory `docs/`
7. Open this part of the application with the source-code editor of your choice, e.g., VS Code, Atom, Sublime.
8. Go to the file `docs/js/app.js` and use the following url settings located at the top of the file:
    ```
    // Local host and path for testing and development
    host = 'http://localhost:8080';
    homePath = '/';
    ```
9. Now go to the file docs/js/landing-page.js and use the following url settings located at the top of the file:
    ```
    // Local path for testing and development
       homePath = '/';
    ```
 10. Open the `docs/index.html` in your browser of choice. It is recommended to launch a development local Server with a live reload feature such as the VS Code plugin Live Server.
  
