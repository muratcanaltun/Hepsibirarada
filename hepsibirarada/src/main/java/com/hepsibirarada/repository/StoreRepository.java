package com.hepsibirarada.repository;

import com.hepsibirarada.model.Store;
import org.springframework.data.mongodb.repository.*;

import java.util.List;

public interface StoreRepository extends MongoRepository<Store, String> {
    @Query("{username:'?0'}")
    Store findByUsername(String username);

    @DeleteQuery("{username:'?0'}")
    Store deleteByUsername(String username);

    @Query("{accepted:true, suspended:false}")
    List<Store> findAvailable();

    @Query("{suspended:true}")
    List<Store> findAllSuspended();

    @Query("{accepted:false}")
    List<Store> findAllNotAccepted();
}
