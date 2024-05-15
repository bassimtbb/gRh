package com.saiph.application.GestionRH.Domain.dto;


import com.saiph.application.GestionRH.Domain.entities.User;
import jakarta.persistence.*;
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

    private UserDto manager;

    @OneToMany(fetch = FetchType.EAGER)
    private List<UserDto> ListEmploye = new ArrayList<>();

}
