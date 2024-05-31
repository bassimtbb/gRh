package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demandes.Pret;
import com.saiph.application.GestionRH.Enum.Statut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PretRepository extends JpaRepository<Pret, Long> {

    @Override
    Optional<Pret> findById(Long aLong);
        @Query("SELECT COUNT(a) FROM Pret a WHERE a.statut = :statut")
    Integer countByStatut(@Param("statut") Statut statut) ;
    @Query("SELECT COUNT(p) FROM Pret p WHERE p.departement.id = :departementId AND p.statut = :statut")
    Integer countStatutByDepartementId(@Param("departementId") Long departementId, @Param("statut") Statut statut);

    @Query("SELECT COUNT(p) FROM Pret p WHERE p.departement.id = :departementId")
    Integer countByDepartementId(@Param("departementId") Long departementId);

    @Query("SELECT COUNT(p) FROM Pret p")
    Integer countAll();
}
