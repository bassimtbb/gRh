package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.services.DepartementCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/department")
@Tag(name = "Departement")
public class DepartementController extends GenericCrudController<Departement, DepartementDto>{


    private DepartementCrudService departementCrudService;


    @Autowired
    public DepartementController(DepartementCrudService departementCrudService) {
        this.departementCrudService = departementCrudService;
    }

    @Override
    protected GenericCrudService<Departement, DepartementDto> getCrudService() {
        return departementCrudService;
    }
}
