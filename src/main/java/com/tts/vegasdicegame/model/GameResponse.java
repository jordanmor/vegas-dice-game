package com.tts.vegasdicegame.model;

public class GameResponse {

    private int dieOne;
    private int dieTwo;
    private int sum;
    private int point;
    private boolean newGame;
    private String message;

    public GameResponse() {
        newGame = true;
    }

    public int getDieOne() {
        return dieOne;
    }

    public void setDieOne(int dieOne) {
        this.dieOne = dieOne;
    }

    public int getDieTwo() {
        return dieTwo;
    }

    public void setDieTwo(int dieTwo) {
        this.dieTwo = dieTwo;
    }

    public int getSum() {
        return sum;
    }

    public void setSum(int sum) {
        this.sum = sum;
    }

    public int getPoint() {
        return point;
    }

    public void setPoint(int point) {
        this.point = point;
    }

    public boolean isNewGame() {
        return newGame;
    }

    public void setNewGame(boolean newGame) {
        this.newGame = newGame;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
