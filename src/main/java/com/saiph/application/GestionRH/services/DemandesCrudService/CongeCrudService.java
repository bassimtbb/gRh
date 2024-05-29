package com.saiph.application.GestionRH.services.DemandesCrudService;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.CongeDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Conge;
import com.saiph.application.GestionRH.Enum.Statut;
import com.saiph.application.GestionRH.repository.DemandesRepository.CongeRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CongeCrudService  extends GenericCrudService<Conge, CongeDto> {

    private CongeRepository congeRepository;

    @Autowired
    public CongeCrudService(CongeRepository congeRepository) {
        this.congeRepository = congeRepository;
    }
    public List<Conge> getCongeByStatut(Statut statut) {
        return congeRepository.findByStatut(statut);
    }

    public List<Conge> getDemandeValidByUtilisateurId(Long utilisateurId ) {
        Statut validStatut = Statut.Validee; // Assuming 'VALIDEE' is an enum constant in Statut
        return congeRepository.findValidByUserId(utilisateurId, validStatut);
    }
    public List<Conge> getDemandeValidByDepartementId(Long departementId ) {
        Statut validStatut = Statut.Validee; // Assuming 'VALIDEE' is an enum constant in Statut
 return congeRepository.findValidByDepartementId(departementId, validStatut);
    }
    @Override
    protected CrudRepository getRepository() {
        return congeRepository;
    }
}