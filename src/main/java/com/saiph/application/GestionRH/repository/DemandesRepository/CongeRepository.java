package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demande;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Conge;
import com.saiph.application.GestionRH.Enum.Statut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface CongeRepository extends JpaRepository<Conge, Long> {
    @Override
    Optional<Conge> findById(Long aLong);

    @Query("SELECT c FROM Conge c JOIN c.departement d WHERE d.id = :departementId AND c.statut = :statut")
    List<Conge> findValidByDepartementId(@Param("departementId") Long departementId, @Param("statut") Statut statut);

        @Query("SELECT c FROM Conge c JOIN c.utilisateur d WHERE d.id = :utilisateurId AND c.statut = :statut")
    List<Conge> findValidByUserId(@Param("utilisateurId") Long utilisateurId, @Param("statut") Statut statut);
    List<Conge> findByStatut(Statut statut);
//
//    @Query("SELECT COUNT(c) FROM Conge c JOIN c.departement d WHERE d.id = :departementId AND c.statut = :statut")
//    Integer countStatutByDepartementId(@Param("departementId") Long departementId, @Param("statut") Statut statut);
//
//    @Query("SELECT COUNT(c) FROM Conge ")
//    Integer countAll();
//
//    @Query("SELECT COUNT(c) FROM Conge c JOIN c.departement d WHERE d.id = :departementId ")
//    Integer countByDepartementId(@Param("departementId") Long departementId);
}