package com.cognizant.medicare.service;

import org.springframework.stereotype.Service;
import com.cognizant.medicare.model.TestResult;

@Service
public interface DoctorService {
	
	public boolean addMedicareService(String userName, int medicareService);
	
	public boolean updateTestResult(TestResult testResult);
}
