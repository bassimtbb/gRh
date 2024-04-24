package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.services.FormationCrudService;
import com.saiph.application.GestionRH.Domain.dto.FormationDto;

import com.saiph.application.GestionRH.Domain.entities.Formation;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/formation")
@Tag(name = "FormationController")
public class FormationController extends GenericCrudController<Formation, FormationDto> {
    public final FormationCrudService formationCrudService;

    @Autowired
    public FormationController(FormationCrudService formationCrudService) {
        this.formationCrudService = formationCrudService;
    }

    @Override
    protected GenericCrudService<Formation, FormationDto> getCrudService() {
        return formationCrudService;
    }
}
