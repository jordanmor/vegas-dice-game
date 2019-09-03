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
    private int gamePoint;

    @Autowired
    private PlayerService playerService;

    private GameResponse roll() {
        gameResponse.setDieOne((int) (Math.random() * 6) + 1);
        gameResponse.setDieTwo((int) (Math.random() * 6) + 1);
        gameResponse.setSum(gameResponse.getDieOne() + gameResponse.getDieTwo());
        gameResponse.setPoint(gameResponse.getSum());
        return gameResponse;
    }

    public GameResponse playGame(String action) {
        // Take the following action if user ends game (cashes out)
        if(action != null && action.equals("end")) {
            int playerNumber = playerService.findLatestPlayerNumber() + 1;
            Player player = new Player(1, playerNumber, gameResponse.getPlayerName(), gameResponse.getScore());
            playerService.save(player);
            gameResponse.setNewGame(true);
            return null;
        }

        // User's score reaches 0
        if(gameResponse.getScore() == 0) {
            gameResponse.setMessage("Game Over");
            gameResponse.setNewGame(true);
            return gameResponse;
        }

        // New Game
        if(gameResponse.isNewGame()) {
            startNewGame();
        }

        // Checks if point is set to determine if starting new round
        if(gameResponse.getPoint() == 0) {
            gameResponse.setMessage(null);
            roll();
            gamePoint = gameResponse.getPoint();
            if (WINS.contains(gameResponse.getPoint())) {
                completeRound(GameEnum.WON);
                return gameResponse;
            } else if (LOSES.contains(gameResponse.getPoint())) {
                completeRound(GameEnum.LOST);
                return gameResponse;
            }
        } else {
                roll();
                if (gameResponse.getPoint() == gamePoint) {
                    completeRound(GameEnum.WON);
                    return gameResponse;
                } else if (gameResponse.getPoint() == 7) {
                    completeRound(GameEnum.LOST);
                    return gameResponse;
                }
            }
        return gameResponse;
    }

    private void startNewGame() {
        gameResponse.setNewGame(false);
        gameResponse.setPlayerName("Player" + (playerService.findLatestPlayerNumber() + 1));
        gameResponse.setMessage(null);
        gameResponse.setPoint(0);
        gameResponse.setScore(100);
    }

    private void completeRound(GameEnum result) {
        gameResponse.setPoint(0);
        if(result == GameEnum.WON) {
            gameResponse.setScore(gameResponse.getScore() + 10);
            gameResponse.setMessage("You Won!");
        } else if (result == GameEnum.LOST) {
            gameResponse.setScore(gameResponse.getScore() - 10);
            gameResponse.setMessage("You Lost. Try again.");
        }
    }

    public GameResponse getGameResponse() {
        return gameResponse;
    }
}
