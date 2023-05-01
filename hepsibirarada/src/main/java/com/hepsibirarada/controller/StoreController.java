package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hepsibirarada.model.Product;
import com.hepsibirarada.model.Store;
import com.hepsibirarada.repository.ProductRepository;
import com.hepsibirarada.repository.StoreRepository;
import com.hepsibirarada.util.AccountAuthenticationUtil;
import com.hepsibirarada.util.RequestProcessingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class StoreController {

    @Autowired
    StoreRepository storeRepository;
    @Autowired
    ProductRepository productRepository;
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
        Store store = storeRepository.findByUsername(username);
        deleteAllProductsFromStore(store.getProducts());

        return storeRepository.deleteByUsername(username);
    }

    void deleteAllProductsFromStore(List<String> products) {
        for (String product : products) {
            productRepository.deleteByID(product);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/suspendStore/{username}")
    Store suspendStore(@PathVariable String username) {
        Store store = storeRepository.findByUsername(username);

        if (store != null) {
            store.setSuspended(true);
            return storeRepository.save(store);
        }
        return store;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/unsuspendStore/{username}")
    Store unsuspendStore(@PathVariable String username) {
        Store store = storeRepository.findByUsername(username);

        if (store != null) {
            store.setSuspended(false);
            return storeRepository.save(store);
        }
        return store;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/acceptStore/{username}")
    Store acceptStore(@PathVariable String username) {
        Store store = storeRepository.findByUsername(username);

        if (store != null) {
            store.setAccepted(true);
            return storeRepository.save(store);
        }
        return store;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/rejectStore/{username}")
    Store rejectStore(@PathVariable String username) {
        Store store = storeRepository.findByUsername(username);

        if (store != null) {
            store.setAccepted(false);
            return storeRepository.save(store);
        }
        return store;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/availableStores")
    List<Store> getAllAvailable() {
        return storeRepository.findAvailable();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/suspendedStores")
    List<Store> getAllSuspended() {
        return storeRepository.findAllSuspended();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/rejectedStores")
    List<Store> getAllRejected() {
        return storeRepository.findAllNotAccepted();
    }
}
