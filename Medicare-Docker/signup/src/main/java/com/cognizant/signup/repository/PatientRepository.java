package com.cognizant.signup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.signup.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
	
	Patient findByUsername(String username);

}
