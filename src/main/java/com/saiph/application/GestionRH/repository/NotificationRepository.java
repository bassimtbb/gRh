package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    @Override
    Optional<Notification> findById(Long aLong);
    List<Notification> findByStatut(Boolean statut);


}
