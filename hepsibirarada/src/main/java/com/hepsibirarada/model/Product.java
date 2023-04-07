package com.hepsibirarada.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("products")
public class Product {
    @Id
    private String id;
    private String title;
    private double price;
    private String description;
    private String category;
    private boolean stopSales;

    private int availableStocks;
    private String imageLink;
    private List<ProductRating> productRatings;

    public Product(String title, double price, String description,
                   String category, int availableStocks, String imageLink) {
        super();
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.availableStocks = availableStocks;
        this.imageLink = imageLink;
        stopSales = false;
        productRatings = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getCategory() {
        return category;
    }

    public int getAvailableStocks() {
        return availableStocks;
    }

    public void setAvailableStocks(int availableStocks) {
        this.availableStocks = availableStocks;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isStopSales() {
        return stopSales;
    }

    public void setStopSales(boolean stopSales) {
        this.stopSales = stopSales;
    }

    public void addProductRating(ProductRating productRating) {
        this.productRatings.add(productRating);
    }

    public void removeProductRating(ProductRating productRating) {
        this.productRatings.remove(productRating);
    }

    public List<ProductRating> getProductRatings() {
        return productRatings;
    }

    public void setProductRatings(List<ProductRating> productRatings) {
        this.productRatings = productRatings;
    }
}
