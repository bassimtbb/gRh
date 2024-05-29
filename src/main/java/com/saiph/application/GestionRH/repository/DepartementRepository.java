package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartementRepository extends JpaRepository<Departement,Long> {
    @Override
    Optional<Departement> findById(Long aLong);
//    @Query("SELECT COUNT(d) FROM departement_list_employe  WHERE d.id = :departementId  ")
//    Integer countEmployeByDepartementId(@Param("departementId") Long departementId);
}
