package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FormationRepository extends JpaRepository<Formation,Long> {

    @Override
    Optional<Formation> findById(Long id);
}
