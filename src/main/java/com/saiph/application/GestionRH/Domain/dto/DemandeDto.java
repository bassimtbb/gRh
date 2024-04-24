package com.saiph.application.GestionRH.Domain.dto;

import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import com.saiph.application.GestionRH.Enum.Statut;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class DemandeDto extends GenericDto  {

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
