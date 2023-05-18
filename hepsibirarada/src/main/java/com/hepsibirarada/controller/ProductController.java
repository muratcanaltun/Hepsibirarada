package com.hepsibirarada.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hepsibirarada.model.Product;
import com.hepsibirarada.model.ProductRating;
import com.hepsibirarada.model.Store;
import com.hepsibirarada.repository.ProductRepository;
import com.hepsibirarada.repository.StoreRepository;
import com.hepsibirarada.util.RequestProcessingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class ProductController {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    StoreRepository storeRepository;
    RequestProcessingUtil requestProcessingUtil = new RequestProcessingUtil();

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
    @GetMapping("/productQuery/{query}")
    List<Product> getQuery(@PathVariable String query) {
        return productRepository.findByQuery(query);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/products")
    Product newProduct(@RequestBody String body) throws IOException {
        Map<String, String> parsedJSON = requestProcessingUtil.parseJSON(body);

        Product product = new Product(parsedJSON.get("title"), Double.parseDouble(parsedJSON.get("price")),
                parsedJSON.get("description"),
                parsedJSON.get("category"), Integer.parseInt(parsedJSON.get("availableStocks")),
                parsedJSON.get("imageLink"));
        Store store = storeRepository.findByUsername(parsedJSON.get("store"));

        if (productRepository.findByID(product.getId()) == null && store != null) {
            product = productRepository.save(product);
            store.addProduct(product.getId());
            storeRepository.save(store);
        }

        return product;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/products/{id}")
    Product updateProduct(@PathVariable String id, @RequestBody String body) throws JsonProcessingException {
        Map<String, String> parsedJSON = requestProcessingUtil.parseJSON(body);
        parsedJSON.put("id", id);

        Product product = requestProcessingUtil.initializeProductWithOptions(parsedJSON, productRepository);

        if (product != null) {
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
        Map<String, String> parsedJSON = requestProcessingUtil.parseJSON(body);

        Product product = productRepository.findByID(id);

        if (product != null) {
            product.addProductRating(new ProductRating(parsedJSON.get("commenterUsername"),
                    Integer.parseInt(parsedJSON.get("rating")), parsedJSON.get("comment")));
            return productRepository.save(product);
        }
        return product;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/suspendProduct/{id}")
    Product suspendProduct(@PathVariable String id) {
        Product product = productRepository.findByID(id);

        if (product != null) {
            product.setStopSales(true);
            return productRepository.save(product);
        }
        return product;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/unsuspendProduct/{id}")
    Product unsuspendProduct(@PathVariable String id) {
        Product product = productRepository.findByID(id);

        if (product != null) {
            product.setStopSales(false);
            return productRepository.save(product);
        }
        return product;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/availableProducts")
    List<Product> getAllAvailable() {
        return productRepository.findAllAvailable();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/suspendedProducts")
    List<Product> getAllSuspended() {
        return productRepository.findAllSuspended();
    }
}
