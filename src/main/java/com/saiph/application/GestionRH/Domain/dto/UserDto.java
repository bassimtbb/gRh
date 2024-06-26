package com.saiph.application.GestionRH.Domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.Notification;
import com.saiph.application.GestionRH.Enum.RoleType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "departement_id")
        private Departement departement;
    @ManyToMany
    private List<Notification> notifications = new ArrayList<>();
    private String cin;
    private String sexe;
    private String address;
    private String phonenumber;
    private String img;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date DEmbauche;
}
