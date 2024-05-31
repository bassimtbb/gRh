package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.EventDto;
import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.Event;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.repository.EventRepository;
import com.saiph.application.GestionRH.security.UserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public  class EventCrudService extends GenericCrudService<Event, EventDto> {
    private final EventRepository eventRepository;
    private final UserDetailService userService;

    @Override
    public List<EventDto> findAll() {
        return super.findAll();
    }

    @Override
    protected CrudRepository getRepository() {
        return eventRepository;
    }

   public void AddEmploye (Long IdUser, Long IdEvent){
        UserDto userDto = userService.findById( IdUser);
        EventDto eventDto=findById(IdEvent);
        User utilisateur=userService.convertToEntity(userDto);
        Event event= convertToEntity(eventDto);
        event.getListEmploye().add(utilisateur);
     eventRepository.save(event);
    }

}

