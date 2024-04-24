package com.saiph.application.GestionRH.Domain.dto.DemandesDto;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;

import java.sql.Time;
import java.util.Date;

public class ChangementHoraireDto extends DemandeDto {
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
