package desktop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

@JsonIgnoreProperties
public class ProductDataHolder {
    @JsonProperty("id")
    public String id;

    @JsonProperty("title")
    public String title;

    @JsonProperty("price")
    public double price;

    @JsonProperty("description")
    public String description;

    @JsonProperty("category")
    public String category;

    @JsonProperty("stopSales")
    public boolean stopSales;

    @JsonProperty("availableStocks")
    public int availableStocks;

    @JsonProperty("imageLink")
    public String imageLink;

    @JsonProperty("productRatings")
    public ArrayList<RatingDataHolder> ratings;
}
