package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.entities.GenericEntity;
import com.saiph.application.GestionRH.Domain.entities.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import static jakarta.persistence.FetchType.EAGER;


@Entity
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailImp extends GenericEntity implements UserDetails, Principal {
    @Override
    public Long getId() {
        return super.getId();
    }

    @Override
    public void setId(Long id) {
        super.setId(id);
    }

    private String email;
    private String password;
    private String username;
    private boolean accountLocked;
    private boolean enabled;
    @ManyToMany(fetch = EAGER)
    private List<Role> roles;
    private String nom;
    private String prenom;
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
        return username;
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

    @Override
    public String getName() {
        return username;
    }
        public String fullName() {
        return getNom() + " " + getPrenom();
    }



    public String getFullName() {
        return getNom() + " " + getPrenom();
    }
}
