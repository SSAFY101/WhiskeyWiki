package com.ssafy.whiskeywiki;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication()
public class WhiskeywikiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhiskeywikiApplication.class, args);
	}

}
