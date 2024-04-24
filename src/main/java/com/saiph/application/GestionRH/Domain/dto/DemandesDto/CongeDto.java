package com.saiph.application.GestionRH.Domain.dto.DemandesDto;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;

import java.util.Date;

public class CongeDto extends DemandeDto {
    private Integer duree;
    private Date debut;
    private Date fin;
    private Date reprise;

    public Integer getDuree() {
        return duree;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

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

    public Date getReprise() {
        return reprise;
    }

    public void setReprise(Date reprise) {
        this.reprise = reprise;
    }
}
