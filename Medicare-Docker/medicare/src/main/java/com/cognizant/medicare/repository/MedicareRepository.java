package com.cognizant.medicare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.medicare.model.Medicare;


@Repository
public interface MedicareRepository extends JpaRepository<Medicare, Integer>{
	
}
