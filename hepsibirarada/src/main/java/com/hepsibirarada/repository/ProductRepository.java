package com.hepsibirarada.repository;

import com.hepsibirarada.model.Product;
import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ProductRepository extends MongoRepository<Product, String> {
    @Query("{id:'?0'}")
    Product findByID(String id);

    @DeleteQuery("{id:'?0'}")
    Product deleteByID(String id);
}
