package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.FormationDto;
import com.saiph.application.GestionRH.Domain.entities.Formation;
import com.saiph.application.GestionRH.repository.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public  class FormationCrudService extends GenericCrudService<Formation, FormationDto> {
    private final FormationRepository formationRepository;

    @Autowired
    public FormationCrudService(FormationRepository formationRepository) {
        this.formationRepository = formationRepository;

    }

    @Override
    protected CrudRepository getRepository() {
        return formationRepository;
    }


}

