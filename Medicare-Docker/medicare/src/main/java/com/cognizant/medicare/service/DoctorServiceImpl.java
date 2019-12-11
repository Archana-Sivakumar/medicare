package com.cognizant.medicare.service;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.medicare.MedicareApplication;
import com.cognizant.medicare.model.Doctor;
import com.cognizant.medicare.model.Medicare;
import com.cognizant.medicare.model.TestResult;
import com.cognizant.medicare.repository.DoctorRepository;
import com.cognizant.medicare.repository.MedicareRepository;
import com.cognizant.medicare.repository.RequestRepository;
import com.cognizant.medicare.repository.TestResultRepository;

@Service
public class DoctorServiceImpl implements DoctorService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MedicareApplication.class);
	
	@Autowired
	DoctorRepository doctorRepository;
	
	@Autowired
	TestResultRepository testResultRepository;
	
	@Autowired
	MedicareRepository medicareRepository;
	
	@Autowired
	RequestRepository requestRepository;

	@Override
	public boolean addMedicareService(String userName, int medicareServiceId) {
		
		LOGGER.info("Start");
		
		Doctor doctor = doctorRepository.findByUserName(userName);
		Set<Medicare> medicareList = new HashSet<Medicare>();
		medicareList = doctor.getMedicareList();
		Medicare oneMedicare = medicareRepository.findById(medicareServiceId).get();
		
		if(medicareList.size() == 0) {
			medicareList.add(oneMedicare);
			doctor.setMedicareList(medicareList);;
			doctorRepository.save(doctor);
			
			LOGGER.info("End");
			
			return true;
			
		} else {
			
			int flag = 0;
			for(Medicare itr : medicareList) {
				if(itr.getId() == medicareServiceId) {
					flag = 1;
					break;
				}
			}
			if(flag == 0) {
				medicareList.add(oneMedicare);
				doctor.setMedicareList(medicareList);;
				doctorRepository.save(doctor);
				
				LOGGER.info("End");
				
				return true;
			} else {
				
				LOGGER.info("End");
				return false;
			}
				
		}
	}

	@Override
	public boolean updateTestResult(TestResult testResult) {
		
		LOGGER.info("Start");
		
		testResultRepository.save(testResult);
		
		LOGGER.info("End");
		return true;
	}

	


}
