package com.hepsibirarada.repository;

import com.hepsibirarada.model.Store;
import org.springframework.data.mongodb.repository.*;

public interface StoreRepository extends MongoRepository<Store, String> {
    @Query("{username:'?0'}")
    Store findByUsername(String username);

    @DeleteQuery("{username:'?0'}")
    Store deleteByUsername(String username);
}
