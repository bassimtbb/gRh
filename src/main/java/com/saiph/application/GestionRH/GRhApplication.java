package com.saiph.application.GestionRH;

import com.saiph.application.GestionRH.Domain.entities.Role;
import com.saiph.application.GestionRH.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.Date;

@SpringBootApplication
public class GRhApplication {

	public static void main(String[] args) {
		SpringApplication.run(GRhApplication.class, args);

	}
	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(Role.builder().name("USER").build());
			}
		};
	}
}
