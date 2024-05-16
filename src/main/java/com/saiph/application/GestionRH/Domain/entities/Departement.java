package com.saiph.application.GestionRH.Domain.entities;

import com.saiph.application.GestionRH.Enum.DepartementName;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
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
