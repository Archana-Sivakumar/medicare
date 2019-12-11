package com.cognizant.signup.service;
import org.springframework.stereotype.Service;

import com.cognizant.signup.exception.UserAlreadyExistsException;
import com.cognizant.signup.model.Admin;
import com.cognizant.signup.model.Agent;
import com.cognizant.signup.model.Doctor;
import com.cognizant.signup.model.Patient;


@Service
public interface SignUpService {
	
	public void adminSignup(Admin admin) throws UserAlreadyExistsException;
	public void patientSignup(Patient patient)  throws UserAlreadyExistsException;
	public void doctorSignup(Doctor doctor) throws UserAlreadyExistsException;
	public void agentSignup(Agent agent) throws UserAlreadyExistsException;
	public boolean doctorUpdate(Doctor doctor);
	public boolean customerUpdate(Patient patient);
	
	
	
}
