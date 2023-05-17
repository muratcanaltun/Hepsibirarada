package com.hepsibirarada.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Random;

@Document("2FA")
public class Authenticator {
    @Id
    private String id;
    private String username;
    private Date timeLimit;
    private int[] code = new int[6];

    public Authenticator(String username) {
        super();

        Random random = new Random();
        this.username = username;
        this.timeLimit = new Date();
        timeLimit.setTime(timeLimit.getTime() + 120000);

        for (int i = 0; i < code.length; i++) {
            code[i] = random.nextInt(10);
        }
    }

    public String getUsername() {
        return username;
    }

    public int[] getCode() {
        return code;
    }

    public Date getTimeLimit() {
        return timeLimit;
    }
}
