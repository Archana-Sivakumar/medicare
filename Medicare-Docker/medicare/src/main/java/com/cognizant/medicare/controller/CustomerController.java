package com.cognizant.medicare.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cognizant.medicare.MedicareApplication;
import com.cognizant.medicare.model.Patient;
import com.cognizant.medicare.model.Request;
import com.cognizant.medicare.model.TestResult;
import com.cognizant.medicare.service.RequestService;
import com.cognizant.medicare.service.TestResultService;

@RestController
@RequestMapping("")

public class CustomerController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MedicareApplication.class);
	
	@Autowired
	private RequestService requestService;
	
	@Autowired
	private TestResultService testResultService;
	
	
	@GetMapping("/customerViewRequest/{customerId}")
	public List<Request> customerRequest(@PathVariable int customerId){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return requestService.customerRequest(customerId);	
	}

	
	@PostMapping("/request")
	public boolean addRequest(@RequestBody Request request){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return requestService.addRequest(request);
	}
	
	
	@GetMapping("/oneRequest/{id}")
	public Request getOneRequest(@PathVariable int id){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return requestService.getOneRequest(id);
	}
	
	
	@GetMapping("/getOneCustomer/{customerName}")
	public Patient getOneCustomer(@PathVariable String customerName){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return requestService.getOneCustomer(customerName);
	}
	

	@PostMapping("/bookAppointment")
	public boolean bookAppointment(@RequestBody Request request) {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return requestService.bookAppointment(request);
	
	}
	
	
	@GetMapping("/viewTestResult")
	public List<TestResult> viewTestResult() {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return testResultService.viewTestResult();
	}

}
