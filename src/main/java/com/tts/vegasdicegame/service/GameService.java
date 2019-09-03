package com.tts.vegasdicegame.service;

import com.tts.vegasdicegame.model.GameResponse;
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

    public GameResponse playGame() {
        if(gameResponse.isNewGame()) {
            startNewGame();
        }

        if(gameResponse.isNewTurn()) {
            gameResponse.setMessage(null);
            roll();
            gamePoint = gameResponse.getPoint();
            if (WINS.contains(gameResponse.getPoint())) {
                gameResponse.setNewGame(true);
                gameResponse.setMessage("You Won!");
                return gameResponse;
            } else if (LOSES.contains(gameResponse.getPoint())) {
                gameResponse.setNewGame(true);
                gameResponse.setMessage("You Lost. Try again.");
                return gameResponse;
            }
        } else {
                roll();
                if (gameResponse.getPoint() == gamePoint) {
                    gameResponse.setNewGame(true);
                    gameResponse.setMessage("You Won!");
                    return gameResponse;
                } else if (gameResponse.getPoint() == 7) {
                    gameResponse.setNewGame(true);
                    gameResponse.setMessage("You Lost. Try again.");
                    return gameResponse;
                }
            }
            gameResponse.setNewGame(false);
            return gameResponse;
    }

    private void startNewGame() {
        gameResponse.setNewGame(false);
        gameResponse.setPlayerName("Player" + (playerService.findLatestPlayerNumber() + 1));
        gameResponse.setMessage(null);
    }

    public GameResponse getGameResponse() {
        return gameResponse;
    }
}
