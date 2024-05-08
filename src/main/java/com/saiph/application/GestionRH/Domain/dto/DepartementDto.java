package com.saiph.application.GestionRH.Domain.dto;


import com.saiph.application.GestionRH.Domain.entities.User;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartementDto extends GenericDto {


    @NonNull
    @Column(nullable = false, unique = true)
    private String name;

    @OneToOne
    private User manager;

    @OneToMany
    private List<User> ListEmploye = new ArrayList<>();

}
