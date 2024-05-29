package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Demande;
import com.saiph.application.GestionRH.Enum.Statut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface DemandeRepository extends JpaRepository<Demande, Long> {
    List<Demande> findByUtilisateurId(Long userId);

    List<Demande> findByDepartementId(Long departementId);

    List<Demande> findValidByDepartementId(Long departementId);

    List<Demande> findByStatut(Statut statut);

//    @Query("SELECT COUNT(c) FROM Demande c JOIN c.departement d WHERE d.id = :departementId AND c.statut = :statut")
//    Integer countStatutByDepartementId(@Param("departementId") Long departementId, @Param("statut") Statut statut);
//
//    @Query("SELECT COUNT(c) FROM Demande ")
//    Integer countAll();
//
//    @Query("SELECT COUNT(c) FROM Demande c JOIN c.departement d WHERE d.id = :departementId ")
//    Integer countByDepartementId(@Param("departementId") Long departementId);
}

