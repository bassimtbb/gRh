package com.saiph.application.GestionRH.Domain.entities.Demandes;

import com.saiph.application.GestionRH.Domain.entities.Demande;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Conge extends Demande {
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
