package com.cognizant.signup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.signup.model.Agent;


@Repository
public interface AgentRepository extends JpaRepository<Agent, Integer>{
	Agent findByUsername(String username);

}
