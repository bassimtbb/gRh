package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.EventDto;
import com.saiph.application.GestionRH.Domain.dto.UtilisateurDto;
import com.saiph.application.GestionRH.Domain.entities.Event;
import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import com.saiph.application.GestionRH.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public  class EventCrudService extends GenericCrudService<Event, EventDto> {
    private final EventRepository eventRepository;
    private final UtilisateurCrudService utilisateurCrudService;

    @Autowired
    public EventCrudService(EventRepository eventRepository, UtilisateurCrudService utilisateurCrudService) {
        this.eventRepository = eventRepository;

        this.utilisateurCrudService = utilisateurCrudService;
    }

    @Override
    protected CrudRepository getRepository() {
        return eventRepository;
    }

   public void AddEmploye (UtilisateurDto utilisateurDto, EventDto eventDto){
        Utilisateur utilisateur=utilisateurCrudService.convertToEntity(utilisateurDto);
        Event event= convertToEntity(eventDto);
        event.getListEmploye().add(utilisateur);

     eventRepository.save(event);
    }

}

