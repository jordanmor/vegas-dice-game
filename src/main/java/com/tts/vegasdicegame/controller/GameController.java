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

    @CrossOrigin
    @GetMapping(value = "/")
    public GameResponse playGame(@RequestParam(required = false) String action) {
        return gameService.playGame(action);
    }

}
