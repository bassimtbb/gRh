package com.saiph.application.GestionRH.services.DemandesCrudService;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.AutorisationTeletravailDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationTeletravail;
import com.saiph.application.GestionRH.repository.DemandesRepository.AutorisationTeletravailRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AutorisationTeletravailCrudService  extends GenericCrudService<AutorisationTeletravail, AutorisationTeletravailDto> {

    private AutorisationTeletravailRepository autorisationTeletravailRepository;
    @Autowired
    public AutorisationTeletravailCrudService(AutorisationTeletravailRepository autorisationTeletravailRepository) {
        this.autorisationTeletravailRepository = autorisationTeletravailRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return autorisationTeletravailRepository;
    }
}