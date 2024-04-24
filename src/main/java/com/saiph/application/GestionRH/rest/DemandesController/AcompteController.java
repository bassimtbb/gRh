package com.saiph.application.GestionRH.rest.DemandesController;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.AcompteDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Acompte;
import com.saiph.application.GestionRH.rest.GenericCrudController;
import com.saiph.application.GestionRH.services.DemandesCrudService.AcompteCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/acompte")
@Tag(name = "AcompteController")
public class AcompteController  extends GenericCrudController<Acompte, AcompteDto> {

    private AcompteCrudService acompteCrudService;

    @Override
    protected GenericCrudService<Acompte, AcompteDto> getCrudService() {
        return acompteCrudService;
    }
    @Autowired
    public AcompteController(AcompteCrudService acompteCrudService) {
        this.acompteCrudService = acompteCrudService;
    }


}
