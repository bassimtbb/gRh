package com.saiph.application.GestionRH.Domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.Enum.TypeNotification;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto extends GenericDto{

    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
   private  User owner;
    private Boolean statut;
    private String Description;
    private TypeNotification Type;
}