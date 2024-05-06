package com.saiph.application.GestionRH.Domain.dto.DemandesDto;


import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AcompteDto extends DemandeDto {
    private Integer montant;
    private String typeA;

}
