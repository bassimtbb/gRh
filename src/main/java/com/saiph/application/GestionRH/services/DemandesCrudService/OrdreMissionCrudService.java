package com.saiph.application.GestionRH.services.DemandesCrudService;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.OrdreMissionDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.OrdreMission;
import com.saiph.application.GestionRH.repository.DemandesRepository.OrdreMissionRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class OrdreMissionCrudService  extends GenericCrudService<OrdreMission, OrdreMissionDto> {

    private OrdreMissionRepository ordreMissionRepository;

    @Autowired
    public OrdreMissionCrudService(OrdreMissionRepository ordreMissionRepository) {
        this.ordreMissionRepository = ordreMissionRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return ordreMissionRepository;
    }
}