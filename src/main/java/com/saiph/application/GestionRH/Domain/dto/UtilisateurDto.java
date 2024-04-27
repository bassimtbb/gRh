package com.saiph.application.GestionRH.Domain.dto;

import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.Role;
import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.security.auth.Subject;
import java.security.Principal;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static jakarta.persistence.FetchType.EAGER;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurDto extends GenericDto  {

    public UtilisateurDto(Utilisateur utilisateur) {

    }

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

    private DepartementDto departement;

    private String cin;

    private String service;

    private String direction;

    private String sexe;

    private String adresse;

    private String telephone;

    private String img;
    private String email;

    private String username;

    private String password;
    private boolean accountLocked;
    private boolean enabled;

    private Date DEmbauche = new Date();

    private List<Role> roles;
}