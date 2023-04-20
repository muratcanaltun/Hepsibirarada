package com.hepsibirarada.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document("orders")
public class Order {
    @Id
    private String id;
    private String customerUsername;
    private String storeUsername;
    private Date timestamp;
    private ArrayList<String> products;
    private String status;

    public Order(String customerUsername, String storeUsername) {
        super();
        this.customerUsername = customerUsername;
        this.storeUsername = storeUsername;
        this.timestamp = new Date();
        products = new ArrayList<>();
        this.status = "Ordered";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerUsername() {
        return customerUsername;
    }

    public void setCustomerUsername(String customerUsername) {
        this.customerUsername = customerUsername;
    }

    public String getStoreUsername() {
        return storeUsername;
    }

    public void setStoreUsername(String storeUsername) {
        this.storeUsername = storeUsername;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public ArrayList<String> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<String> products) {
        this.products = products;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
