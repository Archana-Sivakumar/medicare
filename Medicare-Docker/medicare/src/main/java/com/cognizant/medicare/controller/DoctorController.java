package com.cognizant.medicare.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
import com.cognizant.medicare.DTO.DoctorDTO;
import com.cognizant.medicare.DTO.MedicareDTO;
import com.cognizant.medicare.DTO.TestResultNameDTO;
import com.cognizant.medicare.model.Doctor;
import com.cognizant.medicare.model.Medicare;
import com.cognizant.medicare.model.Request;
import com.cognizant.medicare.model.TestResult;
import com.cognizant.medicare.model.TestResultName;
import com.cognizant.medicare.service.DoctorService;
import com.cognizant.medicare.service.MedicareService;
import com.cognizant.medicare.service.RequestService;


@RestController
@RequestMapping("")
public class DoctorController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MedicareApplication.class);
	
	@Autowired
	private RequestService requestService;
	
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private MedicareService medicareService;
	
	
	@GetMapping("/doctorViewRequest")
	public List<Request> doctorRequest(){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return requestService.doctorRequest();	
	}
	
	
	@PostMapping("/{userName}/{medicareServiceId}")
	public boolean addMedicareService(@PathVariable String userName, @PathVariable int medicareServiceId) {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return doctorService.addMedicareService(userName, medicareServiceId);
	}
	
	
	@GetMapping("/oneMedicare/{medicareId}")
	public MedicareDTO getOneMedicare(@PathVariable int medicareId) {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return transformMedicareToDTO(medicareService.getOneMedicare(medicareId));
		
	}
	
	
	@GetMapping("/getOneDoctor/{doctorId}")
	public Doctor getOneDoctor(@PathVariable int doctorId){
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return requestService.getOneDoctor(doctorId);
	}
	
	
	@PostMapping("/updateTestResult")
	public boolean updateTestResult(@RequestBody TestResult testResult) {
		
		LOGGER.info("Start");
		LOGGER.info("End");
		
		return doctorService.updateTestResult(testResult);
	}	
	
	private MedicareDTO transformMedicareToDTO(Medicare medicare) {

		LOGGER.info("Start");
		MedicareDTO medicareDTO = new MedicareDTO();
		
			medicareDTO.setId(medicare.getId());
			medicareDTO.setMedicareService(medicare.getMedicareService());
			medicareDTO.setServiceDescription(medicare.getServiceDescription());
			medicareDTO.setAmount(medicare.getAmount());
			medicareDTO.setAgentCommission(medicare.getAgentCommission());
			
			Set<Doctor> doctorList = medicare.getDoctor();

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

			medicareDTO.setDoctor(doctorListDto);
			
			Set<TestResultName> testResultNameList = medicare.getTestResultName();

			Set<TestResultNameDTO> testResultNameDTOList = new HashSet<TestResultNameDTO>();

			for (TestResultName testName : testResultNameList) {

				TestResultNameDTO testResultNameDTO = new TestResultNameDTO();
				
				testResultNameDTO.setId(testName.getId());
				testResultNameDTO.setNormalRange(testName.getNormalRange());
				testResultNameDTO.setTestName(testName.getTestName());
				testResultNameDTO.setMedicare(null);
			
				testResultNameDTOList.add(testResultNameDTO);

			}
			medicareDTO.setTestResultName(testResultNameDTOList);

			LOGGER.info("End");	
			
		return medicareDTO;

	}
		

}
