package com.saiph.application.GestionRH.Domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Enum.RoleType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import lombok.Data;

import java.util.Date;

@Data
public class UserDto extends GenericDto{

    @Column(nullable = false, unique = true)
    private String email;
    private String password;
    private boolean accountLocked;
    private boolean enabled;
    @Enumerated(EnumType.STRING)
    private RoleType role;
    private String firstname;
    private String EJuridic;
    private String lastname;
    @JoinColumn(name="Departement_id")
    private Departement departement;
    private String cin;
    private String service;
    private String sexe;
    private String address;
    private String phonenumber;
    private String img;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private Date DEmbauche;
}
