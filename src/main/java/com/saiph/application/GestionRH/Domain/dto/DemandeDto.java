package com.saiph.application.GestionRH.Domain.dto;

import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import com.saiph.application.GestionRH.Enum.Statut;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class DemandeDto extends GenericDto  {

 private Statut statut;


    @Column(name = "dtype", insertable = false, updatable = false)
    private String type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "departement_id")
    private Departement departement;
}
