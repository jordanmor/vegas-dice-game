package com.tts.vegasdicegame.service;

import com.tts.vegasdicegame.model.Player;
import com.tts.vegasdicegame.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {
    private static final int LIMIT = 10;

    @Autowired
    PlayerRepository playerRepository;

    public List<Player> findPlayersWithHighestScores() {
        return playerRepository.findAllByOrderByHighScoreDesc()
                .stream()
                .limit(LIMIT)
                .collect(Collectors.toList());
    }

    public List<Player> findAll() {
        return playerRepository.findAll();
    }
}
