package desktop.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import desktop.model.ProductDataHolder;

import java.util.ArrayList;
import java.util.Map;

public class RequestProcessingUtil {
    public Map<String, String> parseJSON(String JSONString) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(JSONString, Map.class);
    }

    public ArrayList<ProductDataHolder> parseProductArray(String JSONString) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(JSONString, new TypeReference<ArrayList<ProductDataHolder>>() {});
    }

    public Map<String, Object> parseJSONTypeFree(String JSONString) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(JSONString, Map.class);
    }

    public String checkIfFieldIsEmpty(String JSONData, String DBData) {
        if (JSONData == null) {
            return DBData;
        }

        return JSONData;
    }

    public double checkIfFieldIsEmpty(String JSONData, double DBData) {
        if (JSONData == null) {
            return DBData;
        }

        return Double.parseDouble(JSONData);
    }

    public int checkIfFieldIsEmpty(String JSONData, int DBData) {
        if (JSONData == null) {
            return DBData;
        }

        return Integer.parseInt(JSONData);
    }
}
