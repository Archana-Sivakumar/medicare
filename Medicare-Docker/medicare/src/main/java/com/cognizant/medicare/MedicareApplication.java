package com.cognizant.medicare;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
public class MedicareApplication {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MedicareApplication.class);

	public static void main(String[] args) {
		
		LOGGER.info("START");
		
		SpringApplication.run(MedicareApplication.class, args);
		
		LOGGER.info("END");
	}

}
