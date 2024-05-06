package com.saiph.application.GestionRH.Domain.entities;

import com.saiph.application.GestionRH.Enum.Statut;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Setter
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Demande extends GenericEntity{

    private Statut statut;

    private Integer isValidee;

    @Column(name = "dtype", insertable = false, updatable = false)
    private String type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;



    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "departement_id")
    private Departement departement;
}
