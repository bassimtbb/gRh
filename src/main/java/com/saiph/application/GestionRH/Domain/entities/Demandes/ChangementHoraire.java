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
public class ChangementHoraire extends Demande {
    private Date debut;
    private Date fin;
    private String motif;
    private Time NouvelH;
    private Time AncienH;

    public Date getDebut() {
        return debut;
    }

    public void setDebut(Date debut) {
        this.debut = debut;
    }

    public Date getFin() {
        return fin;
    }

    public void setFin(Date fin) {
        this.fin = fin;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Time getNouvelH() {
        return NouvelH;
    }

    public void setNouvelH(Time nouvelH) {
        NouvelH = nouvelH;
    }

    public Time getAncienH() {
        return AncienH;
    }

    public void setAncienH(Time ancienH) {
        AncienH = ancienH;
    }
}
