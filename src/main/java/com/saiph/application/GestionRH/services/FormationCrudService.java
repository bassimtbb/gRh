package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.FormationDto;
import com.saiph.application.GestionRH.Domain.dto.UtilisateurDto;
import com.saiph.application.GestionRH.Domain.entities.Formation;
import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.repository.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FormationCrudService extends GenericCrudService<Formation, FormationDto> {
    private final FormationRepository formationRepository;
    private final UtilisateurCrudService utilisateurCrudService;

    @Autowired
    public FormationCrudService(FormationRepository formationRepository, UtilisateurCrudService utilisateurCrudService) {
        this.formationRepository = formationRepository;

        this.utilisateurCrudService = utilisateurCrudService;
    }

    public void AddEmploye(UtilisateurDto utilisateurDto, FormationDto formationDto)  {
        Utilisateur utilisateur = utilisateurCrudService.convertToEntity(utilisateurDto);
        Formation formation = convertToEntity(formationDto);
        formation.getListEmploye().add(utilisateur);




            formationRepository.save(formation);

    }

    @Override
    protected Formation convertToEntity(FormationDto entityDto) {
        return super.convertToEntity(entityDto);
    }

    @Override
    protected CrudRepository getRepository() {
        return formationRepository;
    }


}

