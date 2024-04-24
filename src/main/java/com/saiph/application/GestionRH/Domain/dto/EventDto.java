package com.saiph.application.GestionRH.Domain.dto;

import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
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
    private String description;


    @OneToMany
    private List<Utilisateur> ListEmploye = new ArrayList<>();

    public Date getDateD() {
        return dateD;
    }

    public void setDateD(Date dateD) {
        this.dateD = dateD;
    }

    public Date getDateF() {
        return dateF;
    }

    public void setDateF(Date dateF) {
        this.dateF = dateF;
    }

    public Integer getDuree() {
        return duree;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public Integer getNbrPlace() {
        return nbrPlace;
    }

    public void setNbrPlace(Integer nbrPlace) {
        this.nbrPlace = nbrPlace;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}