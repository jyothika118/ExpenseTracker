package com.klef;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ETbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ETbackendApplication.class, args);
		System.out.println("Backend is Running!");
	}

}
