package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Departement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartementRepository extends JpaRepository<Departement,Long> {

}
