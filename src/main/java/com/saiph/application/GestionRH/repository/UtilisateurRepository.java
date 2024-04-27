package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {


    Optional<Utilisateur> findByEmail(String email);

}
