package com.saiph.application.GestionRH.Domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification extends GenericEntity {
    private String name;
    private String Type;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
 @JsonIgnore
    private  User utilisateur;

    private Boolean statut;

}
