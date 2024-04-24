package com.saiph.application.GestionRH.rest.DemandesController;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.PretDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Pret;
import com.saiph.application.GestionRH.rest.GenericCrudController;
import com.saiph.application.GestionRH.services.DemandesCrudService.PretCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Pret")
@Tag(name = "PretController")
public class PretController  extends GenericCrudController<Pret, PretDto> {

    private PretCrudService pretCrudService;

    @Autowired
    public PretController(PretCrudService pretCrudService) {
        this.pretCrudService = pretCrudService;
    }

    @Override
    protected GenericCrudService<Pret, PretDto> getCrudService() {
        return pretCrudService;
    }
}