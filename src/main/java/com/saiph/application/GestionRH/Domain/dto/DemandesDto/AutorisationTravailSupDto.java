package com.saiph.application.GestionRH.Domain.dto.DemandesDto;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;

import java.sql.Time;
import java.util.Date;

public class AutorisationTravailSupDto extends DemandeDto {

    private Date date;
    private String motif;
    private Time Hacces;
    private Time Hsortie;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Time getHacces() {
        return Hacces;
    }

    public void setHacces(Time hacces) {
        Hacces = hacces;
    }

    public Time getHsortie() {
        return Hsortie;
    }

    public void setHsortie(Time hsortie) {
        Hsortie = hsortie;
    }
}
