package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.DepartementName;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.Enum.RoleType;
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

        if (departement.getName()!= DepartementName.Ressources_Humaine) {
            if (departement.getManager()!=null){
               departement.getManager().setRole(RoleType.EMPLOYE);
               userRepository.save(departement.getManager());
            }
        }

        if (utilisateur.getDepartement().getManager() != null) {
                removeSupH(utilisateur.getDepartement().getId(), utilisateur.getId());

            }
      if (departement.getName()== DepartementName.Ressources_Humaine)
      {utilisateur.setRole(RoleType.RRH);}
      else
      {utilisateur.setRole(RoleType.SUP_H);      }
      departement.setManager( utilisateur);
        utilisateur.setDepartement(departement);
        userRepository.save(utilisateur);
        departementRepository.save(departement);
        return departement;
    }
    public Departement removeSupH(Long departementId , Long userID) {
        UserDto userDto = userService.findById( userID);
        DepartementDto deaprtementDto=findById(departementId);
        User utilisateur=userService.convertToEntity(userDto);
        Departement departement= convertToEntity(deaprtementDto);
            if (departement.getName()!= DepartementName.Ressources_Humaine) {
            if (departement.getManager()!=null){
               departement.getManager().setRole(RoleType.EMPLOYE);
               userRepository.save(departement.getManager());
            }
        }

        departement.setManager( null);
        addEmpl(departement.getId(), utilisateur.getId());
        departementRepository.save(departement);
        return departement;
    }
    public Departement addEmpl(Long departementId , Long userID) {
        UserDto userDto = userService.findById( userID);
        DepartementDto deaprtementDto=findById(departementId);
        User utilisateur=userService.convertToEntity(userDto);
        Departement departement= convertToEntity(deaprtementDto);

        if (utilisateur.getDepartement() != null) {
            if (utilisateur.getDepartement().getManager() != null) {
            }
            utilisateur.getDepartement().setManager(null);
            deleteEmpl(utilisateur.getDepartement().getId() , utilisateur.getId());
        }
        if (
                departement.getName()== DepartementName.Ressources_Humaine
        ){utilisateur.setRole(RoleType.RRH);}else {
         utilisateur.setRole(RoleType.EMPLOYE);
        }
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
        utilisateur.setRole(RoleType.EMPLOYE);
        Departement departement= convertToEntity(deaprtementDto);
        departement.getListEmploye().remove(utilisateur);
        utilisateur.setDepartement(null);
        userRepository.save(utilisateur);
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
