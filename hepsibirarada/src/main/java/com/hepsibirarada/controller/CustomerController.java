package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hepsibirarada.model.Customer;
import com.hepsibirarada.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/customers/{username}")
    Customer getOne(@PathVariable String username) {
        return customerRepository.findByUsername(username);
    }

    @GetMapping("/customers")
    List<Customer> getAll() {
        return customerRepository.findAll();
    }

    @PostMapping("/customers")
    Customer newCustomer(@RequestBody String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> parsedJSON = objectMapper.readValue(body, Map.class);

        Customer customer = new Customer(parsedJSON.get("username"), parsedJSON.get("email"), parsedJSON.get("password"));

        if (customerRepository.findByUsername(customer.getUsername()) == null) {
            return customerRepository.save(customer);
        }
        return customer;
    }

    @PutMapping("/customers/{username}")
    Customer updateCustomer(@PathVariable String username, @RequestBody String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> parsedJSON = objectMapper.readValue(body, Map.class);

        Customer customer;

        if (customerRepository.findByUsername(username) != null) {
            customer = new Customer(parsedJSON.get("username"), parsedJSON.get("email"), parsedJSON.get("password"));
            customer.setId(customerRepository.findByUsername(username).getId());
            return customerRepository.save(customer);
        }
        return new Customer(parsedJSON.get("username"), parsedJSON.get("email"), parsedJSON.get("password"));
    }

    @DeleteMapping("/customers/{username}")
    Customer deleteCustomer(@PathVariable String username) {
        return customerRepository.deleteByUsername(username);
    }
}
