package com.tts.vegasdicegame.service;

import com.tts.vegasdicegame.model.GameResponse;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class GameService {
    private static final List<Integer> WINS = Arrays.asList(7, 11);
    private static final List<Integer> LOSES = Arrays.asList(2, 3, 12);
    private GameResponse gameResponse = new GameResponse();
    private int gamePoint;

    public GameResponse roll() {
        int die1 = (int) (Math.random() * 6) + 1;
        int die2 = (int) (Math.random() * 6) + 1;
        gameResponse.setDieOne(die1);
        gameResponse.setDieTwo(die2);
        int sum = gameResponse.getDieOne() + gameResponse.getDieTwo();
        gameResponse.setSum(sum);
        gameResponse.setPoint(gameResponse.getSum());
        System.out.println(gameResponse.getDieOne());
        return gameResponse;
    }

    public GameResponse playGame() {
        if(gameResponse.isNewGame()) {
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

    public GameResponse getGameResponse() {
        return gameResponse;
    }
}
