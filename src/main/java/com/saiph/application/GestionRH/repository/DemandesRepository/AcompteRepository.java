package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demandes.Acompte;
import com.saiph.application.GestionRH.Enum.Statut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface AcompteRepository extends JpaRepository<Acompte, Long> {

    @Override
    Optional<Acompte> findById(Long aLong);
        @Query("SELECT COUNT(a) FROM Acompte a WHERE a.statut = :statut")
    Integer countByStatut(@Param("statut") Statut statut) ;
    @Query("SELECT COUNT(a) FROM Acompte a WHERE a.departement.id = :departementId AND a.statut = :statut")
    Integer countStatutByDepartementId(@Param("departementId") Long departementId, @Param("statut") Statut statut);

    @Query("SELECT COUNT(a) FROM Acompte a")
    Integer countAll();

    @Query("SELECT COUNT(a) FROM Acompte a WHERE a.departement.id = :departementId")
    Integer countByDepartementId(@Param("departementId") Long departementId);
}
