package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.EventDto;
import com.saiph.application.GestionRH.Domain.entities.Event;
import com.saiph.application.GestionRH.services.EventCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/event")
@Tag(name = "Event")
public class EventController extends GenericCrudController<Event, EventDto> {
    public final EventCrudService eventCrudService;

    @Override
    public ResponseEntity<List<EventDto>> findAll() {
        return super.findAll();
    }

    @PostMapping("/addEmploye/{id}")
    public ResponseEntity<Void> addEmployeToEvent(@PathVariable("id") Long IdEvent, @Valid @RequestBody Long  IdUser) {
        try {
            eventCrudService.AddEmploye(IdUser, IdEvent) ;
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
