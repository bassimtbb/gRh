package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationTeletravail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AutorisationTeletravailRepository extends JpaRepository<AutorisationTeletravail,Long> {
}