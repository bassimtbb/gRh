package com.saiph.application.GestionRH.rest.DemandesController;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.AutorisationTeletravailDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationTeletravail;
import com.saiph.application.GestionRH.rest.GenericCrudController;
import com.saiph.application.GestionRH.services.DemandesCrudService.AutorisationTeletravailCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Teletravail")
@Tag(name = "AutorisationTeletravail")
public class AutorisationTeletravailController  extends GenericCrudController<AutorisationTeletravail, AutorisationTeletravailDto> {

    private AutorisationTeletravailCrudService autorisationTeletravailCrudService;
    @Autowired
    public AutorisationTeletravailController(AutorisationTeletravailCrudService autorisationTeletravailCrudService) {
        this.autorisationTeletravailCrudService = autorisationTeletravailCrudService;
    }




    @Override
    protected GenericCrudService<AutorisationTeletravail, AutorisationTeletravailDto> getCrudService() {
        return autorisationTeletravailCrudService;
    }
}