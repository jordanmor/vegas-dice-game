package com.tts.vegasdicegame.model;

import lombok.Data;

@Data
public class GameResponse {

    private Player player;
    private int dieOne;
    private int dieTwo;
    private int point;
    private int score;
    private int bet;
    private boolean newGame;
    private String message;

    public GameResponse() {
        newGame = true;
        dieOne = 1;
        dieTwo = 1;
        bet = 10;
    }
}
