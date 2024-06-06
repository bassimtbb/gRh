package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User,Long> {
          Optional<User> findByEmail(String username);

    Optional<User> findByCin(String cin);

}
