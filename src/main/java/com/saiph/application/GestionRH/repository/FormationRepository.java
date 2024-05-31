package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormationRepository extends JpaRepository<Formation,Long> {

    @Override
    Optional<Formation> findById(Long id);
   @Query("SELECT COUNT(u) FROM Formation e JOIN e.ListEmploye u WHERE e.id = :formationId")
    Integer countEmployeByFormationId(@Param("formationId") Long formationId);
     @Query("SELECT f FROM Formation f JOIN f.ListEmploye u WHERE u.id = :userId")
    Optional<List<Formation>> findAllFormationsByUserId(@Param("userId") Long userId);
}
