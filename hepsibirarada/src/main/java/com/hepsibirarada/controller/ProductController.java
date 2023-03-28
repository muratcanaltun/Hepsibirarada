package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hepsibirarada.model.Product;
import com.hepsibirarada.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/products/{id}")
    Product getOne(@PathVariable String id) {
        return productRepository.findByID(id);
    }

    @GetMapping("/products")
    List<Product> getAll() {
        return productRepository.findAll();
    }

    @PostMapping("/products")
    Product newProduct(@RequestBody String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> parsedJSON = objectMapper.readValue(body, Map.class);

        Product product = new Product(parsedJSON.get("name"), Double.parseDouble(parsedJSON.get("price")),
                parsedJSON.get("description"), parsedJSON.get("features"));

        if (productRepository.findByID(product.getId()) == null) {
            return productRepository.save(product);
        }
        return product;
    }

    @PutMapping("/products/{id}")
    Product updateProduct(@PathVariable String id, @RequestBody String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> parsedJSON = objectMapper.readValue(body, Map.class);

        Product product;

        if (productRepository.findByID(id) != null) {
            product = new Product(parsedJSON.get("name"), Double.parseDouble(parsedJSON.get("price")),
                    parsedJSON.get("description"), parsedJSON.get("features"));
            product.setId(productRepository.findByID(id).getId());
            return productRepository.save(product);
        }
        return new Product(parsedJSON.get("name"), Double.parseDouble(parsedJSON.get("price")),
                parsedJSON.get("description"), parsedJSON.get("features"));
    }

    @DeleteMapping("/products/{id}")
    Product deleteProduct(@PathVariable String id) {
        return productRepository.deleteByID(id);
    }
}
