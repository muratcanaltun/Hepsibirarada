package com.hepsibirarada.repository;

import com.hepsibirarada.model.Customer;
import org.springframework.data.mongodb.repository.*;

public interface CustomerRepository extends MongoRepository<Customer, String> {
    @Query("{username:'?0'}")
    Customer findByUsername(String username);

    @DeleteQuery("{username:'?0'}")
    Customer deleteByUsername(String username);
}
