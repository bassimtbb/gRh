package com.saiph.application.GestionRH.Domain.entities;

import com.saiph.application.GestionRH.Enum.DepartementName;
import lombok.Data;

@Data
public class StatistiqueUserByDepartementResult {

private DepartementName nameDep;
private Integer numUser;


}
