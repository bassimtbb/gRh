package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.entities.Demande;
import com.saiph.application.GestionRH.Enum.Statut;
import com.saiph.application.GestionRH.repository.DemandeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class DemandeCrudService extends GenericCrudService<Demande, DemandeDto> {

    private final DemandeRepository demandeRepository;

    @Override
    protected CrudRepository<Demande, Long> getRepository() {
        return demandeRepository;
    }

    public List<Demande> getDemandeByUtilisateurId(Long userId) {
        return demandeRepository.findByUtilisateurId(userId);
    }

    public DemandeDto SetStatut(Long demandeID,String statut) {
        Statut statut1= Statut.valueOf(statut);
        DemandeDto demandeDto = this.findById( demandeID);
        Demande demande = this.convertToEntity(demandeDto);
        demande.setStatut(statut1);
        demandeRepository.save(demande);
        return demandeDto;
    }


    public List<Demande> getDemandeByStatut(Statut statut) {
        return demandeRepository.findByStatut(statut);
    }

    public List<Demande> getDemandeByDepartementId(Long departementId) {
        return demandeRepository.findByDepartementId(departementId);
    }
}