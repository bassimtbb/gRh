package com.saiph.application.GestionRH.Domain.dto;

import com.saiph.application.GestionRH.Domain.entities.User;
import jakarta.persistence.ManyToMany;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Getter
@Setter
public class FormationDto extends GenericDto {

    @NonNull
    private Date dateD;
    @NonNull
    private String titre;
    @NonNull
    private Date dateF;
    @NonNull
    private Integer duree;
    @NonNull
    private String lieu;
    @NonNull
    private Integer nbrPlace;
    @NonNull
    private String img;
    @NonNull
    private String description;

    @ManyToMany
    private List<User> ListEmploye = new ArrayList<>();
}