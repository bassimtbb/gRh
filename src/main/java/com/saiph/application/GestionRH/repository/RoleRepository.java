package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String roleStudent);
}
