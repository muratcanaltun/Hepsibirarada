package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hepsibirarada.model.Customer;
import com.hepsibirarada.repository.CustomerRepository;
import com.hepsibirarada.util.AccountAuthenticationUtil;
import com.hepsibirarada.util.RequestProcessingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@RestController
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;
    AccountAuthenticationUtil accountAuthenticationUtil = new AccountAuthenticationUtil();
    RequestProcessingUtil requestProcessingUtil = new RequestProcessingUtil();

    CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/customers/{username}")
    Customer getOne(@PathVariable String username) {
        return customerRepository.findByUsername(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/customers")
    List<Customer> getAll() {
        return customerRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/customers")
    Customer newCustomer(@RequestBody String body) throws JsonProcessingException {
        Map<String, String> parsedJSON = requestProcessingUtil.parseJSON(body);

        Customer customer = new Customer(parsedJSON.get("username"), parsedJSON.get("email"),
                accountAuthenticationUtil.encryptPassword(parsedJSON.get("password")));

        if (customerRepository.findByUsername(customer.getUsername()) == null) {
            return customerRepository.save(customer);
        }
        return customer;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/customers/{username}")
    Customer updateCustomer(@PathVariable String username, @RequestBody String body) throws JsonProcessingException {
        Map<String, String> parsedJSON = requestProcessingUtil.parseJSON(body);

        Customer customer = new Customer(parsedJSON.get("username"), parsedJSON.get("email"),
                accountAuthenticationUtil.encryptPassword(parsedJSON.get("password")));

        if (customerRepository.findByUsername(username) != null) {
            customer.setId(customerRepository.findByUsername(username).getId());
            return customerRepository.save(customer);
        }
        return customer;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/customers/{username}")
    Customer deleteCustomer(@PathVariable String username) {
        return customerRepository.deleteByUsername(username);
    }
}
