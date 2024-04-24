package com.saiph.application.GestionRH.repository.DemandesRepository;

import com.saiph.application.GestionRH.Domain.entities.Demandes.ChangementHoraire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ChangementHoraireRepository extends JpaRepository<ChangementHoraire,Long> {
}