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

    @GetMapping("/events/User/{userId}")
    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable Long userId) {
        List<Event> events = calendarService.getEventsByUserId(userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/formations/User/{userId}")
    public ResponseEntity<List<Formation>> getFormationsByUserId(@PathVariable Long userId) {
        List<Formation> formations = calendarService.getFormationsByUserId(userId);
        return ResponseEntity.ok(formations);
    }

   @GetMapping("/conges/User/{userId}")
    public ResponseEntity<List<Conge>> getCongesByUserId(@PathVariable Long userId) {
        List<Conge> conges = calendarService.getCongesByUserId(userId);
        return ResponseEntity.ok(conges);
    }
       @GetMapping("/conges/Departement/{departementId}")
    public ResponseEntity<List<Conge>> getCongesByDepartementId(@PathVariable Long departementId) {
        List<Conge> conges = calendarService.getCongesByDepartementId(departementId);
        return ResponseEntity.ok(conges);
    }
    @GetMapping("/conges")
    public ResponseEntity<List<Conge>> getConges() {
        List<Conge> conges = calendarService.getAllCongeValid();
        return ResponseEntity.ok(conges);
    }
        @GetMapping("/events")
    public ResponseEntity<List<Event>> getEvents() {
        List<Event> events = calendarService.findAllEvent();
        return ResponseEntity.ok(events);
    }
            @GetMapping("/formations")
    public ResponseEntity<List<Formation>> getFormations() {
        List<Formation> formations = calendarService.findAllFormation();
        return ResponseEntity.ok(formations);
    }
}



