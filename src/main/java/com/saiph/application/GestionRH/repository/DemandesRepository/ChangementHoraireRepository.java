package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demandes.ChangementHoraire;
import com.saiph.application.GestionRH.Enum.Statut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.repository.query.Param;

@Repository
public interface ChangementHoraireRepository extends JpaRepository<ChangementHoraire, Long> {
    @Override
    Optional<ChangementHoraire> findById(Long aLong);

//    @Query("SELECT COUNT(c) FROM ChangementHoraire c JOIN c.departement d WHERE d.id = :departementId AND c.statut = :statut")
//    Integer countStatutByDepartementId(@Param("departementId") Long departementId, @Param("statut") Statut statut);
//
//    @Query("SELECT COUNT(c) FROM ChangementHoraire ")
//    Integer countAll();
//
//    @Query("SELECT COUNT(c) FROM ChangementHoraire c JOIN c.departement d WHERE d.id = :departementId ")
//    Integer countByDepartementId(@Param("departementId") Long departementId);

}