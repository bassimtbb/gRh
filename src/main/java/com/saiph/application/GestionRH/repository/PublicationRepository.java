package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicationRepository extends JpaRepository<Publication,Long> {
}
