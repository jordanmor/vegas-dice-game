package com.tts.vegasdicegame.controller;

import com.tts.vegasdicegame.model.Player;
import com.tts.vegasdicegame.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping(value = "/")
    public String welcomeMessage() {
        return "Welcome to the Vegas Dice Game API!";
    }

    @GetMapping(value = "/players")
    public List<Player> getPlayers() {
        return playerService.findAll();
    }

    @GetMapping(value = "/highest-scores")
    public List<Player> getHighestScorePlayers() {
        return playerService.findPlayersWithHighestScores();
    }
}
