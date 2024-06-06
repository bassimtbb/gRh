package com.saiph.application.GestionRH.services;


import com.saiph.application.GestionRH.Domain.dto.EventDto;
import com.saiph.application.GestionRH.Domain.dto.FormationDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.Statistique.*;
import com.saiph.application.GestionRH.Enum.Statut;
import com.saiph.application.GestionRH.repository.DemandesRepository.*;
import com.saiph.application.GestionRH.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatistiqueService {
    private final DepartementRepository departementRepository;
    private final DepartementCrudService departementService;
    private final FormationCrudService formationService;
    private final EventCrudService eventService;
    private final FormationRepository formationRepository;
    private final EventRepository eventRepository;
    private final DemandeRepository demandeRepository;
    private final AcompteRepository acompteRepository;
    private final AutorisationSortieRepository autorisationSortieRepository;
    private final AutorisationTeletravailRepository autorisationTeletravailRepository;
    private final AutorisationTravailSupRepository autorisationTravailSupRepository;
    private final ChangementHoraireRepository changementHoraireRepository;
    private final CongeRepository congeRepository;
    private final PretRepository pretRepository;


    public StatistiqueDemandeResult getStatistiqueDemande() {
        StatistiqueDemandeResult result = new StatistiqueDemandeResult();
        // Demande counts
        result.setDemandeCount(demandeRepository.countAll());
        result.setDemandeCountEn_attente_Sup_H(demandeRepository.countByStatut(Statut.En_attente_Sup_H));
        result.setDemandeCountRefusee_Sup_H(demandeRepository.countByStatut(Statut.Refusee_Sup_H));
        result.setDemandeCountEn_attente_RRH(demandeRepository.countByStatut(Statut.En_attente_RRH));
        result.setDemandeCountValidee(demandeRepository.countByStatut(Statut.Validee));
        result.setDemandeCountRefusee(demandeRepository.countByStatut(Statut.Refusee));

        // acompte counts
        result.setAcompteCount(acompteRepository.countAll());
        result.setAcompteCountEn_attente_Sup_H(acompteRepository.countByStatut(Statut.En_attente_Sup_H));
        result.setAcompteCountRefusee_Sup_H(acompteRepository.countByStatut(Statut.Refusee_Sup_H));
        result.setAcompteCountEn_attente_RRH(acompteRepository.countByStatut(Statut.En_attente_RRH));
        result.setAcompteCountValidee(acompteRepository.countByStatut(Statut.Validee));
        result.setAcompteCountRefusee(acompteRepository.countByStatut(Statut.Refusee));

        // AutorisationSortie counts
        result.setAutorisationSortieCount(autorisationSortieRepository.countAll());
        result.setAutorisationSortieCountEn_attente_Sup_H(autorisationSortieRepository.countByStatut(Statut.En_attente_Sup_H));
        result.setAutorisationSortieCountRefusee_Sup_H(autorisationSortieRepository.countByStatut(Statut.Refusee_Sup_H));
        result.setAutorisationSortieCountEn_attente_RRH(autorisationSortieRepository.countByStatut(Statut.En_attente_RRH));
        result.setAutorisationSortieCountValidee(autorisationSortieRepository.countByStatut(Statut.Validee));
        result.setAutorisationSortieCountRefusee(autorisationSortieRepository.countByStatut(Statut.Refusee));

        // AutorisationTeletravail counts
        result.setAutorisationTeletravailCount(autorisationTeletravailRepository.countAll());
        result.setAutorisationTeletravailCountEn_attente_Sup_H(autorisationTeletravailRepository.countByStatut(Statut.En_attente_Sup_H));
        result.setAutorisationTeletravailCountRefusee_Sup_H(autorisationTeletravailRepository.countByStatut(Statut.Refusee_Sup_H));
        result.setAutorisationTeletravailCountEn_attente_RRH(autorisationTeletravailRepository.countByStatut(Statut.En_attente_RRH));
        result.setAutorisationTeletravailCountValidee(autorisationTeletravailRepository.countByStatut(Statut.Validee));
        result.setAutorisationTeletravailCountRefusee(autorisationTeletravailRepository.countByStatut(Statut.Refusee));

        // AutorisationTravailSup counts
        result.setAutorisationTravailSupCount(autorisationTravailSupRepository.countAll());
        result.setAutorisationTravailSupCountEn_attente_Sup_H(autorisationTravailSupRepository.countByStatut(Statut.En_attente_Sup_H));
        result.setAutorisationTravailSupCountRefusee_Sup_H(autorisationTravailSupRepository.countByStatut(Statut.Refusee_Sup_H));
        result.setAutorisationTravailSupCountEn_attente_RRH(autorisationTravailSupRepository.countByStatut(Statut.En_attente_RRH));
        result.setAutorisationTravailSupCountValidee(autorisationTravailSupRepository.countByStatut(Statut.Validee));
        result.setAutorisationTravailSupCountRefusee(autorisationTravailSupRepository.countByStatut(Statut.Refusee));

        // ChangementHoraire counts
        result.setChangementHoraireCount(changementHoraireRepository.countAll());
        result.setChangementHoraireCountEn_attente_Sup_H(changementHoraireRepository.countByStatut(Statut.En_attente_Sup_H));
        result.setChangementHoraireCountRefusee_Sup_H(changementHoraireRepository.countByStatut(Statut.Refusee_Sup_H));
        result.setChangementHoraireCountEn_attente_RRH(changementHoraireRepository.countByStatut(Statut.En_attente_RRH));
        result.setChangementHoraireCountValidee(changementHoraireRepository.countByStatut(Statut.Validee));
        result.setChangementHoraireCountRefusee(changementHoraireRepository.countByStatut(Statut.Refusee));

        // Conge counts
        result.setCongeCount(congeRepository.countAll());
        result.setCongeCountEn_attente_Sup_H(congeRepository.countByStatut(Statut.En_attente_Sup_H));
        result.setCongeCountRefusee_Sup_H(congeRepository.countByStatut(Statut.Refusee_Sup_H));
        result.setCongeCountEn_attente_RRH(congeRepository.countByStatut(Statut.En_attente_RRH));
        result.setCongeCountValidee(congeRepository.countByStatut(Statut.Validee));
        result.setCongeCountRefusee(congeRepository.countByStatut(Statut.Refusee));

        result.setPretCount(pretRepository.countAll());
        result.setPretCountEn_attente_Sup_H(pretRepository.countByStatut(Statut.En_attente_Sup_H));
        result.setPreCountRefusee_Sup_H(pretRepository.countByStatut(Statut.Refusee_Sup_H));
        result.setPretCountEn_attente_RRH(pretRepository.countByStatut(Statut.En_attente_RRH));
        result.setPretCountValidee(pretRepository.countByStatut(Statut.Validee));
        result.setPretCountRefusee(pretRepository.countByStatut(Statut.Refusee));
        return result;
    }

    public StatistiqueDemandeByDepartementResult getStatistiqueDemandeByDepartement(Long departementId) {
        StatistiqueDemandeByDepartementResult result = new StatistiqueDemandeByDepartementResult();
        // Demande counts
        result.setDemandeCountByDepartement(demandeRepository.countByDepartementId(departementId));
        result.setDemandeEn_attente_Sup_HCountByDepartement(demandeRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
        result.setDemandeRefusee_Sup_HCountByDepartement(demandeRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
        result.setDemandeEn_attente_RRHCountByDepartement(demandeRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
        result.setDemandeValideeCountByDepartement(demandeRepository.countStatutByDepartementId(departementId, Statut.Validee));
        result.setDemandeRefuseeCountByDepartement(demandeRepository.countStatutByDepartementId(departementId, Statut.Refusee));


        // acompte counts
        result.setAcompteCountByDepartement(acompteRepository.countByDepartementId(departementId));
        result.setAcompteEn_attente_Sup_HCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
        result.setAcompteRefusee_Sup_HCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
        result.setAcompteEn_attente_RRHCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
        result.setAcompteValideeCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.Validee));
        result.setAcompteRefuseeCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.Refusee));


        // AutorisationSortie counts
        result.setAutorisationSortieCountByDepartement(autorisationSortieRepository.countByDepartementId(departementId));
        result.setAutorisationSortieEn_attente_Sup_HCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
        result.setAutorisationSortieRefusee_Sup_HCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
        result.setAutorisationSortieEn_attente_RRHCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
        result.setAutorisationSortieValideeCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.Validee));
        result.setAutorisationSortieRefuseeCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.Refusee));


        // AutorisationTeletravail counts
        result.setAutorisationTeletravailCountByDepartement(autorisationTeletravailRepository.countByDepartementId(departementId));
        result.setAutorisationTeletravailEn_attente_Sup_HCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
        result.setAutorisationTeletravailRefusee_Sup_HCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
        result.setAutorisationTeletravailEn_attente_RRHCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
        result.setAutorisationTeletravailValideeCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.Validee));
        result.setAutorisationTeletravailRefuseeCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.Refusee));


        // AutorisationTravailSup counts
        result.setAutorisationTravailSupCountByDepartement(autorisationTravailSupRepository.countByDepartementId(departementId));
        result.setAutorisationTravailSupEn_attente_Sup_HCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
        result.setAutorisationTravailSupRefusee_Sup_HCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
        result.setAutorisationTravailSupEn_attente_RRHCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
        result.setAutorisationTravailSupValideeCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.Validee));
        result.setAutorisationTravailSupRefuseeCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.Refusee));


        // ChangementHoraire counts
        result.setChangementHoraireCountByDepartement(changementHoraireRepository.countByDepartementId(departementId));
        result.setChangementHoraireEn_attente_Sup_HCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
        result.setChangementHoraireRefusee_Sup_HCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
        result.setChangementHoraireEn_attente_RRHCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
        result.setChangementHoraireValideeCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.Validee));
        result.setChangementHoraireRefuseeCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.Refusee));


        // Conge counts
        result.setCongeCountByDepartement(congeRepository.countByDepartementId(departementId));
        result.setCongeEn_attente_Sup_HCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
        result.setCongeRefusee_Sup_HCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
        result.setCongeEn_attente_RRHCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
        result.setCongeRefuseeCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.Validee));
        result.setCongeValideeCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.Refusee));


        // Pret counts
        result.setPretCountByDepartement(pretRepository.countByDepartementId(departementId));
        result.setPretEn_attente_Sup_HCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
        result.setPretRefusee_Sup_HCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
        result.setPretEn_attente_RRHCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
        result.setPretValideeCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.Validee));
        result.setPretRefuseeCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.Refusee));


        return result;
    }

    public StatistiqueGeneraleResult getStatistiqueGenerale() {
        StatistiqueGeneraleResult result = new StatistiqueGeneraleResult();
        result.setEventCount(eventRepository.countAll());
        result.setFormationCount(formationRepository.countAll());
        return result;
    }

        public StatistiqueUserByDepartementResult getStatistiqueUserByDepartement(Long departementId) {
        StatistiqueUserByDepartementResult result = new StatistiqueUserByDepartementResult();
        Departement departement=departementService.findByIdEn(departementId);
        result.setNumUser(departementRepository.countEmployeByDepartementId(departementId));
        result.setNameDep(departement.getName());
        return result;
    }


    public StatistiqueEventResult getStatistiqueEventByEventID(Long eventId) {
    StatistiqueEventResult result = new StatistiqueEventResult();
    EventDto event = eventService.findById(eventId);

    // Count the number of employees registered for the event
    int countEmployeeRegistered = event.getListEmploye().size();
    result.setEventCountEmployeeRegistered(countEmployeeRegistered);
    result.setEventTitre(event.getTitre());

    // Count the total number of seats available for the event
    int eventNumberOfSeats = event.getNbrPlace();
    result.setEventNumberOfSeats(eventNumberOfSeats);

    // Calculate the percentage of seats filled
    if (eventNumberOfSeats != 0) {
        double percentageFilled = ((double) countEmployeeRegistered / eventNumberOfSeats) * 100;
        result.setEventPourcentage(percentageFilled);
    } else {
        result.setEventPourcentage(0); // To avoid division by zero error
    }

    return result;
}
public StatistiqueFormationResult getStatistiqueFormationByFormationID(Long formationId) {
    StatistiqueFormationResult result = new StatistiqueFormationResult();
    FormationDto formation = formationService.findById(formationId);

    // Count the number of employees registered for the formation
    int countEmployeeRegistered = formation.getListEmploye().size();
    result.setFormationCountEmployeeRegistered(countEmployeeRegistered);
    result.setFormationTitre(formation.getTitre());

    // Count the total number of seats available for the formation
    int formationNumberOfSeats = formation.getNbrPlace();
    result.setFormationNumberOfSeats(formationNumberOfSeats);

    // Calculate the percentage of seats filled
    if (formationNumberOfSeats != 0) {
        double percentageFilled = ((double) countEmployeeRegistered / formationNumberOfSeats) * 100;
        result.setFormationPourcentage(percentageFilled);
    } else {
        result.setFormationPourcentage(0); // To avoid division by zero error
    }

    return result;
}

}
