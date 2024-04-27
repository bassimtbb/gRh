package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.dto.UtilisateurDto;
import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.repository.DepartementRepository;
import com.saiph.application.GestionRH.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.List;

@Service
@Transactional
public  class UtilisateurCrudService extends GenericCrudService<Utilisateur, UtilisateurDto> {
    private UtilisateurRepository utilisateurRepository;
    private DepartementRepository departementRepository;

    private final DepartementCrudService departementCrudService;

    @Autowired
    public UtilisateurCrudService(UtilisateurRepository utilisateurRepository, DepartementRepository departementRepository, DepartementCrudService departementCrudService) {
        this.utilisateurRepository = utilisateurRepository;
        this.departementRepository = departementRepository;
        this.departementCrudService = departementCrudService;
    }


    @Override
    public UtilisateurDto add(UtilisateurDto entityDto) throws ResourceNotFoundException {
        Utilisateur employe = convertToEntity(entityDto);
        Long departementID = employe.getDepartement().getId();
        DepartementDto departmentDto = departementCrudService.findById(departementID);

        if (departmentDto != null) {
            entityDto.setDepartement(departmentDto);

        }
        return super.add(entityDto);
    }

    @Override
    protected CrudRepository getRepository() {
        return utilisateurRepository;
    }

    @Override
    public UtilisateurDto update(Long id, UtilisateurDto entityDto) throws ResourceNotFoundException {
        return super.update(id, entityDto);
    }


    @Transactional
    public Utilisateur loadUserByEmail(String email) throws UsernameNotFoundException {
        return utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + email));
    }


}

