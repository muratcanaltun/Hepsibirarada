package com.hepsibirarada.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hepsibirarada.model.Product;
import com.hepsibirarada.repository.ProductRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

public class RequestProcessingUtil {
    public Map<String, String> parseJSON(String JSONString) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(JSONString, Map.class);
    }

    public Map<String, Object> parseJSONTypeFree(String JSONString) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(JSONString, Map.class);
    }

    public Product initializeProductWithOptions(Map<String, String> productJSON, ProductRepository productRepository) {
        Product product = null;
        if (productRepository.findByID(productJSON.get("id")) != null) {
            product = productRepository.findByID(productJSON.get("id"));

            product.setTitle(checkIfFieldIsEmpty(productJSON.get("title"), product.getTitle()));
            product.setPrice(checkIfFieldIsEmpty(productJSON.get("price"), product.getPrice()));
            product.setDescription(checkIfFieldIsEmpty(productJSON.get("description"), product.getDescription()));
            product.setCategory(checkIfFieldIsEmpty(productJSON.get("category"), product.getCategory()));
            product.setAvailableStocks(checkIfFieldIsEmpty(productJSON.get("availableStocks"), product.getAvailableStocks()));
            product.setImage(checkIfFieldIsEmpty(productJSON.get("image"), product.getImage()));
        }

        return product;
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
