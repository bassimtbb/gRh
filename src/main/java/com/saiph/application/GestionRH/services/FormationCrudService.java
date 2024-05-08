package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.FormationDto;
import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.Formation;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.repository.FormationRepository;
import com.saiph.application.GestionRH.security.UserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FormationCrudService extends GenericCrudService<Formation, FormationDto> {
    private final FormationRepository formationRepository;
    private final UserDetailService userService;
    private  FormationCrudService formationService;

    @Override
    public FormationDto findById(Long id) {
        return super.findById(id);
    }

    public void AddEmploye(Long IdUser, Long IdFormation)  {
        UserDto userDto = userService.findById( IdUser);
        FormationDto formationDto=findById(IdFormation);
        User user = userService.convertToEntity(userDto);
        Formation formation = convertToEntity(formationDto);
        formation.getListEmploye().add(user);
            formationRepository.save(formation);
    }

    @Override
    protected Formation convertToEntity(FormationDto entityDto) {
        return super.convertToEntity(entityDto);
    }

    @Override
    protected CrudRepository getRepository() {
        return formationRepository;
    }


}

