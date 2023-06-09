package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hepsibirarada.model.Order;
import com.hepsibirarada.repository.OrderRepository;
import com.hepsibirarada.util.RequestProcessingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class OrderController {
    @Autowired
    OrderRepository orderRepository;
    RequestProcessingUtil requestProcessingUtil = new RequestProcessingUtil();

    OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/orders")
    List<Order> getAll() {
        return orderRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/orders/{username}")
    List<Order> getAllFromUser(@PathVariable String username) {
        return orderRepository.findByCustomer(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/orders")
    Order newOrder(@RequestBody String body) throws JsonProcessingException {
        Map<String, Object> parsedJSON = requestProcessingUtil.parseJSONTypeFree(body);

        Order order = new Order((String) parsedJSON.get("customerUsername"), (String) parsedJSON.get("address"));
        order.setProducts((ArrayList<String>) parsedJSON.get("products"));

        return orderRepository.save(order);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/orders/{id}")
    Order updateOrder(@PathVariable String id, @RequestBody String body) throws JsonProcessingException {
        Map<String, Object> parsedJSON = requestProcessingUtil.parseJSONTypeFree(body);

        Order order = new Order((String) parsedJSON.get("customerUsername"), (String) parsedJSON.get("address"));
        order.setStatus((String) parsedJSON.get("status"));
        order.setProducts((ArrayList<String>) parsedJSON.get("products"));

        if (orderRepository.findByID(id) != null) {
            order.setId(id);
            return orderRepository.save(order);
        }

        return order;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/orders/{id}")
    Order deleteOrder(@PathVariable String id) {
        return orderRepository.deleteByID(id);
    }
}
