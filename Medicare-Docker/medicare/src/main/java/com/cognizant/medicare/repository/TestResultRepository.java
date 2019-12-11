package com.cognizant.medicare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cognizant.medicare.model.TestResult;


@Repository
public interface TestResultRepository  extends JpaRepository<TestResult, Integer> {

	TestResult findById(int id);

}
