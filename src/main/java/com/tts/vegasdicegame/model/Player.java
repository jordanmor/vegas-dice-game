package com.tts.vegasdicegame.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private long id;

    @Column(name = "player_number")
    private int playerNumber;

    private String name;

    @Column(name = "high_score")
    private int highScore;

    public Player(int playerNumber, String name) {
        this.playerNumber = playerNumber;
        this.name = name;
    }
}
