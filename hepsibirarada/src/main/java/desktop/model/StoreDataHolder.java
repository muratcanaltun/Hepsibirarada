package desktop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.HashMap;

@JsonIgnoreProperties
public class StoreDataHolder {
    @JsonProperty("id")
    public String id;

    @JsonProperty("username")
    public String username;

    @JsonProperty("email")
    public String email;

    @JsonProperty("password")
    public String password;

    @JsonProperty("suspended")
    public String suspended;

    @JsonProperty("accepted")
    public String accepted;

    @JsonProperty("products")
    public ArrayList<String> products;
}
