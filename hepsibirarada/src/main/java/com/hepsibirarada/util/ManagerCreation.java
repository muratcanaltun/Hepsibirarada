package com.hepsibirarada.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class ManagerCreation {
    public static void main(String[] args) throws IOException {
        HttpURLConnection con = createBackendConnection();
        String json = createJSON();
        sendHTTPRequest(con, json);
        getHTTPResponse(con);
    }

    public static HttpURLConnection createBackendConnection() throws IOException {
        URL url = new URL("http://localhost:8080/managers");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Accept", "application/json");
        con.setDoOutput(true);

        return con;
    }

    public static String createJSON() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Please enter the manager username:");
        String username = scanner.nextLine();

        System.out.println("Please enter the manager email:");
        String email = scanner.nextLine();

        System.out.println("Please enter the manager password:");
        String password = scanner.nextLine();

        return "{\"username\": \"" + username + "\", \"email\": \"" + email + "\", \"password\": \"" + password + "\"}";
    }

    public static void sendHTTPRequest(HttpURLConnection con, String json) throws IOException {
        try(OutputStream os = con.getOutputStream()) {
            byte[] input = json.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }


    }

    public static void getHTTPResponse(HttpURLConnection con) throws IOException {
        try(BufferedReader br = new BufferedReader(
                new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            System.out.println(response.toString());
        }
    }
}
