package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hepsibirarada.model.Store;
import com.hepsibirarada.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class StoreController {

    @Autowired
    StoreRepository storeRepository;

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
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> parsedJSON = objectMapper.readValue(body, Map.class);

        Store store = new Store(parsedJSON.get("username"), parsedJSON.get("email"), parsedJSON.get("password"));

        if (storeRepository.findByUsername(store.getUsername()) == null) {
            return storeRepository.save(store);
        }
        return store;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/stores/{username}")
    Store updateStore(@PathVariable String username, @RequestBody String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> parsedJSON = objectMapper.readValue(body, Map.class);

        Store store;

        if (storeRepository.findByUsername(username) != null) {
            store = new Store(parsedJSON.get("username"), parsedJSON.get("email"), parsedJSON.get("password"));
            store.setId(storeRepository.findByUsername(username).getId());
            return storeRepository.save(store);
        }
        return new Store(parsedJSON.get("username"), parsedJSON.get("email"), parsedJSON.get("password"));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/stores/{username}")
    Store deleteStore(@PathVariable String username) {
        return storeRepository.deleteByUsername(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/stores/{username}")
    Store addProductToStore(@PathVariable String username, @RequestBody String body) {
        Store store = storeRepository.findByUsername(username);

        if (store != null) {
            store.addProduct(body);
            return storeRepository.save(store);
        }
        return store;
    }
}
