package com.saiph.application.GestionRH.services.DemandesCrudService;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.AcompteDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Acompte;
import com.saiph.application.GestionRH.repository.DemandesRepository.AcompteRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AcompteCrudService  extends GenericCrudService<Acompte, AcompteDto> {

    private AcompteRepository acompteRepository;


    @Autowired
    public AcompteCrudService(AcompteRepository acompteRepository) {
        this.acompteRepository = acompteRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return acompteRepository;
    }
}
