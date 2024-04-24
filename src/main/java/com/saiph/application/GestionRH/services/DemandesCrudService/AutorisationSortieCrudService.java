package com.saiph.application.GestionRH.services.DemandesCrudService;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.AutorisationSortieDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationSortie;
import com.saiph.application.GestionRH.repository.DemandesRepository.AutorisationSortieRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AutorisationSortieCrudService  extends GenericCrudService<AutorisationSortie, AutorisationSortieDto> {

    private AutorisationSortieRepository autorisationSortieRepository;
    @Autowired
    public AutorisationSortieCrudService(AutorisationSortieRepository autorisationSortieRepository) {
        this.autorisationSortieRepository = autorisationSortieRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return autorisationSortieRepository;
    }
}