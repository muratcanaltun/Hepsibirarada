package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hepsibirarada.model.Manager;
import com.hepsibirarada.repository.ManagerRepository;
import com.hepsibirarada.util.AccountAuthenticationUtil;
import com.hepsibirarada.util.RequestProcessingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@RestController
public class ManagerController {

    @Autowired
    ManagerRepository managerRepository;
    AccountAuthenticationUtil accountAuthenticationUtil = new AccountAuthenticationUtil();
    RequestProcessingUtil requestProcessingUtil = new RequestProcessingUtil();

    ManagerController(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/managers/{username}")
    Manager getOne(@PathVariable String username) {
        return managerRepository.findByUsername(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/managers")
    List<Manager> getAll() {
        return managerRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/managers")
    Manager newManager(@RequestBody String body) throws JsonProcessingException {
        Map<String, String> parsedJSON = requestProcessingUtil.parseJSON(body);

        Manager manager = new Manager(parsedJSON.get("username"), parsedJSON.get("email"),
                accountAuthenticationUtil.encryptPassword(parsedJSON.get("password")));

        if (managerRepository.findByUsername(manager.getUsername()) == null) {
            return managerRepository.save(manager);
        }
        return manager;
    }
   
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/managers/{username}")
    Manager updateManager(@PathVariable String username, @RequestBody String body) throws JsonProcessingException {
        Map<String, String> parsedJSON = requestProcessingUtil.parseJSON(body);

        Manager manager = new Manager(parsedJSON.get("username"), parsedJSON.get("email"),
                accountAuthenticationUtil.encryptPassword(parsedJSON.get("password")));

        if (managerRepository.findByUsername(username) != null) {
            manager.setId(managerRepository.findByUsername(username).getId());
            return managerRepository.save(manager);
        }
        return manager;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/managers/{username}")
    Manager deleteManager(@PathVariable String username) {
        return managerRepository.deleteByUsername(username);
    }

   
}
