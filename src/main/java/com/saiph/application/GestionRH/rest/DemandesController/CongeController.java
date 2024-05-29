package com.saiph.application.GestionRH.rest.DemandesController;

import com.saiph.application.GestionRH.Domain.dto.DemandesDto.CongeDto;
import com.saiph.application.GestionRH.Domain.entities.Demandes.Conge;
import com.saiph.application.GestionRH.Enum.Statut;
import com.saiph.application.GestionRH.rest.GenericCrudController;
import com.saiph.application.GestionRH.services.DemandesCrudService.CongeCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/Conge")
@Tag(name = "Conge")
public class CongeController  extends GenericCrudController<Conge, CongeDto> {

    private CongeCrudService congeCrudService;
    @GetMapping("/Departement/{departementId}")
    public ResponseEntity<List<Conge>> getCongeBydepartementId(
            @PathVariable("departementId") Long departementId) {
        List<Conge> demande = congeCrudService.getDemandeValidByDepartementId(departementId);
        if (demande == null || demande.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(demande);
    }

        @GetMapping("/utilisateur/{utilisateurId}")
    public ResponseEntity<List<Conge>> getCongeByutilisateurId(
            @PathVariable("utilisateurId") Long utilisateurId) {
        List<Conge> demande = congeCrudService.getDemandeValidByUtilisateurId(utilisateurId);
        if (demande == null || demande.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(demande);
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<Conge>> getCongeByStatut(
            @PathVariable("statut") Statut statut) {
        List<Conge> demande = congeCrudService.getCongeByStatut(statut);
        if (demande == null || demande.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(demande);
    }
    @Autowired
    public CongeController(CongeCrudService congeCrudService) {
        this.congeCrudService = congeCrudService;
    }

    @Override
    protected GenericCrudService<Conge, CongeDto> getCrudService() {
        return congeCrudService;
    }
}