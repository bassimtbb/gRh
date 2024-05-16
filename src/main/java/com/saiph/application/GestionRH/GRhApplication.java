package com.saiph.application.GestionRH;

import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Enum.DepartementName;
import com.saiph.application.GestionRH.Enum.RoleType;
import com.saiph.application.GestionRH.auth.AuthenticationService;
import com.saiph.application.GestionRH.auth.RegistrationRequest;
import com.saiph.application.GestionRH.repository.DepartementRepository;
import com.saiph.application.GestionRH.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
@SpringBootApplication
public class GRhApplication {

	public static void main(String[] args) {
		SpringApplication.run(GRhApplication.class, args);}
        	@Bean
	public CommandLineRunner runner(UserRepository userRepository , DepartementRepository departementRepository, AuthenticationService authenticationService, PasswordEncoder passwordEncoder
) {
		return args -> {

            {
                Departement Informatique = Departement.builder()
                        .name(DepartementName.Informatique)
                        .build();
                Departement Finance = Departement.builder()
                        .name(DepartementName.Finance)
                        .build();
                Departement Ressources_Humaine = Departement.builder()
                        .name(DepartementName.Ressources_Humaine)
                        .build();
      departementRepository.save(Informatique);
                departementRepository.save(Finance);
                departementRepository.save(Ressources_Humaine);
                RegistrationRequest Sup_H = RegistrationRequest.builder()
                        .firstname("Bassim")
                        .lastname("Tabbeb")
                        .email("Sup-h@gmail.com")
                        .password("password")
                        .cin("12312333")
                        .service("service")
                        .sexe("M")
                        .address("string")
                        .phonenumber("12123123")
                        .role(RoleType.SUP_H)
                        .img("string")
                        .EJuridic("SAIPH")
                        .DEmbauche(new Date())
                        .build();

                RegistrationRequest RRH = RegistrationRequest.builder()
                        .firstname("Tayssir")
                        .lastname("Weslety")
                        .email("RRH@gmail.com")
                        .password("password")
                        .cin("12312333")
                        .service("service")
                        .sexe("M")
                        .address("string")
                        .phonenumber("12123123")
                        .role(RoleType.RRH)
                        .img("string")
                        .EJuridic("SAIPH")
                        .DEmbauche(new Date())
                        .departement(Ressources_Humaine)
                        .build();

                RegistrationRequest EMPLOYE = RegistrationRequest.builder()
                        .firstname("Rami")
                        .lastname("Toumi")
                        .email("EMPLOYE@gmail.com")
                        .password("password")
                        .cin("12312333")
                        .service("service")
                        .sexe("M")
                        .address("string")
                        .phonenumber("12123123")
                        .role(RoleType.EMPLOYE)
                        .departement(Informatique)
                        .img("string")
                        .EJuridic("SAIPH")
                        .DEmbauche(new Date())
                        .build();


                authenticationService.register(Sup_H);
                authenticationService.register(EMPLOYE);
                authenticationService.register(RRH);

            }
        };
};

	}


