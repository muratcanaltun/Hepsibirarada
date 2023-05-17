package com.hepsibirarada.controller;

import com.hepsibirarada.model.Authenticator;
import com.hepsibirarada.repository.AuthenticatorRepository;
import desktop.util.RequestProcessingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
public class AuthenticatorController {
    @Autowired
    AuthenticatorRepository authenticatorRepository;
    RequestProcessingUtil requestProcessingUtil = new RequestProcessingUtil();

    AuthenticatorController(AuthenticatorRepository authenticatorRepository) {
        this.authenticatorRepository = authenticatorRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/2FA")
    List<Authenticator> getAll() {
        return authenticatorRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/2FACheck/{username}")
    boolean checkAuthenticationCode(@PathVariable String username, @RequestBody String body) {
        int[] realArray = authenticatorRepository.findByUsername(username).getCode();
        String temp = "";

        for (Integer integer : realArray) {
            temp += integer;
        }

        return body.equals(temp);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/2FATime/{username}")
    Date getTimeLimit(@PathVariable String username) {
        return authenticatorRepository.findByUsername(username).getTimeLimit();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/2FA")
    String createAuthenticationCode(@RequestBody String body) {
        Authenticator authenticator = authenticatorRepository.findByUsername(body);

        if (authenticator == null) {
            authenticator = new Authenticator(body);

            authenticatorRepository.save(authenticator);
            return "Successful";
        } else {
            Date date = new Date();

            if (date.after(authenticator.getTimeLimit())) {
                authenticatorRepository.deleteByUsername(body);
                authenticator = new Authenticator(body);

                authenticatorRepository.save(authenticator);
                return "Successful";
            }
        }

        return "Failed";
    }
}
