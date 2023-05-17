package desktop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties
public class RatingDataHolder {
    @JsonProperty("commenterUsername")
    public String commenterUsername;

    @JsonProperty("rating")
    public double rating;

    @JsonProperty("comment")
    public String comment;
}
