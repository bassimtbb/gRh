package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demandes.Acompte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AcompteRepository extends JpaRepository<Acompte,Long> {
    @Override
    Optional<Acompte> findById(Long aLong);
}
