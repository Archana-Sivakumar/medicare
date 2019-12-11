package com.cognizant.medicare.service;


import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cognizant.medicare.MedicareApplication;
import com.cognizant.medicare.model.Doctor;
import com.cognizant.medicare.model.Patient;
import com.cognizant.medicare.model.Request;
import com.cognizant.medicare.repository.DoctorRepository;
import com.cognizant.medicare.repository.MedicareRepository;
import com.cognizant.medicare.repository.PatientRepository;
import com.cognizant.medicare.repository.RequestRepository;

@Service
public class RequestServiceImpl implements RequestService{

	private static final Logger LOGGER = LoggerFactory.getLogger(MedicareApplication.class);
	
	@Autowired
	RequestRepository requestRepository;
	
	@Autowired
	PatientRepository patientRepository;
	
	@Autowired
	MedicareRepository medicareRepository;
	
	@Autowired
	DoctorRepository doctorRepository;
	
	
	@Override
	public boolean acceptRequest(Request request) {
		
		LOGGER.info("Start");
		
		requestRepository.save(request);
		
		LOGGER.info("End");
		return true;
	}
	
	
	@Override
	public boolean addRequest(Request request) {
		
		LOGGER.info("Start");
		
		requestRepository.save(request);
		
		LOGGER.info("End");
		return true;
		
	}

	
	@Override
	public List<Request> adminRequest() {
		
		LOGGER.info("Start");
		LOGGER.info("End");

		return requestRepository.adminRequest();
	}

	
	@Override
	public List<Request> doctorRequest() {
		
		LOGGER.info("Start");
		LOGGER.info("End");
	
		return requestRepository.doctorRequest();
	}

	
	@Override
	public List<Request> customerRequest(int customerId) {
		
		LOGGER.info("Start");
		LOGGER.info("End");

		return requestRepository.customerRequest(customerId);
	}

	
	public Request getOneRequest(int id) {
		
		LOGGER.info("Start");
		LOGGER.info("End");

		return requestRepository.findById(id).get();
	}
	
	
	@Override
	public Patient getOneCustomer(String customerName) {
		
		LOGGER.info("Start");
		LOGGER.info("End");

		return patientRepository.findByUsername(customerName);
	}
	
	@Override
	public boolean bookAppointment(Request request) {
		
		LOGGER.info("Start");
		
		requestRepository.save(request);
		
		LOGGER.info("End");
		return true;
	}


	@Override
	public Doctor getOneDoctor(int doctorId) {
		
		LOGGER.info("Start");
		LOGGER.info("End");

		return doctorRepository.findById(doctorId).get();
	}
}
