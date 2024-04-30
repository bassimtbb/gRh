package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import com.saiph.application.GestionRH.Domain.entities.Demande;
import com.saiph.application.GestionRH.services.DemandeCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/demande")
public class DemandeController extends GenericCrudController<Demande, DemandeDto>{

    private DemandeCrudService demandeCrudService;

    @Autowired
    public DemandeController(DemandeCrudService demandeCrudService) {
        this.demandeCrudService = demandeCrudService;
    }

    @Override
    protected GenericCrudService<Demande, DemandeDto> getCrudService() {
        return demandeCrudService;
    }
}
