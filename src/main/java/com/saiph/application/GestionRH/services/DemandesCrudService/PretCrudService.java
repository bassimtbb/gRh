package com.saiph.application.GestionRH.services.DemandesCrudService;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.PretDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Pret;
import com.saiph.application.GestionRH.repository.DemandesRepository.PretRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PretCrudService  extends GenericCrudService<Pret, PretDto> {

    private PretRepository pretRepository;

    @Autowired
    public PretCrudService(PretRepository pretRepository) {
        this.pretRepository = pretRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return pretRepository;
    }
}