package com.saiph.application.GestionRH.Domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
        @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateD;
    @NonNull
        @JsonFormat(pattern = "yyyy-MM-dd")
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
    private String titre;
    @NonNull
    private String description;

    @ManyToMany
    private List<User> ListEmploye = new ArrayList<>();
}