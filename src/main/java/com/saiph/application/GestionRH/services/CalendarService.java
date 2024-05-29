package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.entities.Demandes.Conge;
import com.saiph.application.GestionRH.Domain.entities.Event;
import com.saiph.application.GestionRH.Domain.entities.Formation;
import com.saiph.application.GestionRH.repository.DemandesRepository.CongeRepository;
import com.saiph.application.GestionRH.repository.EventRepository;
import com.saiph.application.GestionRH.repository.FormationRepository;
import com.saiph.application.GestionRH.services.DemandesCrudService.CongeCrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final EventRepository eventRepository;
    private final FormationRepository formationRepository;
    private final CongeCrudService congeService;

    public List<Event> getEventsByUserId(Long userId) {
        return eventRepository.findAllEventsByUserId(userId)
                .orElseThrow(() -> new RuntimeException("No events found for user with ID " + userId));
    }

    public List<Formation> getFormationsByUserId(Long userId) {
        return formationRepository.findAllFormationsByUserId(userId)
                .orElseThrow(() -> new RuntimeException("No formations found fo;r user with ID " + userId));
    }

public List<Conge> getCongesByUserId(Long userId) {
    List<Conge> conges = congeService.getDemandeValidByUtilisateurId(userId);
    if (conges.isEmpty()) {
        throw new RuntimeException("No conge found for user with ID " + userId);
    }
    return conges;
}

}
