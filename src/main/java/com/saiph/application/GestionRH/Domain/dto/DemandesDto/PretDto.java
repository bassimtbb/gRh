package com.saiph.application.GestionRH.Domain.dto.DemandesDto;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;

public class PretDto extends DemandeDto {
    private Integer montant;
    private String motif;

    private String credit;
    private String remboursement;

    public Integer getMontant() {
        return montant;
    }

    public void setMontant(Integer montant) {
        this.montant = montant;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public String getCredit() {
        return credit;
    }

    public void setCredit(String credit) {
        this.credit = credit;
    }

    public String getRemboursement() {
        return remboursement;
    }

    public void setRemboursement(String remboursement) {
        this.remboursement = remboursement;
    }
}
