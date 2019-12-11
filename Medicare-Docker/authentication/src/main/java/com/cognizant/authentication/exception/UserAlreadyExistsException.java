package com.cognizant.authentication.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class UserAlreadyExistsException extends Exception {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserAlreadyExistsException.class);
	private static final long serialVersionUID = 1L;

	public UserAlreadyExistsException() {

	}

	public String getMessage() {
		
		LOGGER.info("START");
		LOGGER.info("END");
		
		return ("User already exists");
	}
}
