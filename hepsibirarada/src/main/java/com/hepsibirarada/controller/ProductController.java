package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hepsibirarada.model.Product;
import com.hepsibirarada.model.ProductRating;
import com.hepsibirarada.model.Store;
import com.hepsibirarada.repository.ProductRepository;
import com.hepsibirarada.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ProductController {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    StoreRepository storeRepository;

    ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/products/{id}")
    Product getOne(@PathVariable String id) {
        return productRepository.findByID(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/products")
    List<Product> getAll() {
        return productRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/products")
    Product newProduct(@RequestBody String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> parsedJSON = objectMapper.readValue(body, Map.class);

        Product product = new Product(parsedJSON.get("title"), Double.parseDouble(parsedJSON.get("price")),
                parsedJSON.get("description"),
                parsedJSON.get("category"), Integer.parseInt(parsedJSON.get("availableStocks")),
                parsedJSON.get("imageLink"));

        if (productRepository.findByID(product.getId()) == null) {
            product = productRepository.save(product);
            Store store = storeRepository.findByUsername(parsedJSON.get("store"));
            store.addProduct(product.getId());
            storeRepository.save(store);
        }

        return product;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/products/{id}")
    Product updateProduct(@PathVariable String id, @RequestBody String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> parsedJSON = objectMapper.readValue(body, Map.class);

        Product product = new Product(parsedJSON.get("title"), Double.parseDouble(parsedJSON.get("price")),
                parsedJSON.get("description"),
                parsedJSON.get("category"), Integer.parseInt(parsedJSON.get("availableStocks")),
                parsedJSON.get("imageLink"));

        if (productRepository.findByID(id) != null) {
            product.setId(productRepository.findByID(id).getId());
            return productRepository.save(product);
        }
        return product;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/products/{id}")
    Product deleteProduct(@PathVariable String id) {
        return productRepository.deleteByID(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/products/{id}")
    Product addRatingToProduct(@PathVariable String id, @RequestBody String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> parsedJSON = objectMapper.readValue(body, Map.class);

        Product product = productRepository.findByID(id);

        if (product != null) {
            product.addProductRating(new ProductRating(parsedJSON.get("commenterUsername"),
                    Double.parseDouble(parsedJSON.get("rating")), parsedJSON.get("comment")));
            return productRepository.save(product);
        }
        return product;
    }
}
