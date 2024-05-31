package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationTeletravail;
import com.saiph.application.GestionRH.Enum.Statut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AutorisationTeletravailRepository extends JpaRepository<AutorisationTeletravail, Long> {

    @Override
    Optional<AutorisationTeletravail> findById(Long aLong);
        @Query("SELECT COUNT(a) FROM AutorisationTeletravail a WHERE a.statut = :statut")
    Integer countByStatut(@Param("statut") Statut statut) ;
    @Query("SELECT COUNT(a) FROM AutorisationTeletravail a WHERE a.departement.id = :departementId AND a.statut = :statut")
    Integer countStatutByDepartementId(@Param("departementId") Long departementId, @Param("statut") Statut statut);

    @Query("SELECT COUNT(a) FROM AutorisationTeletravail a")
    Integer countAll();

    @Query("SELECT COUNT(a) FROM AutorisationTeletravail a WHERE a.departement.id = :departementId")
    Integer countByDepartementId(@Param("departementId") Long departementId);
}
