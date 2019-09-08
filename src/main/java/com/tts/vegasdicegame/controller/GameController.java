package com.tts.vegasdicegame.controller;

import com.tts.vegasdicegame.model.GameResponse;
import com.tts.vegasdicegame.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping
    public String welcomeResponse() {
        return "Welcome to the Vegas Dice Game API!";
    }

    @CrossOrigin
    @GetMapping(value = "/game")
    public GameResponse playGame(@RequestParam(required = false) String action) {
        return gameService.playGame(action);
    }

    // Setting a new bet amount is best served on a separate path,
    // since there is no need to return a gameResponse
    @CrossOrigin
    @GetMapping(value = "/change-bet")
    public void changeBetAmount(@RequestParam int bet) {
        gameService.changeBetAmount(bet);
    }

}
