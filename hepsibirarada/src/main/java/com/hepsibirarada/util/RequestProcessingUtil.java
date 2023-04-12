package com.hepsibirarada.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class RequestProcessingUtil {
    public Map<String, String> parseJSON(String JSONString) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(JSONString, Map.class);
    }
}
