package com.saiph.application.GestionRH.Domain.entities.Demandes;

import com.saiph.application.GestionRH.Domain.entities.Demande;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pret extends Demande {
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
