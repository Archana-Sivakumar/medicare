package com.cognizant.signup;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cognizant.signup.exception.UserAlreadyExistsException;
import com.cognizant.signup.model.Admin;
import com.cognizant.signup.model.Agent;
import com.cognizant.signup.model.Doctor;
import com.cognizant.signup.model.Patient;
import com.cognizant.signup.model.Role;
import com.cognizant.signup.model.Users;
import com.cognizant.signup.repository.AdminRepository;
import com.cognizant.signup.repository.AgentRepository;
import com.cognizant.signup.repository.DoctorRepository;
import com.cognizant.signup.repository.PatientRepository;
import com.cognizant.signup.security.AppUserDetailsService;
import com.cognizant.signup.service.SignUpService;


@SpringBootTest
class SignupApplicationTests {
	
	@Autowired
	AppUserDetailsService appUserDetailsService;
	
	@MockBean
	AdminRepository adminRepository;
	
	@MockBean
	DoctorRepository doctorRepository;
	
	@MockBean
	PatientRepository patientRepository;
	
	@MockBean
	AgentRepository agentRepository;
	
	
	
	@Autowired
    SignUpService signUpService;
	
	@Autowired
	PasswordEncoder bCryptPasswordEncoder;

	@Test
	void contextLoads() {
	}
	
	@Test
	public void testvoidSignupDoctor() {

		
		Doctor doctor = createDoctor();
		Mockito.when(doctorRepository.findByUserName(doctor.getUserName())).thenReturn(null);
		System.out.println(doctor+"***");
		assertDoesNotThrow(() -> signUpService.doctorSignup(doctor));
		
	}

	
	@Test
	public void testvoidSignupPatient() {

		
		Patient patient = createPatient();
		Mockito.when(patientRepository.findByUsername(patient.getUsername())).thenReturn(null);
		System.out.println(patient+"***");
		assertDoesNotThrow(() -> signUpService.patientSignup(patient));
		
	}

	
	@Test
	public void testvoidSignupAdmin() {

		
		Admin admin = createAdmin();
		Mockito.when(adminRepository.findByUsername(admin.getUsername())).thenReturn(null);
		System.out.println(admin+"***");
		assertDoesNotThrow(() -> signUpService.adminSignup(admin));
		
	}
	
	@Test
	public void testvoidSignupAgent() {

		
		Agent agent = createAgent();
		Mockito.when(agentRepository.findByUsername(agent.getUsername())).thenReturn(null);
		System.out.println(agent+"***");
		assertDoesNotThrow(() -> signUpService.agentSignup(agent));
		
	}

	
	@Test
	public void adminUserAlreadyExistsException() throws UserAlreadyExistsException {
		
		Admin admin = createAdmin();
		Mockito.when(adminRepository.findByUsername(admin.getUsername())).thenReturn(admin);
		assertThrows(UserAlreadyExistsException.class,()->signUpService.adminSignup(admin));
			
	}
	
	@Test
	public void doctorUserAlreadyExistsException() throws UserAlreadyExistsException {
		
		Doctor doctor = createDoctor();
		Mockito.when(doctorRepository.findByUserName(doctor.getUserName())).thenReturn(doctor);
		assertThrows(UserAlreadyExistsException.class,()->signUpService.doctorSignup(doctor));
	}
	
	@Test
	public void patientUserAlreadyExistsException() throws UserAlreadyExistsException {
		
		Patient patient = createPatient();
		Mockito.when(patientRepository.findByUsername(patient.getUsername())).thenReturn(patient);
		assertThrows(UserAlreadyExistsException.class,()->signUpService.patientSignup(patient));
			
	}
	
