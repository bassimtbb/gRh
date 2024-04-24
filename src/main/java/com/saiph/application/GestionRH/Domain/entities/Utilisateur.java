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
public class Utilisateur  extends GenericEntity implements UserDetails,Principal{

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

    @JoinColumn(name="Departement_id")
    private Departement departement;

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

    private Date DEmbauche=new Date();

    @ManyToMany(fetch = EAGER)
    private List<Role> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return this.roles
                .stream()
                .map(r ->new SimpleGrantedAuthority(r.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public String fullName() {
        return getNom() + " " + getPrenom();
    }

    @Override
    public String getName() {
        return email;
    }

    public String getFullName() {
        return getNom() + " " + getPrenom();
    }




}
