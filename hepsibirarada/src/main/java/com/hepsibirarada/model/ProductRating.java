package com.hepsibirarada.model;

public class ProductRating {
    private String commenterUsername;
    private int rating;
    private String comment;

    public ProductRating(String commenterUsername, int rating, String comment) {
        this.commenterUsername = commenterUsername;
        this.rating = rating;
        this.comment = comment;
    }

    public String getCommenterUsername() {
        return commenterUsername;
    }

    public void setCommenterUsername(String commenterUsername) {
        this.commenterUsername = commenterUsername;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
