package com.tts.vegasdicegame.model;

import lombok.Data;

@Data
public class GameResponse {

    private Player player;
    private int dieOne;
    private int dieTwo;
    private int sum;
    private int point;
    private int score;
    private boolean newGame;
    private String message;

    public GameResponse() {
        newGame = true;
        score = 100;
        dieOne = 1;
        dieTwo = 1;
    }
}
