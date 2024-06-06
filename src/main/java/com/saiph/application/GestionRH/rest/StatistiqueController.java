package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.entities.Statistique.*;
import com.saiph.application.GestionRH.services.StatistiqueService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Statistique")
@RequiredArgsConstructor
@Tag(name = "Statistique")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StatistiqueController {
    private final StatistiqueService statistiqueService;

    @GetMapping("/Demande/{departementId}")
    public StatistiqueDemandeByDepartementResult getStatistiqueDemandeByDepartement(@PathVariable("departementId") Long departementId) {
        return statistiqueService.getStatistiqueDemandeByDepartement(departementId);
    }
    @GetMapping("/User/{departementId}")
    public StatistiqueUserByDepartementResult getStatistiqueUserByDepartement(@PathVariable("departementId") Long departementId) {
        return statistiqueService.getStatistiqueUserByDepartement(departementId);
    }
    @GetMapping("/Demande")
    public StatistiqueDemandeResult getStatistiqueDemande() {
        return statistiqueService.getStatistiqueDemande();
    }

    @GetMapping("/Generale")
    public StatistiqueGeneraleResult getStatistiqueGenerale() {
        return statistiqueService.getStatistiqueGenerale();
    }

    @GetMapping("/Event/{eventId}")
    public StatistiqueEventResult getStatistiqueEvent(@PathVariable("eventId") Long eventId) {
        return statistiqueService.getStatistiqueEventByEventID(eventId);
    }

    @GetMapping("/Formation/{formationId}")
    public StatistiqueFormationResult getStatistiqueFormation(@PathVariable("formationId") Long formationId) {
        return statistiqueService.getStatistiqueFormationByFormationID(formationId);
    }
}