	@Test
	public void agentUserAlreadyExistsException() throws UserAlreadyExistsException {
		
		Agent agent = createAgent();
		Mockito.when(agentRepository.findByUsername(agent.getUsername())).thenReturn(agent);
		assertThrows(UserAlreadyExistsException.class,()->signUpService.agentSignup(agent));
			
	}
	
	
	
	
	public Admin createAdmin() {
		Admin newAdmin = new Admin();
		newAdmin.setAge(23);
		newAdmin.setAltContactNumber(3421546578L);
		newAdmin.setContactNumber(3421546578L);
		newAdmin.setDateOfBirth("08/05/1992");
		newAdmin.setEmailId("abc@gmail.com");
		newAdmin.setFirstName("admin");
		newAdmin.setGender("male");
		newAdmin.setId(1);
		newAdmin.setLastName("admin");
		newAdmin.setPassword(bCryptPasswordEncoder.encode("admin"));
		newAdmin.setUsername("admin");
	
		Users newUser = new Users();
		newUser.setUsername("admin");
		
		newUser.setPassword(bCryptPasswordEncoder.encode("admin"));
		Role role = new Role(0, "ADMIN");
		newUser.setRole(role);
		newAdmin.setUser(newUser);
	
		return newAdmin;
	}
	
	public Agent createAgent() {
		Agent newAgent = new Agent();
		newAgent.setAge(23);
		newAgent.setAltContactNumber(3421546578L);
		newAgent.setContactNumber(3421546578L);
		newAgent.setDateOfBirth("08/05/1992");
		newAgent.setEmailId("abc@gmail.com");
		newAgent.setFirstName("agent");
		newAgent.setGender("male");
		newAgent.setId(1);
		newAgent.setLastName("agent");
		newAgent.setPassword(bCryptPasswordEncoder.encode("agent"));
		newAgent.setUsername("agent");
	
		Users newUser = new Users();
		newUser.setUsername("agent");
		
		newUser.setPassword(bCryptPasswordEncoder.encode("agent"));
		Role role = new Role(0, "AGENT");
		newUser.setRole(role);
		newAgent.setUser(newUser);
	
		return newAgent;
	}
	
	
	public Doctor createDoctor() {
		Doctor newDoctor = new Doctor();
		
	    newDoctor.setAddressLineOne(null);
	    newDoctor.setAddressLineTwo(null);
	    newDoctor.setAge(21);
	    newDoctor.setAltContactNumber(43323);
	    newDoctor.setCity(null);
	    newDoctor.setContactNumber(3545567);
	    newDoctor.setDateOfBirth(null);
	    newDoctor.setEmailId(null);
	    newDoctor.setFirstName(null);
	    newDoctor.setGender(null);
	    newDoctor.setDoctorId(1);
	    newDoctor.setLastName(null);
	    newDoctor.setPassword(bCryptPasswordEncoder.encode("doctor"));
	    newDoctor.setSecurityQuestion(null);
	    newDoctor.setSecurityAnswer(null);
	    newDoctor.setState(null);
	    newDoctor.setUserName("doctor");
	    newDoctor.setZipcode(436657);
	    newDoctor.setDegree(null);
	    newDoctor.setSpeciality(null);
	    newDoctor.setHospitalName(null);
	    newDoctor.setWorkhours(3);
	    newDoctor.setMedicareList(null);
	 
		Users newUser = new Users();
		newUser.setUsername("doctor");
		newUser.setPassword(bCryptPasswordEncoder.encode("doctor"));
		Role role = new Role(0, "DOCTOR");
		newUser.setRole(role);
		newDoctor.setUser(newUser);
		return newDoctor;
	}
	
	public Patient createPatient() {
		Patient newPatient = new Patient();
		
		newPatient.setAddressLineOne(null);
		newPatient.setAddressLineTwo(null);
		newPatient.setAge(21);
		newPatient.setAltContactNumber(43323);
		newPatient.setCity(null);
		newPatient.setContactNumber(3545567);
		newPatient.setDateOfBirth(null);
		newPatient.setEmailId(null);
		newPatient.setFirstName(null);
		newPatient.setGender(null);
		newPatient.setId(1);
		newPatient.setLastName(null);
		newPatient.setPassword(bCryptPasswordEncoder.encode("patient"));
		newPatient.setSecurityQuestion(null);
		newPatient.setSecurityAnswer(null);
		newPatient.setState(null);
		newPatient.setUsername("patient");
		newPatient.setZipcode(436657);
	    
	 
		Users newUser = new Users();
		newUser.setUsername("patient");
		newUser.setPassword(bCryptPasswordEncoder.encode("patient"));
		Role role = new Role(0, "PATIENT");
		newUser.setRole(role);
		newPatient.setUser(newUser);
		return newPatient;
	}

}
