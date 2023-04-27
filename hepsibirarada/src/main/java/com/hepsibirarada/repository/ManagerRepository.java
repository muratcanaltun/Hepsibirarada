package com.hepsibirarada.repository;

import com.hepsibirarada.model.Manager;
import org.springframework.data.mongodb.repository.*;

public interface ManagerRepository extends MongoRepository<Manager, String> {
    @Query("{username:'?0'}")
   Manager findByUsername(String username);

    @DeleteQuery("{username:'?0'}")
    Manager deleteByUsername(String username);
}
