package com.saiph.application.GestionRH.Domain.entities;

import lombok.Data;

@Data
public class StatistiqueEventResult {
    private Integer eventCountEmployeeRegistered;
    private String eventTitre;
    private Integer eventNumberOfSeats;
    private double eventPourcentage;

}
