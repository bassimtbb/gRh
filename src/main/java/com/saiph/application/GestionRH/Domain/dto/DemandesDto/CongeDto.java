package com.saiph.application.GestionRH.Domain.dto.DemandesDto;

import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CongeDto extends DemandeDto {
    private Integer duree;
    private String motif;
    private Date debut;
    private Date fin;
    private Date reprise;
}
