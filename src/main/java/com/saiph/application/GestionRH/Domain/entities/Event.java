package com.saiph.application.GestionRH.Domain.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Event extends GenericEntity {

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

    @ManyToMany()
    private List<User> ListEmploye = new ArrayList<>();



}