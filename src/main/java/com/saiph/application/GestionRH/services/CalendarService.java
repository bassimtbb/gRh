package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.EventDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Conge;
import com.saiph.application.GestionRH.Domain.entities.Event;
import com.saiph.application.GestionRH.Domain.entities.Formation;
import com.saiph.application.GestionRH.Enum.Statut;
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
    private final CongeRepository congeRepository;

    public List<Event> getEventsByUserId(Long userId) {
        return eventRepository.findAllEventsByUserId(userId)
                .orElseThrow(() -> new RuntimeException("No events found for user with ID " + userId));
    }

    public List<Formation> getFormationsByUserId(Long userId) {
        return formationRepository.findAllFormationsByUserId(userId)
                .orElseThrow(() -> new RuntimeException("No formations found fo;r user with ID " + userId));
    }

    public List<Conge> getCongesByUserId(Long userId) {
        Statut validStatut = Statut.Validee;
        List<Conge> conges = congeRepository.findValidByUserId(userId, validStatut);
        if (conges.isEmpty()) {
            throw new RuntimeException("No conge found for user with ID " + userId);
        }
        return conges;
    }

    public List<Conge> getCongesByDepartementId(Long departementId) {
        Statut validStatut = Statut.Validee;
        List<Conge> conges = congeRepository.findValidByDepartementId(departementId, validStatut);
        if (conges.isEmpty()) {
            throw new RuntimeException("No conge found for departementId " + departementId);
        }
        return conges;
    }

    public List<Conge> getAllCongeValid() {
        Statut validStatut = Statut.Validee;
        return congeRepository.findByStatut(validStatut);
    }

    public List<Event> findAllEvent() {
        return eventRepository.findAll();
    }

    public List<Formation> findAllFormation() {
        return formationRepository.findAll();
    }
}
