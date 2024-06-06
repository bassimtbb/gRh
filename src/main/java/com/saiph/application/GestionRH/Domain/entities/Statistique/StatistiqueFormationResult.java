package com.saiph.application.GestionRH.Domain.entities.Statistique;

import lombok.Data;

@Data
public class StatistiqueFormationResult {
    private Integer formationCountEmployeeRegistered;
    private String formationTitre;
    private Integer formationNumberOfSeats;
    private double formationPourcentage;
}
