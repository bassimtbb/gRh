package com.saiph.application.GestionRH.Domain.entities;

import com.saiph.application.GestionRH.Enum.Statut;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Demande extends GenericEntity{

    private Statut statut;

    @ManyToOne
    private Utilisateur employe;

    public Utilisateur getEmploye() {
        return employe;
    }

    public void setEmploye(Utilisateur employe) {
        this.employe = employe;
    }

    public Statut getStatut() {
        return statut;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }
}
