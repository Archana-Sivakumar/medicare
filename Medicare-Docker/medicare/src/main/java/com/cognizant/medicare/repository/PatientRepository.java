package com.cognizant.medicare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.medicare.model.Patient;


@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
	
	Patient findByUsername(String username);

}
