package com.saiph.application.GestionRH.rest.DemandesController;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.CongeDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Conge;
import com.saiph.application.GestionRH.rest.GenericCrudController;
import com.saiph.application.GestionRH.services.DemandesCrudService.CongeCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Conge")
@Tag(name = "Conge")
public class CongeController  extends GenericCrudController<Conge, CongeDto> {

    private CongeCrudService congeCrudService;

    @Autowired
    public CongeController(CongeCrudService congeCrudService) {
        this.congeCrudService = congeCrudService;
    }

    @Override
    protected GenericCrudService<Conge, CongeDto> getCrudService() {
        return congeCrudService;
    }
}