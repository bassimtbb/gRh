package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.repository.DepartementRepository;
import com.saiph.application.GestionRH.security.UserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DepartementCrudService extends GenericCrudService<Departement, DepartementDto> {

    private final DepartementRepository departementRepository;
    private final UserDetailService userService;

    public void SetSupH(Long departementId , Long userID) {
        UserDto userDto = userService.findById( userID);
        DepartementDto deaprtementDto=findById(departementId);
        User utilisateur=userService.convertToEntity(userDto);
        Departement departement= convertToEntity(deaprtementDto);
        departement.setManager( utilisateur);
     departementRepository.save(departement);
    }
    public void addEmpl(Long departementId , Long userID) {
        UserDto userDto = userService.findById( userID);
        DepartementDto deaprtementDto=findById(departementId);
        User utilisateur=userService.convertToEntity(userDto);
        Departement departement= convertToEntity(deaprtementDto);
        departement.getListEmploye().add(utilisateur);
     departementRepository.save(departement);
    }
    public void deleteEmpl(Long departementId , Long userID) {
        UserDto userDto = userService.findById( userID);
        DepartementDto deaprtementDto=findById(departementId);
        User utilisateur=userService.convertToEntity(userDto);
        Departement departement= convertToEntity(deaprtementDto);
        departement.getListEmploye().remove(utilisateur);
     departementRepository.save(departement);
    }

    @Override
    protected CrudRepository getRepository() {
        return departementRepository;
    }
}
