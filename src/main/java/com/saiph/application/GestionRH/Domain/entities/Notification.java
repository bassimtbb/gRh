package com.saiph.application.GestionRH.Domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.saiph.application.GestionRH.Enum.RoleType;
import com.saiph.application.GestionRH.Enum.TypeNotification;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification extends GenericEntity {
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    @JsonIgnore
   private  User owner;
    private Boolean statut;
    private String Description;
    private TypeNotification Type;


}
