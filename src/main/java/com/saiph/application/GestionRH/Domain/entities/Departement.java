package com.saiph.application.GestionRH.Domain.entities;

import jakarta.persistence.*;
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

    @OneToMany(fetch = FetchType.EAGER)
    private List<User> ListEmploye = new ArrayList<>();



}
