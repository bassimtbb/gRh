package com.saiph.application.GestionRH.services.DemandesCrudService;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.CongeDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Conge;
import com.saiph.application.GestionRH.repository.DemandesRepository.CongeRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CongeCrudService  extends GenericCrudService<Conge, CongeDto> {

    private CongeRepository congeRepository;

    @Autowired
    public CongeCrudService(CongeRepository congeRepository) {
        this.congeRepository = congeRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return congeRepository;
    }
}