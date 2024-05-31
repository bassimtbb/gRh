package com.saiph.application.GestionRH.repository;

import com.saiph.application.GestionRH.Domain.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {


    @Query("SELECT COUNT(u) FROM Event e JOIN e.ListEmploye u WHERE e.id = :eventId")
    Integer countEmployeByEventId(@Param("eventId") Long eventId);
 @Query("SELECT E FROM Event E JOIN E.ListEmploye u WHERE u.id = :userId")
 Optional<List<Event>> findAllEventsByUserId(@Param("userId") Long userId);
}
