package com.saiph.application.GestionRH.Domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Departement extends GenericEntity{


    @NonNull
    @Column(nullable = false, length = 20)
    private String nom;


    @OneToOne
    private Utilisateur manager;

    @OneToMany
    private List<Utilisateur> ListEmploye = new ArrayList<>();


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

    @Override
    public Long getId() {
        return super.getId();
    }

    @Override
    public void setId(Long id) {
        super.setId(id);
    }
}
