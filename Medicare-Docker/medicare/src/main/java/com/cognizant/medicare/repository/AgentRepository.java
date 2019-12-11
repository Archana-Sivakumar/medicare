package com.cognizant.medicare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.medicare.model.Agent;


@Repository
public interface AgentRepository extends JpaRepository<Agent, Integer>{
	Agent findByUsername(String username);

}
