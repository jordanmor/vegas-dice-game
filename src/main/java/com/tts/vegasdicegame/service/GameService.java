package com.tts.vegasdicegame.service;

import com.tts.vegasdicegame.model.GameResponse;
import com.tts.vegasdicegame.model.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class GameService {
    private static final List<Integer> WINS = Arrays.asList(7, 11);
    private static final List<Integer> LOSES = Arrays.asList(2, 3, 12);
    private GameResponse gameResponse = new GameResponse();
    int currentRoll;

    @Autowired
    private PlayerService playerService;

    public GameResponse playGame(String action) {

        if(gameResponse.isNewGame() == true) {
            startNewGame();
        }

        if(action != null && action.equals("play")) {
            return playNextRound();
        } else if(action != null && action.equals("end")) {
            return endGame();
        }

        return gameResponse;
    }

    public void changeBetAmount(int bet) {
        gameResponse.setBet(bet);
    }

    private void createNewPlayer() {
        int playerNumber = playerService.findLatestPlayerNumber() + 1;
        String playerName = "Player " + playerNumber;
        Player player = new Player(playerNumber, playerName);
        gameResponse.setPlayer(player);
    }

    private void startNewGame() {
        createNewPlayer();
        gameResponse.setMessage(null);
        gameResponse.setPoint(0);
        gameResponse.setScore(100);
        gameResponse.setDieOne(1);
        gameResponse.setDieTwo(1);
        gameResponse.setBet(10);
        gameResponse.setNewGame(false);
    }

    private GameResponse roll() {
        gameResponse.setDieOne((int) (Math.random() * 6) + 1);
        gameResponse.setDieTwo((int) (Math.random() * 6) + 1);
        currentRoll = gameResponse.getDieOne() + gameResponse.getDieTwo();
        return gameResponse;
    }

    private GameResponse playNextRound() {

        // Checks if point is set to determine if starting new round
        if(gameResponse.getPoint() == 0) {
            gameResponse.setMessage(null);
            roll();
            gameResponse.setPoint(currentRoll);
            if (WINS.contains(gameResponse.getPoint())) {
                completeRound(GameEnum.WON);
                return gameResponse;
            } else if (LOSES.contains(gameResponse.getPoint())) {
                completeRound(GameEnum.LOST);
                return gameResponse;
            }
        } else {
            roll();
            if (currentRoll == gameResponse.getPoint()) {
                completeRound(GameEnum.WON);
                return gameResponse;
            } else if (currentRoll == 7) {
                completeRound(GameEnum.LOST);
                return gameResponse;
            }
        }
        return gameResponse;
    }

    private void completeRound(GameEnum result) {
        gameResponse.setPoint(0);
        if(result == GameEnum.WON) {
            gameResponse.setScore(gameResponse.getScore() + gameResponse.getBet());
            gameResponse.setMessage("You Won!");
        } else if (result == GameEnum.LOST) {
            gameResponse.setScore(gameResponse.getScore() - gameResponse.getBet());
            // User's score reaches 0
            if(gameResponse.getScore() == 0) {
                gameResponse.setMessage("Game Over");
            } else {
                gameResponse.setMessage("You Lost. Try again.");
            }
        }
    }

    private GameResponse endGame() {
        // Players who end the game with a score of 0 are not saved in the db
        if(gameResponse.getScore() > 0) {
            gameResponse.getPlayer().setHighScore(gameResponse.getScore());
            playerService.save(gameResponse.getPlayer());
        }
        gameResponse.setNewGame(true);
        return gameResponse;
    }
}
