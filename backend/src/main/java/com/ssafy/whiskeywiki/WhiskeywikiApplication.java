package com.ssafy.whiskeywiki;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class WhiskeywikiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhiskeywikiApplication.class, args);
	}

}
