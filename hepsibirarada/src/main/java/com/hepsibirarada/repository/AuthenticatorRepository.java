package com.hepsibirarada.repository;

import com.hepsibirarada.model.Authenticator;
import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface AuthenticatorRepository extends MongoRepository<Authenticator, String> {
    @Query("{username:'?0'}")
    Authenticator findByUsername(String username);

    @DeleteQuery("{username:'?0'}")
    Authenticator deleteByUsername(String username);
}
