package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import com.saiph.application.GestionRH.Domain.entities.Demande;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Enum.Statut;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.services.DemandeCrudService;
import com.saiph.application.GestionRH.services.DepartementCrudService;
import com.saiph.application.GestionRH.services.GenericCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.saiph.application.GestionRH.Enum.PDFTemplateName;
import com.saiph.application.GestionRH.services.PDFGeneratorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/demande")
@RequiredArgsConstructor
@Tag(name = "Demande")
public class DemandeController extends GenericCrudController<Demande, DemandeDto> {

    private final DemandeCrudService demandeCrudService;
    private final DepartementCrudService departementCrudService;
    private final PDFGeneratorService pdfGeneratorService;

    @GetMapping("/pdf/{demandeId}")
    public String generatePdf(@PathVariable("demandeId") Long demandeId,
                            @RequestParam("typeDemande") String typeDemande,
                            HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
        response.setHeader(headerKey, headerValue);

        try {
            PDFTemplateName templateName = PDFTemplateName.valueOf(typeDemande);
            return pdfGeneratorService.PdfValidationD(response, templateName, demandeId);
        } catch (IllegalArgumentException e) {
            response.sendError(HttpStatus.BAD_REQUEST.value(), "Invalid typeDemande value.");
        } catch (Exception e) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error generating PDF.");
        }
        return "";
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
    public ResponseEntity<List<Demande>> getDemandeBydepartementId(
            @PathVariable("departementId") Long departementId) {
        List<Demande> demande = demandeCrudService.getDemandeByDepartementId(departementId);
        if (demande == null || demande.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(demande);
    }

//        @PostMapping("/preValid")
//    public ResponseEntity<List<Demande>> getDemandeValidBySup(
//            @Valid @RequestBody Boolean PreValid) {
//        List<Demande> demande = demandeCrudService.findByIsPreValidated(PreValid);
//        if (demande == null || demande.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(demande);
//    }
            @GetMapping("/statut/{statut}")
    public ResponseEntity<List<Demande>> getDemandeByStatut(
            @PathVariable("statut") Statut statut) {
        List<Demande> demande = demandeCrudService.getDemandeByStatut(statut);
        if (demande == null || demande.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(demande);
    }
    @PostMapping("/statut/{demandeId}")
    public DemandeDto SetStatut(
            @PathVariable("demandeId") Long demandeId ,@Valid @RequestBody String statut
    ) throws ResourceNotFoundException {
        DemandeDto demande = demandeCrudService.SetStatut(demandeId,statut);
        return demande;
    }


    @Override
    protected GenericCrudService<Demande, DemandeDto> getCrudService() {
        return demandeCrudService;
    }
}
