package com.hepsibirarada;

import com.hepsibirarada.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan({"com.hepsibirarada.repository", "com.hepsibirarada.controller"})
@EnableMongoRepositories(basePackages="com.hepsibirarada.repository")
public class HepsibiraradaApplication implements CommandLineRunner {
	@Autowired
	CustomerRepository customerRepository;

	public static void main(String[] args) {
		SpringApplication.run(HepsibiraradaApplication.class, args);
	}

	public void run(String... args) {

	}
}
