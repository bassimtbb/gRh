package com.saiph.application.GestionRH.Domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.saiph.application.GestionRH.Domain.entities.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class NotificationDto extends GenericDto{
    private String name;
    private String Type;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private  User utilisateur;

    private Boolean statut;
}