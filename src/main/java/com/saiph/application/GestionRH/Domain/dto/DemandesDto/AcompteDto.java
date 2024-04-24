package com.saiph.application.GestionRH.Domain.dto.DemandesDto;


import com.saiph.application.GestionRH.Domain.dto.DemandeDto;

public class AcompteDto extends DemandeDto {
    private Integer montant;

    public Integer getMontant() {
        return montant;
    }

    public void setMontant(Integer montant) {
        this.montant = montant;
    }
}
