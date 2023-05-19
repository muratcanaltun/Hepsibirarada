package desktop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Date;

@JsonIgnoreProperties
public class OrderDataHolder {
    @JsonProperty("id")
    public String id;

    @JsonProperty("customerUsername")
    public String customerUsername;

    @JsonProperty("address")
    public String address;

    @JsonProperty("timestamp")
    public Date timestamp;

    @JsonProperty("products")
    public ArrayList<String> products;

    @JsonProperty("status")
    public String status;


}
