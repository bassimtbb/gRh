package com.saiph.application.GestionRH.services.DemandesCrudService;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.ChangementHoraireDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.ChangementHoraire;
import com.saiph.application.GestionRH.repository.DemandesRepository.ChangementHoraireRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ChangementHoraireCrudService  extends GenericCrudService<ChangementHoraire, ChangementHoraireDto> {

    private ChangementHoraireRepository changementHoraireRepository;

    @Autowired
    public ChangementHoraireCrudService(ChangementHoraireRepository changementHoraireRepository) {
        this.changementHoraireRepository = changementHoraireRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return changementHoraireRepository;
    }
}