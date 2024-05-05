package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeRepository extends JpaRepository<Demande,Long> {
        List<Demande> findByUtilisateurId(Long userId);
        List<Demande> findByDepartementId(Long departementId);
}
