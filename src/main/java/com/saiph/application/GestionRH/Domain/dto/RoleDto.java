package com.saiph.application.GestionRH.Domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;

import java.util.List;

public class RoleDto extends GenericDto {
    @Column(unique = true)
    private String name;
    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private List<Utilisateur> user;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Utilisateur> getUser() {
        return user;
    }

    public void setUser(List<Utilisateur> user) {
        this.user = user;
    }
}
