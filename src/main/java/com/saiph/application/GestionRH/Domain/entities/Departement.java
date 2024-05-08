package com.saiph.application.GestionRH.Domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.*;
import com.saiph.application.GestionRH.Domain.entities.User;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Departement extends GenericEntity{


    @NonNull
    @Column(nullable = false, unique = true)
    private DepartementName name;

    @OneToOne
    private User manager;

    @OneToMany
    private List<User> ListEmploye = new ArrayList<>();



}
