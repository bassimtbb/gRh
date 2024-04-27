package com.saiph.application.GestionRH.Domain.entities;

import com.saiph.application.GestionRH.Domain.entities.GenericEntity;
import com.saiph.application.GestionRH.Domain.entities.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import static jakarta.persistence.FetchType.EAGER;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
@EntityListeners(AuditingEntityListener.class)
public class UserDetailImp implements UserDetails, Principal {
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
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
