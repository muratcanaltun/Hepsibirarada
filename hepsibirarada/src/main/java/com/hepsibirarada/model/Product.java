package com.hepsibirarada.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("products")
public class Product {
    @Id
    private String id;
    private String name;
    private double price;
    private String description;
    private String features;
    private boolean stopSales;

    public Product(String name, double price, String description, String features) {
        super();
        this.name = name;
        this.price = price;
        this.description = description;
        this.features = features;
        stopSales = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFeatures() {
        return features;
    }

    public void setFeatures(String features) {
        this.features = features;
    }

    public boolean isStopSales() {
        return stopSales;
    }

    public void setStopSales(boolean stopSales) {
        this.stopSales = stopSales;
    }
}
