package com.cognizant.medicare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cognizant.medicare.model.TestResult;

@Service
public interface TestResultService {

	public List<TestResult> viewTestResult();
}
