package com.cognizant.authentication.controller;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.authentication.AuthenticationApplication;
import com.cognizant.authentication.exception.UserRegistrationException;
import com.cognizant.authentication.model.Users;
import com.cognizant.authentication.repository.UserRepository;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("")

public class AuthenticationController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationApplication.class);

	@Autowired
	UserRepository userRepository;

	@GetMapping("/authenticate")
	public Map<String, String> authenticate(@RequestHeader("Authorization") String authHeader)
			throws UserRegistrationException {

		LOGGER.info("START");

		Map<String, String> data = new HashMap<>();

		Users user = userRepository.findByUsername(getUser(authHeader));
		String userName = user.getUsername();

		if (userRepository.findByUsername(userName).getApprove().equalsIgnoreCase("PENDING")) {

			LOGGER.info("START");
			throw new UserRegistrationException("PENDING");

		} else if (userRepository.findByUsername(userName).getApprove().equalsIgnoreCase("REJECTED")) {

			LOGGER.info("START");
			throw new UserRegistrationException("REJECTED");
		}

		data.put("token", generateJwt(getUser(authHeader)));
		data.put("user", getUser(authHeader));
		data.put("role", user.getRole().getName());

		LOGGER.info("END");
		
		return data;

	}

	private String getUser(String authHeader) {
		
		LOGGER.info("START");
		
		String encodedCredentials = authHeader.split(" ")[1];
		String decodedCredentials = new String(Base64.getDecoder().decode(encodedCredentials));
		
		LOGGER.debug(decodedCredentials.split(":")[0]);
		LOGGER.info("END");	
		
		return decodedCredentials.split(":")[0];
		
	}

	private String generateJwt(String user) {
		
		LOGGER.info("START");
		LOGGER.debug("GENEARTE JWT");
		
		JwtBuilder builder = Jwts.builder();
		builder.setSubject(user);
		builder.setIssuedAt(new Date());
		builder.setExpiration(new Date((new Date()).getTime() + 1200000));
		builder.signWith(SignatureAlgorithm.HS256, "secretkey");
		String token = builder.compact();
		
		LOGGER.info("END");
		
		return token;
	}

}