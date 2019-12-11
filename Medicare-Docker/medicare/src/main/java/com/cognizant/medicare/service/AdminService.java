package com.cognizant.medicare.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.cognizant.medicare.model.Doctor;
import com.cognizant.medicare.model.Medicare;
import com.cognizant.medicare.model.Patient;
import com.cognizant.medicare.model.Users;

@Service
public interface AdminService {
	
	public List<Doctor> getAllDoctorList();
	
	public List<Patient> getAllCustomerList();
	
	public List<Medicare> getAllMedicareList();
	
	public List<Doctor> removeDoctor(String userName);
	
	public List<Patient> removePatient(String userName);
	
	public List<Users> getAllUsers();

	public List<Users> editUsers(Users user);
	
	public Users getOneUser(int id);
}
