package com.tts.vegasdicegame.model;

import lombok.Builder;
import lombok.Data;

@Data
public class GameResponse {

    private String playerName;
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
