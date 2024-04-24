package com.saiph.application.GestionRH.Domain.entities.Demandes;

import com.saiph.application.GestionRH.Domain.entities.Demande;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutorisationSortie extends Demande {
    private Integer duree;
    private Date dateS;
    private Date dateR;
    private Time Hsortie;
    private Time Hretour;
    private String motif;
    private Boolean isTemporaire;

    public Integer getDuree() {
        return duree;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public Date getDateS() {
        return dateS;
    }

    public void setDateS(Date dateS) {
        this.dateS = dateS;
    }

    public Date getDateR() {
        return dateR;
    }

    public void setDateR(Date dateR) {
        this.dateR = dateR;
    }

    public Time getHsortie() {
        return Hsortie;
    }

    public void setHsortie(Time hsortie) {
        Hsortie = hsortie;
    }

    public Time getHretour() {
        return Hretour;
    }

    public void setHretour(Time hretour) {
        Hretour = hretour;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Boolean getTemporaire() {
        return isTemporaire;
    }

    public void setTemporaire(Boolean temporaire) {
        isTemporaire = temporaire;
    }
}
