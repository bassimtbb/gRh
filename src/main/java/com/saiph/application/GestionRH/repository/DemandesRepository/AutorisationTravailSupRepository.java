package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationTravailSup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AutorisationTravailSupRepository extends JpaRepository<AutorisationTravailSup,Long> {
    @Override
    Optional<AutorisationTravailSup> findById(Long aLong);
}