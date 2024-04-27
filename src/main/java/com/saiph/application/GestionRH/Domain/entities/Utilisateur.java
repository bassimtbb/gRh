package com.saiph.application.GestionRH.Domain.entities;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.FetchType.LAZY;


@Entity
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table (name=" Utilisateur")
public class Utilisateur  extends GenericEntity {


    @Override
    public Long getId() {
        return super.getId();
    }


    @Override
    public void setId(Long id) {
        super.setId(id);
    }

    private String EJuridic;

    private String nom;

    private String prenom;

    @Column(nullable = false, unique = true)
    private String email;


    @JoinColumn(name="Departement_id")
    private Departement departement;

    private String cin;

    private String service;

    private String direction;

    private String sexe;

    private String adresse;

    private String telephone;

    private String img;




    private Date DEmbauche=new Date();


}
