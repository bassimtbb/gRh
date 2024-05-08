package com.saiph.application.GestionRH.Domain.dto;

import com.saiph.application.GestionRH.Domain.entities.User;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Getter
@Setter
public class EventDto extends GenericDto {

    @NonNull
    private Date dateD;
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
    private String titre;
    @NonNull
    private String description;


    @ManyToMany
    private List<User> ListEmploye = new ArrayList<>();
}