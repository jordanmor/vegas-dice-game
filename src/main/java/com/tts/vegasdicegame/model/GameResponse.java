package com.tts.vegasdicegame.model;

import lombok.Data;

@Data
public class GameResponse {

    private int dieOne;
    private int dieTwo;
    private int sum;
    private int point;
    private int score;
    private boolean newGame;
    private boolean newTurn;
    private String message;

    public GameResponse() {
        newGame = true;
        score = 100;
    }
}
