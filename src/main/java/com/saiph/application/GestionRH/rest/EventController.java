package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.EventDto;
import com.saiph.application.GestionRH.Domain.entities.Event;
import com.saiph.application.GestionRH.services.EventCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/event")
@Tag(name = "EventController")
public class EventController extends GenericCrudController<Event, EventDto> {
    public final EventCrudService eventCrudService;

    @Autowired
    public EventController( EventCrudService eventCrudService) {
        this.eventCrudService = eventCrudService;

    }

    @Override
    protected GenericCrudService<Event, EventDto> getCrudService() {
        return eventCrudService;
    }
}
