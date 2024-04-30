package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.services.FormationCrudService;
import com.saiph.application.GestionRH.Domain.dto.FormationDto;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import com.saiph.application.GestionRH.Domain.entities.Formation;
import com.saiph.application.GestionRH.services.GenericCrudService;
import com.saiph.application.GestionRH.services.UtilisateurCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/formation")
@Tag(name = "FormationController")
public class FormationController extends GenericCrudController<Formation, FormationDto> {
    public final FormationCrudService formationCrudService;
    public final UtilisateurCrudService utilisateurCrudService;

    @Autowired
    public FormationController(FormationCrudService formationCrudService, UtilisateurCrudService utilisateurCrudService) {
        this.formationCrudService = formationCrudService;
        this.utilisateurCrudService = utilisateurCrudService;
    }
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/addEmploye/{id}")
    public ResponseEntity<Void> addEmployeToFormation(@PathVariable("id") Long id, @Valid @RequestBody Long  addEmploye) {
            formationCrudService.AddEmploye(utilisateurCrudService.findById( addEmploye), formationCrudService.findById(id)) ;
            return new ResponseEntity<>(HttpStatus.OK);

    }
    @Override
    protected GenericCrudService<Formation, FormationDto> getCrudService() {
        return formationCrudService;
    }
}
