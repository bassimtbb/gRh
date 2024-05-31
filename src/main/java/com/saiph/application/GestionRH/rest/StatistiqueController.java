package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.entities.StatistiqueDemandeByDepartementResult;
import com.saiph.application.GestionRH.services.StatistiqueService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/Statistique")
@RequiredArgsConstructor
@Tag(name = "Statistique")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StatistiqueController {
    private final StatistiqueService statistiqueService;
        @GetMapping("/Departement/{departementId}")
    public StatistiqueDemandeByDepartementResult getStatistique( @PathVariable("departementId") Long departementId) {
        return statistiqueService.getStatistique(departementId);
    }
}
