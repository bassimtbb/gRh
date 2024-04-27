package com.saiph.application.GestionRH.auth;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class RegistrationRequest {



    private String firstname;
    @NotEmpty(message = "Lastname is mandatory")
    @NotNull(message = "Lastname is mandatory")
    private String lastname;
    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;
    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be 8 characters long minimum")
    private String password;

    @NotEmpty(message = "EJuridic is mandatory")
    @NotNull(message = "EJuridic is mandatory")
    private String EJuridic;


    private Departement departement;


    private Date DEmbauche;


    @NotEmpty(message = "cin is mandatory")
    @NotNull(message = "cin is mandatory")
    private String cin;

    @NotEmpty(message = "service is mandatory")
    @NotNull(message = "service is mandatory")
    private String service;

    @NotEmpty(message = "direction is mandatory")
    @NotNull(message = "direction is mandatory")
    private String direction;

    @NotEmpty(message = "sexe is mandatory")
    @NotNull(message = "sexe is mandatory")
    private String sexe;

    private String adresse;

    @NotEmpty(message = "telephone is mandatory")
    @NotNull(message = "telephone is mandatory")
    private String telephone;

    private String img;

    @NotEmpty(message = "username is mandatory")
    @NotNull(message = "username is mandatory")
    private String username;

}
