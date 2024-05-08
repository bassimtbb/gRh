package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.FormationDto;
import com.saiph.application.GestionRH.Domain.entities.Formation;
import com.saiph.application.GestionRH.services.FormationCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/formation")
@Tag(name = "Formation")
public class FormationController extends GenericCrudController<Formation, FormationDto> {
    public final FormationCrudService formationCrudService;

    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/addEmploye/{id}")
    public ResponseEntity<Void> addEmployeToFormation(@PathVariable("id") Long IdFormation, @Valid @RequestBody Long  IdUser) {
            formationCrudService.AddEmploye(IdUser, IdFormation) ;
            return new ResponseEntity<>(HttpStatus.OK);

    }
    @Override
    protected GenericCrudService<Formation, FormationDto> getCrudService() {
        return formationCrudService;
    }
}
