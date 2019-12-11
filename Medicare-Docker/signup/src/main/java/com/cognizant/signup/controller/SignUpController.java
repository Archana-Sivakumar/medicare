package com.cognizant.signup.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cognizant.signup.SignupApplication;
import com.cognizant.signup.exception.UserAlreadyExistsException;
import com.cognizant.signup.model.Admin;
import com.cognizant.signup.model.Agent;
import com.cognizant.signup.model.Doctor;
import com.cognizant.signup.model.Patient;
import com.cognizant.signup.service.SignUpService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("")
public class SignUpController {


	private static final Logger LOGGER = LoggerFactory.getLogger(SignupApplication.class);

	@Autowired
	private SignUpService signupService;

	@PostMapping("/admin-sign-up")
	public void adminSignup(@RequestBody  Admin admin) throws UserAlreadyExistsException {

		LOGGER.info("Start");

		signupService.adminSignup(admin);

		LOGGER.info("End");
	}

	@PostMapping("/customer-sign-up")
	public void customerSignup(@RequestBody  Patient patient) throws UserAlreadyExistsException {

		LOGGER.info("Start");

		signupService.patientSignup(patient);

		LOGGER.info("End");
	}

	@PostMapping("/doctor-sign-up")
	public void doctorSignup(@RequestBody  Doctor doctor) throws UserAlreadyExistsException {

		LOGGER.info("Start");

		signupService.doctorSignup(doctor);

		LOGGER.info("End");
	}
	
	@PostMapping("/agent-sign-up")
	public void agentSignup(@RequestBody  Agent agent) throws UserAlreadyExistsException {

		LOGGER.info("Start");

		signupService.agentSignup(agent);

		LOGGER.info("End");
	}

	
	public PasswordEncoder passwordEncoder() {

		LOGGER.info("Start");
		return new BCryptPasswordEncoder();

	}

}
