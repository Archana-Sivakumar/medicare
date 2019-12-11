package com.cognizant.signup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SignupApplication {

	public static void main(String[] args) {
		SpringApplication.run(SignupApplication.class, args);
	}

}
