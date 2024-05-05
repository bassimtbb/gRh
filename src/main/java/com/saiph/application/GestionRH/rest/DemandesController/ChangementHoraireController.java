package com.saiph.application.GestionRH.rest.DemandesController;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.ChangementHoraireDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.ChangementHoraire;
import com.saiph.application.GestionRH.rest.GenericCrudController;
import com.saiph.application.GestionRH.services.DemandesCrudService.ChangementHoraireCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ChangementH")
@Tag(name = "ChangementHoraire")
public class ChangementHoraireController  extends GenericCrudController<ChangementHoraire, ChangementHoraireDto> {

    private ChangementHoraireCrudService changementHoraireCrudService;

    @Autowired
    public ChangementHoraireController( ChangementHoraireCrudService changementHoraireCrudService) {
        this.changementHoraireCrudService = changementHoraireCrudService;
    }

    @Override
    protected GenericCrudService<ChangementHoraire, ChangementHoraireDto> getCrudService() {
        return changementHoraireCrudService;
    }
}