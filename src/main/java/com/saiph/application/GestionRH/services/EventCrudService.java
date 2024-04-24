package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.EventDto;
import com.saiph.application.GestionRH.Domain.entities.Event;
import com.saiph.application.GestionRH.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public  class EventCrudService extends GenericCrudService<Event, EventDto> {
    private final EventRepository eventRepository;

    @Autowired
    public EventCrudService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;

    }

    @Override
    protected CrudRepository getRepository() {
        return eventRepository;
    }


}

