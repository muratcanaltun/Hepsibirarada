package com.hepsibirarada.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Document("customers")
public class Customer {
    @Id
    private String id;

    private String username;
    private String email;
    private String password;
    private HashMap<String, String> addresses;

    public Customer(String username, String email, String password) {
        super();
        this.username = username;
        this.email = email;
        this.password = password;
        this.addresses = new HashMap<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public HashMap<String, String> getAddresses() {
        return addresses;
    }

    public void setAddresses(HashMap<String, String> addresses) {
        this.addresses = addresses;
    }

    public void addAddress(String address, String title) {
        this.addresses.put(title, address);
    }
}
