package com.hepsibirarada.repository;

import com.hepsibirarada.model.Product;
import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    @Query("{id:'?0'}")
    Product findByID(String id);

    @DeleteQuery("{id:'?0'}")
    Product deleteByID(String id);

    @Query("{stopSales:false}")
    List<Product> findAllAvailable();

    @Query("{stopSales:true}")
    List<Product> findAllSuspended();
}
