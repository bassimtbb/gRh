package com.saiph.application.GestionRH.auth;

import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Enum.RoleType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class RegistrationRequest {


    private RoleType role;
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

    private String service;
    @NotEmpty(message = "sexe is mandatory")
    @NotNull(message = "sexe is mandatory")
    private String sexe;
    private String address;
    @NotEmpty(message = "telephone is mandatory")
    @NotNull(message = "telephone is mandatory")
    private String phonenumber;
    private String img;


}
