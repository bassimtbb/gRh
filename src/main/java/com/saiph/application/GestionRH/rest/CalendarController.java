package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.entities.Demandes.Conge;
import com.saiph.application.GestionRH.Domain.entities.Event;
import com.saiph.application.GestionRH.Domain.entities.Formation;
import com.saiph.application.GestionRH.services.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/events/{userId}")
    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable Long userId) {
        List<Event> events = calendarService.getEventsByUserId(userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/formations/{userId}")
    public ResponseEntity<List<Formation>> getFormationsByUserId(@PathVariable Long userId) {
        List<Formation> formations = calendarService.getFormationsByUserId(userId);
        return ResponseEntity.ok(formations);
    }

   @GetMapping("/conges/{userId}")
    public ResponseEntity<List<Conge>> getCongesByUserId(@PathVariable Long userId) {
        List<Conge> conges = calendarService.getCongesByUserId(userId);
        return ResponseEntity.ok(conges);
    }
}



