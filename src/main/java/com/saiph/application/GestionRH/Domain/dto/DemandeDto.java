package com.saiph.application.GestionRH.Domain.dto;

import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.Enum.Statut;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class DemandeDto extends GenericDto  {

 private Statut statut;


    @Column(name = "dtype", insertable = false, updatable = false)
    private String type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "utilisateur_id")
    private User utilisateur;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "departement_id")
    private Departement departement;
}
