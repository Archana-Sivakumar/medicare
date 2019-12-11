package com.cognizant.medicare.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.medicare.MedicareApplication;
import com.cognizant.medicare.model.Doctor;
import com.cognizant.medicare.model.Medicare;
import com.cognizant.medicare.model.Patient;
import com.cognizant.medicare.model.Users;
import com.cognizant.medicare.repository.AdminRepository;
import com.cognizant.medicare.repository.DoctorRepository;
import com.cognizant.medicare.repository.MedicareRepository;
import com.cognizant.medicare.repository.PatientRepository;
import com.cognizant.medicare.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MedicareApplication.class);

	@Autowired
	DoctorRepository doctorRepository;

	@Autowired
	AdminRepository adminRepository;

	@Autowired
	PatientRepository patientRepository;

	@Autowired
	MedicareRepository medicareRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public List<Doctor> getAllDoctorList() {

		LOGGER.info("Start");
		LOGGER.info("End");

		return doctorRepository.findAll();
	}

	@Override
	public List<Patient> getAllCustomerList() {

		LOGGER.info("Start");
		LOGGER.info("End");

		return patientRepository.findAll();
	}

	@Override
	public List<Medicare> getAllMedicareList() {

		LOGGER.info("Start");
		LOGGER.info("End");

		return medicareRepository.findAll();
	}

	@Override
	public List<Patient> removePatient(String userName) {

		LOGGER.info("Start");

		Patient patient = patientRepository.findByUsername(userName);
		patientRepository.delete(patient);
		System.out.println(patientRepository.findAll());
		
		LOGGER.info("End");
		
		return patientRepository.findAll();

	}

	@Override
	public List<Doctor> removeDoctor(String userName) {

		LOGGER.info("Start");

		Doctor doctor = doctorRepository.findByUserName(userName);
		doctorRepository.delete(doctor);
		LOGGER.info("End");
		
		return doctorRepository.findAll();
	}
	
	@Override
	public List<Users> getAllUsers() {
		return userRepository.getAllUsers();
	}

	@Override
	public List<Users> editUsers(Users user) {
		userRepository.save(user);
		return userRepository.getAllUsers();
	}

	@Override
	public Users getOneUser(int id) {
		return userRepository.findById(id);
	}

}
