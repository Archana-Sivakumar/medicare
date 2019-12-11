package com.cognizant.authentication;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.cognizant.authentication.model.Role;
import com.cognizant.authentication.model.Users;
import com.cognizant.authentication.repository.UserRepository;
import com.cognizant.authentication.security.AppUserDetailsService;


@SpringBootTest
class AuthenticationApplicationTests {
	
	@Autowired
	AppUserDetailsService appUserDetailsService;
	
	@MockBean
	UserRepository repository;

	@Autowired
	PasswordEncoder bCryptPasswordEncoder;

	@Test
	void contextLoads() {
	}
	
	@Test
	public void testLoginUserByUsername() {

		Mockito.when(repository.findByUsername("admin")).thenReturn(createUser());
		UserDetails user = appUserDetailsService.loadUserByUsername("admin");
        assertDoesNotThrow(() -> user);
		String expected = "admin";
		assertEquals(expected, user.getUsername());
	}

	

	@Test
	public void testLoadByUserNameNotFoundException() throws UsernameNotFoundException {
		
		Mockito.when(repository.findByUsername("abc")).thenReturn(null);
        assertThrows(UsernameNotFoundException.class,()->appUserDetailsService.loadUserByUsername("abc"));
	
	}
	
	public Users createUser() {

		Role role = new Role(0,"ADMIN");
		Users newUser = new Users();
		newUser.setId(1);
		newUser.setUsername("admin");
		newUser.setPassword(bCryptPasswordEncoder.encode("admin"));
		newUser.setRole(role);
		return newUser;
	}

}
