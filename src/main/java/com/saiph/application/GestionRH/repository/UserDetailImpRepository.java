package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.UserDetailImp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;

@EnableJpaRepositories
public interface UserDetailImpRepository extends JpaRepository<UserDetailImp,Long> {
          Optional<UserDetailImp> findByEmail(String username);


}
