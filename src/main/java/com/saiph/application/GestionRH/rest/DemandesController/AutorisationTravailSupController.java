package com.saiph.application.GestionRH.rest.DemandesController;


import com.saiph.application.GestionRH.Domain.dto.DemandesDto.AutorisationTravailSupDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationTravailSup;
import com.saiph.application.GestionRH.rest.GenericCrudController;
import com.saiph.application.GestionRH.services.DemandesCrudService.AutorisationTravailSupCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/TravailSup")
@Tag(name = "AutorisationTravailSupController")
public class AutorisationTravailSupController  extends GenericCrudController<AutorisationTravailSup, AutorisationTravailSupDto> {

    private AutorisationTravailSupCrudService autorisationTravailSupCrudService;
@Autowired
    public AutorisationTravailSupController(AutorisationTravailSupCrudService autorisationTravailSupCrudService) {
        this.autorisationTravailSupCrudService = autorisationTravailSupCrudService;
    }




    @Override
    protected GenericCrudService<AutorisationTravailSup, AutorisationTravailSupDto> getCrudService() {
        return autorisationTravailSupCrudService;
    }
}