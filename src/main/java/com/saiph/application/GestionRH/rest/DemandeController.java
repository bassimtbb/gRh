package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import com.saiph.application.GestionRH.Domain.entities.Demande;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.services.DemandeCrudService;
import com.saiph.application.GestionRH.services.DepartementCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/demande")
@Tag(name = "Demande")
public class DemandeController extends GenericCrudController<Demande, DemandeDto>{

    private DemandeCrudService demandeCrudService;
    private final DepartementCrudService departementCrudService;

    @Autowired
    public DemandeController(DemandeCrudService demandeCrudService, DepartementCrudService departementCrudService) {
        this.demandeCrudService = demandeCrudService;
        this.departementCrudService = departementCrudService;
    }
    @GetMapping("/Utilisateur/{userId}")
    public ResponseEntity<List<Demande>> getDemandeByUtilisateurId(
            @PathVariable("userId") Long userId) {
        List<Demande> demande = demandeCrudService.getDemandeByUtilisateurId(userId);
        if (demande == null || demande.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(demande);
    }

        @GetMapping("/Departement/{departementId}")
    public ResponseEntity<List<Demande>> getDemandeById(
            @PathVariable("departementId") Long departementId) {
        List<Demande> demande = demandeCrudService.getDemandeByDepartementId(departementId);
        if (demande == null || demande.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(demande);
    }
    @Override
    protected GenericCrudService<Demande, DemandeDto> getCrudService() {
        return demandeCrudService;
    }
}
