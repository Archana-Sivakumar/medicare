package com.cognizant.medicare.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.medicare.MedicareApplication;
import com.cognizant.medicare.DTO.DoctorDTO;
import com.cognizant.medicare.DTO.MedicareDTO;
import com.cognizant.medicare.DTO.TestResultNameDTO;
import com.cognizant.medicare.model.Doctor;
import com.cognizant.medicare.model.Medicare;
import com.cognizant.medicare.model.Patient;
import com.cognizant.medicare.model.Request;
import com.cognizant.medicare.model.TestResultName;
import com.cognizant.medicare.model.Users;
import com.cognizant.medicare.service.AdminService;
import com.cognizant.medicare.service.MedicareService;
import com.cognizant.medicare.service.RequestService;

@RestController
@RequestMapping("")

public class AdminController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MedicareApplication.class);
	
	@Autowired
	private AdminService adminService;
	
	
	@Autowired
	private RequestService requestService;
	
	@Autowired
	private MedicareService medicareService;
		
	
	@GetMapping("/users")
	public List<Users> getAllUsers(){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return adminService.getAllUsers();
		
	}
	
	
	@PutMapping("/edit-users")
	public List<Users> editUsers(@RequestBody Users user){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		return adminService.editUsers(user);
		
	}
	
	
	@GetMapping("/get-one-user/{id}")
	public Users getOneUser(@PathVariable int id){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return adminService.getOneUser(id);
		
	}
	
	
	@GetMapping("/doctors")
	public List<Doctor> getAllDoctorList(){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return adminService.getAllDoctorList();
		
	}
	
	
	@GetMapping("/customers")
	public List<Patient> getAllCustomerList(){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return adminService.getAllCustomerList();
		
	}
	
	
	@GetMapping("/medicare-services")
	public MedicareDTO[] getAllMedicareList(){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return transformMedicareToDTO(adminService.getAllMedicareList());
		
	}
	
	
	@DeleteMapping("/removePatient-signup/{userName}")
	public List<Patient> removePatient(@PathVariable String userName) {	
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return adminService.removePatient(userName);
	}
	
	
	@DeleteMapping("/removeDoctor-signup/{userName}")
	public List<Doctor> removeDoctor(@PathVariable String userName) {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return adminService.removeDoctor(userName);
	}
	
	
	@PutMapping("/requestUpdate") 
	public void acceptRequest(@RequestBody Request request) {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		requestService.acceptRequest(request);
	}
	
	
	@GetMapping("/adminViewRequest")
	public List<Request> adminRequest(){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return requestService.adminRequest();	
	}
	
	@PostMapping("/editMedicareService")
	public boolean editMedicareService(@RequestBody Medicare medicare) {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return medicareService.editMedicareService(medicare);
	}

	
	private MedicareDTO[] transformMedicareToDTO(List<Medicare> medicare) {
		
		LOGGER.info("Start");

		MedicareDTO[] medicareDTO = new MedicareDTO[medicare.size()];

		int count = 0;

		for (Medicare medi : medicare) {

			medicareDTO[count] = new MedicareDTO();
			
			medicareDTO[count].setId(medi.getId());
			medicareDTO[count].setMedicareService(medi.getMedicareService());
			medicareDTO[count].setServiceDescription(medi.getServiceDescription());
			medicareDTO[count].setAmount(medi.getAmount());
			medicareDTO[count].setAgentCommission(medi.getAgentCommission());
		
			Set<Doctor> doctorList = medi.getDoctor();

			Set<DoctorDTO> doctorListDto = new HashSet<DoctorDTO>();

			for (Doctor doc : doctorList) {

				DoctorDTO doctorDTO = new DoctorDTO();	
				
				doctorDTO.setDoctorId(doc.getDoctorId());
				doctorDTO.setUserName(doc.getUserName());
				doctorDTO.setFirstName(doc.getFirstName());
				doctorDTO.setLastName(doc.getLastName());
				doctorDTO.setAge(doc.getAge());
				doctorDTO.setGender(doc.getGender());
				doctorDTO.setDateOfBirth(doc.getDateOfBirth());
				doctorDTO.setContactNumber(doc.getContactNumber());
				doctorDTO.setAltContactNumber(doc.getAltContactNumber());
				doctorDTO.setEmailId(doc.getEmailId());
				doctorDTO.setPassword(doc.getPassword());
				doctorDTO.setAddressLineOne(doc.getAddressLineOne());
				doctorDTO.setAddressLineTwo(doc.getAddressLineTwo());
				doctorDTO.setCity(doc.getCity());
				doctorDTO.setState(doc.getState());
				doctorDTO.setZipcode(doc.getZipcode());
				doctorDTO.setDegree(doc.getDegree());
				doctorDTO.setSpeciality(doc.getSpeciality());
				doctorDTO.setWorkhours(doc.getWorkhours());
				doctorDTO.setHospitalName(doc.getHospitalName());
				
				
				doctorListDto.add(doctorDTO);

			}

			
			medicareDTO[count].setDoctor(doctorListDto);
			
			
			Set<TestResultName> testResultNameList = medi.getTestResultName();

			Set<TestResultNameDTO> testResultNameDTOList = new HashSet<TestResultNameDTO>();

			for (TestResultName testName : testResultNameList) {

				TestResultNameDTO testResultNameDTO = new TestResultNameDTO();
				
				testResultNameDTO.setId(testName.getId());
				testResultNameDTO.setNormalRange(testName.getNormalRange());
				testResultNameDTO.setTestName(testName.getTestName());
				testResultNameDTO.setMedicare(null);
				
				
				testResultNameDTOList.add(testResultNameDTO);

			}
			medicareDTO[count].setTestResultName(testResultNameDTOList);

			count++;

		}

		LOGGER.info("End");
		
		return medicareDTO;

	}
	

}



