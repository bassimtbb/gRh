package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import com.saiph.application.GestionRH.Domain.entities.Demande;
import com.saiph.application.GestionRH.repository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class DemandeCrudService extends GenericCrudService<Demande, DemandeDto> {

    private DemandeRepository demandeRepository;

    @Autowired
    public DemandeCrudService(DemandeRepository demandeRepository) {
        this.demandeRepository = demandeRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return demandeRepository;
    }

        public List<Demande> getDemandeByUtilisateurId(Long userId) {
        return demandeRepository.findByUtilisateurId(userId);
    }


      public List<Demande> getDemandeByDepartementId(Long departementId) {
        return demandeRepository.findByDepartementId(departementId);
    }
}
