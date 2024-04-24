package com.saiph.application.GestionRH.Domain.dto;

import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.Role;
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
public class UtilisateurDto extends GenericDto  implements UserDetails,Principal {

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

    @JoinColumn(name = "Departement_id")
    private DepartementDto departement;

    private String cin;

    private String service;

    private String direction;

    private String sexe;

    private String adresse;

    private String telephone;

    private String img;

    private String username;

    @Column(unique = true)
    private String email;
    private String password;
    private boolean accountLocked;
    private boolean enabled;

    private Date DEmbauche = new Date();

    @ManyToMany(fetch = EAGER)
    private List<Role> roles;


    @Override
    public String getName() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return this.roles
                .stream()
                .map(r ->new SimpleGrantedAuthority(r.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }
}