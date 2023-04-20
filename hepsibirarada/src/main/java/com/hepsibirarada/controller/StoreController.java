package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hepsibirarada.model.Store;
import com.hepsibirarada.repository.StoreRepository;
import com.hepsibirarada.util.AccountAuthenticationUtil;
import com.hepsibirarada.util.RequestProcessingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class StoreController {

    @Autowired
    StoreRepository storeRepository;
    AccountAuthenticationUtil accountAuthenticationUtil = new AccountAuthenticationUtil();
    RequestProcessingUtil requestProcessingUtil = new RequestProcessingUtil();

    StoreController(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/stores/{username}")
    Store getOne(@PathVariable String username) {
        Store store = storeRepository.findByUsername(username);

        return store;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/stores")
    List<Store> getAll() {
        return storeRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/stores")
    Store newStore(@RequestBody String body) throws JsonProcessingException {
        Map<String, String> parsedJSON = requestProcessingUtil.parseJSON(body);

        Store store = new Store(parsedJSON.get("username"), parsedJSON.get("email"),
                accountAuthenticationUtil.encryptPassword(parsedJSON.get("password")));

        if (storeRepository.findByUsername(store.getUsername()) == null) {
            return storeRepository.save(store);
        }
        return store;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/stores/{username}")
    Store updateStore(@PathVariable String username, @RequestBody String body) throws JsonProcessingException {
        Map<String, String> parsedJSON = requestProcessingUtil.parseJSON(body);

        Store store = new Store(parsedJSON.get("username"), parsedJSON.get("email"),
                accountAuthenticationUtil.encryptPassword(parsedJSON.get("password")));

        if (storeRepository.findByUsername(username) != null) {
            store.setId(storeRepository.findByUsername(username).getId());
            return storeRepository.save(store);
        }
        return store;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/stores/{username}")
    Store deleteStore(@PathVariable String username) {
        return storeRepository.deleteByUsername(username);
    }
}
