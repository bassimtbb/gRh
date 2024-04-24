package com.saiph.application.GestionRH.Domain.dto;


import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class DepartementDto extends GenericDto {


    @NonNull
    @Column(nullable = false, length = 20)
    private String nom;

    @NonNull
    private Utilisateur manager;


    private List<Utilisateur> ListEmploye = new ArrayList<>();

    @Override
    public Long getId() {
        return super.getId();
    }

    @Override
    public void setId(Long id) {
        super.setId(id);
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


    public Utilisateur getManager() {
        return manager;
    }

    public void setManager(Utilisateur manager) {
        this.manager = manager;
    }

    public List<Utilisateur> getListEmploye() {
        return ListEmploye;
    }

    public void setListEmploye(List<Utilisateur> listEmploye) {
        ListEmploye = listEmploye;
    }
}
