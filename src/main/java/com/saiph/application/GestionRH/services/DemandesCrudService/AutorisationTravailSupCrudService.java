package com.saiph.application.GestionRH.services.DemandesCrudService;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.AutorisationTravailSupDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationTravailSup;
import com.saiph.application.GestionRH.repository.DemandesRepository.AutorisationTravailSupRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AutorisationTravailSupCrudService  extends GenericCrudService<AutorisationTravailSup, AutorisationTravailSupDto> {

    private AutorisationTravailSupRepository autorisationTravailSupRepository;

@Autowired
public AutorisationTravailSupCrudService(AutorisationTravailSupRepository autorisationTravailSupRepository) {
        this.autorisationTravailSupRepository = autorisationTravailSupRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return autorisationTravailSupRepository;
    }


}