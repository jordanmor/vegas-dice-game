package com.tts.vegasdicegame.controller;

import com.tts.vegasdicegame.model.GameResponse;
import com.tts.vegasdicegame.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping(value = "/")
    public String playGame() {
        return "Welcome";
    }

    @GetMapping(value = "/play")
    public GameResponse playGameWithQuery(@RequestParam(required = false) String action) {
        gameService.playGame(action);
        if(action != null  && action.equals("end")) {
            return null;
        }
        return gameService.getGameResponse();
    }

}
