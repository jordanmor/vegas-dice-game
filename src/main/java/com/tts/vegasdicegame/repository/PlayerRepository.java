package com.tts.vegasdicegame.repository;

import com.tts.vegasdicegame.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findAllByOrderByHighScoreDesc();
    List<Player> findAllByOrderByPlayerNumberDesc();
}
