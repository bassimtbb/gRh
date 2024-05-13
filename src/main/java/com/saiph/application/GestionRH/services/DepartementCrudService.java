package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.repository.DepartementRepository;
import com.saiph.application.GestionRH.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final UserDetailService userService;

    public Departement SetSupH(Long departementId , Long userID) {
        UserDto userDto = userService.findById( userID);
        DepartementDto deaprtementDto=findById(departementId);
        User utilisateur=userService.convertToEntity(userDto);
        Departement departement= convertToEntity(deaprtementDto);
        departement.setManager( utilisateur);
     departementRepository.save(departement);
     utilisateur.setDepartement(departement);
     userRepository.save(utilisateur);
     return departement;
    }
    public Departement addEmpl(Long departementId , Long userID) {
        UserDto userDto = userService.findById( userID);
        DepartementDto deaprtementDto=findById(departementId);
        User utilisateur=userService.convertToEntity(userDto);
        Departement departement= convertToEntity(deaprtementDto);
        utilisateur.setDepartement(departement);
        departement.getListEmploye().add(utilisateur);
     departementRepository.save(departement);
     userRepository.save(utilisateur);
     return departement;
    }
    public Departement deleteEmpl(Long departementId , Long userID) {
        UserDto userDto = userService.findById( userID);
        DepartementDto deaprtementDto=findById(departementId);
        User utilisateur=userService.convertToEntity(userDto);
        Departement departement= convertToEntity(deaprtementDto);
        departement.getListEmploye().remove(utilisateur);
        utilisateur.setDepartement(null);
        departementRepository.save(departement);
        departementRepository.save(departement);
          return departement;

    }

    public Departement findByIdEn(Long id) {
        return this.convertToEntity(findById(id));
    }

    @Override
    protected CrudRepository getRepository() {
        return departementRepository;
    }
}
