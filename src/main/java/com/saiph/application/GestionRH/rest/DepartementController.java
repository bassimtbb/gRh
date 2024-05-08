package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.services.DepartementCrudService;
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

@Controller
@RequiredArgsConstructor
@RequestMapping("/department")
@Tag(name = "Departement")
public class DepartementController extends GenericCrudController<Departement, DepartementDto>{


    private final  DepartementCrudService departementCrudService;

    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/addEmploye/{id}")
    public ResponseEntity<Void> addEmployeToDepartement(@PathVariable("id") Long IdDepartement, @Valid @RequestBody Long  IdUser) {
            departementCrudService.addEmpl(IdDepartement,IdUser) ;
            return new ResponseEntity<>(HttpStatus.OK);

    }
        @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/SetSup/{id}")
    public ResponseEntity<Void> SetSup(@PathVariable("id") Long IdDepartement, @Valid @RequestBody Long  IdUser) {
            departementCrudService.SetSupH(IdDepartement,IdUser); ;
            return new ResponseEntity<>(HttpStatus.OK);

    }
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/removeEmpl/{id}")
    public ResponseEntity<Void> deleteEmpl(@PathVariable("id") Long IdDepartement, @Valid @RequestBody Long  IdUser) {
            departementCrudService.deleteEmpl(IdDepartement,IdUser); ;
            return new ResponseEntity<>(HttpStatus.OK);

    }


    @Override
    protected GenericCrudService<Departement, DepartementDto> getCrudService() {
        return departementCrudService;
    }
}
