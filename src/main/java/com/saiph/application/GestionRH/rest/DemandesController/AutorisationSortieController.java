package com.saiph.application.GestionRH.rest.DemandesController;
import com.saiph.application.GestionRH.Domain.dto.DemandesDto.AutorisationSortieDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.AutorisationSortie;
import com.saiph.application.GestionRH.rest.GenericCrudController;
import com.saiph.application.GestionRH.services.DemandesCrudService.AutorisationSortieCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/AutorisationS")
@Tag(name = "AutorisationSortie")
public class AutorisationSortieController extends GenericCrudController<AutorisationSortie, AutorisationSortieDto> {

    private AutorisationSortieCrudService autorisationSortieCrudService ;
    @Autowired
    public AutorisationSortieController(AutorisationSortieCrudService autorisationSortieCrudService) {
        this.autorisationSortieCrudService = autorisationSortieCrudService;
    }



    @Override
    protected GenericCrudService<AutorisationSortie, AutorisationSortieDto> getCrudService() {
        return autorisationSortieCrudService;
    }
}