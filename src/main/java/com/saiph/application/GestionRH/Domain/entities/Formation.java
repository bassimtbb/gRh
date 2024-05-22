package com.saiph.application.GestionRH.Domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formation extends GenericEntity {

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

    @Override
    public Long getId() {
        return super.getId();
    }

    @Override
    public void setId(Long id) {
        super.setId(id);
    }

}