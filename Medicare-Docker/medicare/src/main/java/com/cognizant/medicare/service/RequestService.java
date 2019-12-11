package com.cognizant.medicare.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.cognizant.medicare.model.Doctor;
import com.cognizant.medicare.model.Patient;
import com.cognizant.medicare.model.Request;


@Service
public interface RequestService {
	
	public boolean acceptRequest(Request request);
	
	public boolean addRequest(Request request);
	
	public List<Request> adminRequest();
	
	public List<Request> doctorRequest();
	
	public List<Request> customerRequest(int customerId);
	
	public Request getOneRequest(int id);
	
	public Patient getOneCustomer(String customerName);
	
	public Doctor getOneDoctor(int doctorId);

	public boolean bookAppointment(Request request);

}
