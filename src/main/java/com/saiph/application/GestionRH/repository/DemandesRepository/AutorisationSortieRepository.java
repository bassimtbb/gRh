package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationSortie;
import com.saiph.application.GestionRH.Enum.Statut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AutorisationSortieRepository extends JpaRepository<AutorisationSortie, Long> {

    @Override
    Optional<AutorisationSortie> findById(Long aLong);
        @Query("SELECT COUNT(a) FROM AutorisationSortie a WHERE a.statut = :statut")
    Integer countByStatut(@Param("statut") Statut statut) ;
    @Query("SELECT COUNT(a) FROM AutorisationSortie a WHERE a.departement.id = :departementId AND a.statut = :statut")
    Integer countStatutByDepartementId(@Param("departementId") Long departementId, @Param("statut") Statut statut);

    @Query("SELECT COUNT(a) FROM AutorisationSortie a")
    Integer countAll();

    @Query("SELECT COUNT(a) FROM AutorisationSortie a WHERE a.departement.id = :departementId")
    Integer countByDepartementId(@Param("departementId") Long departementId);
}
