package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.EventDto;
import com.saiph.application.GestionRH.Domain.entities.Event;
import com.saiph.application.GestionRH.services.EventCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import com.saiph.application.GestionRH.services.UtilisateurCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/event")
@Tag(name = "Event")
public class EventController extends GenericCrudController<Event, EventDto> {
    public final EventCrudService eventCrudService;
    private final UtilisateurCrudService utilisateurCrudService;


    @Autowired
    public EventController(EventCrudService eventCrudService, UtilisateurCrudService utilisateurCrudService) {
        this.eventCrudService = eventCrudService;
        this.utilisateurCrudService = utilisateurCrudService;
    }


    @PostMapping("/addEmploye/{id}")
    public ResponseEntity<Void> addEmployeToEvent(@PathVariable("id") Long id, @Valid @RequestBody Long  addEmploye) {
        try {
            eventCrudService.AddEmploye(utilisateurCrudService.findById( addEmploye), eventCrudService.findById(id)) ;
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle exceptions appropriately, log errors etc.
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    protected GenericCrudService<Event, EventDto> getCrudService() {
        return eventCrudService;
    }
}
