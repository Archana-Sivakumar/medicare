package com.cognizant.signup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.signup.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
   Role findById(int id);
}
