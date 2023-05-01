package com.hepsibirarada.repository;

import com.hepsibirarada.model.Order;
import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    @Query("{id:'?0'}")
    Order findByID(String id);

    @DeleteQuery("{id:'?0'}")
    Order deleteByID(String id);
    @Query("{customerUsername:'?0'}")
    List<Order> findByCustomer(String username);
}
