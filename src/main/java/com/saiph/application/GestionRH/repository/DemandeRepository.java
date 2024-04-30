package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeRepository extends JpaRepository<Demande,Long> {
}
