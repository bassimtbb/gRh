package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
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
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/department")
@Tag(name = "Departement")
public class DepartementController extends GenericCrudController<Departement, DepartementDto>{


    private final  DepartementCrudService departementCrudService;

    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/addEmploye/{id}")
    public ResponseEntity<Departement>  addEmployeToDepartement(@PathVariable("id") Long IdDepartement, @Valid @RequestBody Long  IdUser) throws RuntimeException, ResourceNotFoundException {
        Departement departement=departementCrudService.addEmpl(IdDepartement,IdUser) ;
                 return new ResponseEntity<Departement>(departement, HttpStatus.OK);
    }
        @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/SetSup/{id}")
    public Departement SetSup(@PathVariable("id") Long IdDepartement, @Valid @RequestBody Long  IdUser) throws ResourceNotFoundException {
              return departementCrudService.SetSupH(IdDepartement,IdUser);

    }
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/removeEmpl/{id}")
    public Departement deleteEmpl(@PathVariable("id") Long IdDepartement, @Valid @RequestBody Long  IdUser) {
        return departementCrudService.deleteEmpl(IdDepartement,IdUser);
    }

        @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @PostMapping("/removeSupH/{id}")
    public Departement deleteSupH(@PathVariable("id") Long IdDepartement, @Valid @RequestBody Long  IdUser) throws ResourceNotFoundException {
        return departementCrudService.removeSupH(IdDepartement,IdUser);


    }
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "OK")})
    @GetMapping ("/findByIdE/{id}")
    public Departement findByIdEn(@PathVariable("id") Long IdDepartement) {
        return departementCrudService.findByIdEn(IdDepartement) ;

    }


    @Override
    protected GenericCrudService<Departement, DepartementDto> getCrudService() {
        return departementCrudService;
    }
}
