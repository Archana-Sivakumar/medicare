package com.cognizant.medicare.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.medicare.MedicareApplication;
import com.cognizant.medicare.model.Medicare;
import com.cognizant.medicare.repository.MedicareRepository;


@Service
public class MedicareServiceImpl implements MedicareService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MedicareApplication.class);

	@Autowired
	private MedicareRepository medicareRepository;
	
	@Override
	public List<Medicare> getMedicareList() {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return medicareRepository.findAll();
	}
	
	@Override
	public Medicare getOneMedicare(int medicareId) {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return medicareRepository.findById(medicareId).get();
	}

	@Override
	public boolean editMedicareService(Medicare medicare) {
		
		LOGGER.info("Start");
		
		medicareRepository.save(medicare);
		
		LOGGER.info("End");
		return true;
	}

}
