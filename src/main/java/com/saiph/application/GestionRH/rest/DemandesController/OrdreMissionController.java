package com.saiph.application.GestionRH.rest.DemandesController;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.OrdreMissionDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.OrdreMission;
import com.saiph.application.GestionRH.rest.GenericCrudController;
import com.saiph.application.GestionRH.services.DemandesCrudService.OrdreMissionCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/OrdreMission")
@Tag(name = "OrdreMissionController")
public class OrdreMissionController  extends GenericCrudController<OrdreMission, OrdreMissionDto> {

    private OrdreMissionCrudService ordreMissionCrudService;

    @Autowired
    public OrdreMissionController(OrdreMissionCrudService ordreMissionCrudService) {
        this.ordreMissionCrudService = ordreMissionCrudService;
    }

    @Override
    protected GenericCrudService<OrdreMission, OrdreMissionDto> getCrudService() {
        return ordreMissionCrudService;
    }
}