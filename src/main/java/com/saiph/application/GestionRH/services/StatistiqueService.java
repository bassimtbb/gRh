package com.saiph.application.GestionRH.services;


import com.saiph.application.GestionRH.Domain.entities.StatistiqueDemandeByDepartementResult;
import com.saiph.application.GestionRH.Enum.Statut;
import com.saiph.application.GestionRH.repository.DemandesRepository.*;
import com.saiph.application.GestionRH.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatistiqueService {
    private final DepartementRepository departementRepository;
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

    public Integer countEmployeByDepartementId(Long departementId) {
        return departementRepository.countEmployeByDepartementId(departementId);
    }

    public Integer countEmployeByEventId(Long eventId) {
        return eventRepository.countEmployeByEventId(eventId);
    }
    public Integer countEmployeByFormationId(Long formationId) {
        return formationRepository.countEmployeByFormationId(formationId);
    }

    public Integer acompteCountByDepartementId(Long departementId) {
        return acompteRepository.countByDepartementId(departementId);
    }

    public Integer acompteCountStatutByDepartementId(Long departementId, Statut statut) {
        return acompteRepository.countStatutByDepartementId(departementId, statut);
    }

    public Integer acompteCountAll() {
        return acompteRepository.countAll();
    }

    public Integer AutorisationSortieCountByDepartementId(Long departementId) {
        return autorisationSortieRepository.countByDepartementId(departementId);
    }

    public Integer AutorisationSortieCountStatutByDepartementId(Long departementId, Statut statut) {
        return autorisationSortieRepository.countStatutByDepartementId(departementId, statut);
    }

    public Integer AutorisationSortieCountAll() {
        return autorisationSortieRepository.countAll();
    }

    public Integer AutorisationTeletravailCountByDepartementId(Long departementId) {
        return autorisationTeletravailRepository.countByDepartementId(departementId);
    }

    public Integer AutorisationTeletravailCountStatutByDepartementId(Long departementId, Statut statut) {
        return autorisationTeletravailRepository.countStatutByDepartementId(departementId, statut);
    }

    public Integer AutorisationTeletravailCountAll() {
        return autorisationTeletravailRepository.countAll();
    }

    public Integer AutorisationTravailSupCountByDepartementId(Long departementId) {
        return autorisationTravailSupRepository.countByDepartementId(departementId);
    }

    public Integer AutorisationTravailSupCountStatutByDepartementId(Long departementId, Statut statut) {
        return autorisationTravailSupRepository.countStatutByDepartementId(departementId, statut);
    }

    public Integer AutorisationTravailSupCountAll() {
        return autorisationTravailSupRepository.countAll();
    }

    public Integer ChangementHoraireCountByDepartementId(Long departementId) {
        return changementHoraireRepository.countByDepartementId(departementId);
    }

    public Integer ChangementHoraireCountStatutByDepartementId(Long departementId, Statut statut) {
        return changementHoraireRepository.countStatutByDepartementId(departementId, statut);
    }

    public Integer ChangementHoraireCountAll() {
        return changementHoraireRepository.countAll();
    }

    public Integer CongeCountByDepartementId(Long departementId) {
        return congeRepository.countByDepartementId(departementId);
    }

    public Integer CongeCountStatutByDepartementId(Long departementId, Statut statut) {
        return congeRepository.countStatutByDepartementId(departementId, statut);
    }

    public Integer CongeCountAll() {
        return congeRepository.countAll();
    }

    public Integer PretCountByDepartementId(Long departementId) {
        return pretRepository.countByDepartementId(departementId);
    }

    public Integer PretCountStatutByDepartementId(Long departementId, Statut statut) {
        return pretRepository.countStatutByDepartementId(departementId, statut);
    }

    public Integer PretCountAll() {
        return pretRepository.countAll();
    }
    public StatistiqueDemandeByDepartementResult getStatistique(Long departementId) {
        StatistiqueDemandeByDepartementResult result = new StatistiqueDemandeByDepartementResult();

    result.setAcompteCount( acompteRepository.countAll());
    result.setAcompteCountByDepartement(acompteRepository.countByDepartementId(departementId));
    result.setAcompteEn_attente_Sup_HCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
    result.setAcompteRefusee_Sup_HCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
    result.setAcompteEn_attente_RRHCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
    result.setAcompteValideeCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.Validee));
    result.setAcompteRefuseeCountByDepartement(acompteRepository.countStatutByDepartementId(departementId, Statut.Refusee));
    result.setAcompteCountEn_attente_Sup_H(acompteRepository.countByStatut(Statut.En_attente_Sup_H));
    result.setAcompteCountRefusee_Sup_H(acompteRepository.countByStatut(Statut.Refusee_Sup_H));
    result.setAcompteCountEn_attente_RRH(acompteRepository.countByStatut(Statut.En_attente_RRH));
    result.setAcompteCountValidee(acompteRepository.countByStatut(Statut.Validee));
    result.setAcompteCountRefusee(acompteRepository.countByStatut(Statut.Refusee));


    // AutorisationSortie counts
    result.setAutorisationSortieCount( autorisationSortieRepository.countAll());
    result.setAutorisationSortieCountByDepartement(autorisationSortieRepository.countByDepartementId(departementId));
    result.setAutorisationSortieEn_attente_Sup_HCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
    result.setAutorisationSortieRefusee_Sup_HCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
    result.setAutorisationSortieEn_attente_RRHCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
    result.setAutorisationSortieValideeCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.Validee));
    result.setAutorisationSortieRefuseeCountByDepartement(autorisationSortieRepository.countStatutByDepartementId(departementId, Statut.Refusee));
    result.setAutorisationSortieCountEn_attente_Sup_H(autorisationSortieRepository.countByStatut(Statut.En_attente_Sup_H));
    result.setAutorisationSortieCountRefusee_Sup_H(autorisationSortieRepository.countByStatut(Statut.Refusee_Sup_H));
    result.setAutorisationSortieCountEn_attente_RRH(autorisationSortieRepository.countByStatut(Statut.En_attente_RRH));
    result.setAutorisationSortieCountValidee(autorisationSortieRepository.countByStatut(Statut.Validee));
    result.setAutorisationSortieCountRefusee(autorisationSortieRepository.countByStatut(Statut.Refusee));


    // AutorisationTeletravail counts
    result.setAutorisationTeletravailCountByDepartement(autorisationTeletravailRepository.countByDepartementId(departementId));
    result.setAutorisationTeletravailCount( autorisationTeletravailRepository.countAll());
    result.setAutorisationTeletravailEn_attente_Sup_HCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
    result.setAutorisationTeletravailRefusee_Sup_HCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
    result.setAutorisationTeletravailEn_attente_RRHCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
    result.setAutorisationTeletravailValideeCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.Validee));
    result.setAutorisationTeletravailRefuseeCountByDepartement(autorisationTeletravailRepository.countStatutByDepartementId(departementId, Statut.Refusee));
    result.setAutorisationTeletravailCountEn_attente_Sup_H(autorisationTeletravailRepository.countByStatut(Statut.En_attente_Sup_H));
    result.setAutorisationTeletravailCountRefusee_Sup_H(autorisationTeletravailRepository.countByStatut(Statut.Refusee_Sup_H));
    result.setAutorisationTeletravailCountEn_attente_RRH(autorisationTeletravailRepository.countByStatut(Statut.En_attente_RRH));
    result.setAutorisationTeletravailCountValidee(autorisationTeletravailRepository.countByStatut(Statut.Validee));
    result.setAutorisationTeletravailCountRefusee(autorisationTeletravailRepository.countByStatut(Statut.Refusee));


    // AutorisationTravailSup counts
    result.setAutorisationTravailSupCountByDepartement(autorisationTravailSupRepository.countByDepartementId(departementId));
    result.setAutorisationTravailSupCount( autorisationTravailSupRepository.countAll());
    result.setAutorisationTravailSupEn_attente_Sup_HCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
    result.setAutorisationTravailSupRefusee_Sup_HCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
    result.setAutorisationTravailSupEn_attente_RRHCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
    result.setAutorisationTravailSupValideeCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.Validee));
    result.setAutorisationTravailSupRefuseeCountByDepartement(autorisationTravailSupRepository.countStatutByDepartementId(departementId, Statut.Refusee));
    result.setAutorisationTravailSupCountEn_attente_Sup_H(autorisationTravailSupRepository.countByStatut(Statut.En_attente_Sup_H));
    result.setAutorisationTravailSupCountRefusee_Sup_H(autorisationTravailSupRepository.countByStatut(Statut.Refusee_Sup_H));
    result.setAutorisationTravailSupCountEn_attente_RRH(autorisationTravailSupRepository.countByStatut(Statut.En_attente_RRH));
    result.setAutorisationTravailSupCountValidee(autorisationTravailSupRepository.countByStatut(Statut.Validee));
    result.setAutorisationTravailSupCountRefusee(autorisationTravailSupRepository.countByStatut(Statut.Refusee));


    // ChangementHoraire counts
    result.setChangementHoraireCountByDepartement(changementHoraireRepository.countByDepartementId(departementId));
    result.setChangementHoraireCount( changementHoraireRepository.countAll());
    result.setChangementHoraireEn_attente_Sup_HCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
    result.setChangementHoraireRefusee_Sup_HCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
    result.setChangementHoraireEn_attente_RRHCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
    result.setChangementHoraireValideeCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.Validee));
    result.setChangementHoraireRefuseeCountByDepartement(changementHoraireRepository.countStatutByDepartementId(departementId, Statut.Refusee));
    result.setChangementHoraireCountEn_attente_Sup_H(changementHoraireRepository.countByStatut(Statut.En_attente_Sup_H));
    result.setChangementHoraireCountRefusee_Sup_H(changementHoraireRepository.countByStatut(Statut.Refusee_Sup_H));
    result.setChangementHoraireCountEn_attente_RRH(changementHoraireRepository.countByStatut(Statut.En_attente_RRH));
    result.setChangementHoraireCountValidee(changementHoraireRepository.countByStatut(Statut.Validee));
    result.setChangementHoraireCountRefusee(changementHoraireRepository.countByStatut(Statut.Refusee));



    // Conge counts
    result.setCongeCountByDepartement(congeRepository.countByDepartementId(departementId));
    result.setCongeCount( congeRepository.countAll());
    result.setCongeEn_attente_Sup_HCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
    result.setCongeRefusee_Sup_HCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
    result.setCongeEn_attente_RRHCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
    result.setCongeRefuseeCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.Validee));
    result.setCongeValideeCountByDepartement(congeRepository.countStatutByDepartementId(departementId, Statut.Refusee));
    result.setCongeCountEn_attente_Sup_H(congeRepository.countByStatut(Statut.En_attente_Sup_H));
    result.setCongeCountRefusee_Sup_H(congeRepository.countByStatut(Statut.Refusee_Sup_H));
    result.setCongeCountEn_attente_RRH(congeRepository.countByStatut(Statut.En_attente_RRH));
    result.setCongeCountValidee(congeRepository.countByStatut(Statut.Validee));
    result.setCongeCountRefusee(congeRepository.countByStatut(Statut.Refusee));


    // Pret counts
    result.setPretCountByDepartement(pretRepository.countByDepartementId(departementId));
    result.setPretCount( pretRepository.countAll());
    result.setPretEn_attente_Sup_HCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.En_attente_Sup_H));
    result.setPretRefusee_Sup_HCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.Refusee_Sup_H));
    result.setPretEn_attente_RRHCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.En_attente_RRH));
    result.setPretValideeCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.Validee));
    result.setPretRefuseeCountByDepartement(pretRepository.countStatutByDepartementId(departementId, Statut.Refusee));
    result.setPretCountEn_attente_Sup_H(pretRepository.countByStatut(Statut.En_attente_Sup_H));
    result.setPreCountRefusee_Sup_H(pretRepository.countByStatut(Statut.Refusee_Sup_H));
    result.setPretCountEn_attente_RRH(pretRepository.countByStatut(Statut.En_attente_RRH));
    result.setPretCountValidee(pretRepository.countByStatut(Statut.Validee));
    result.setPretCountRefusee(pretRepository.countByStatut(Statut.Refusee));

        return result;
    }

}
