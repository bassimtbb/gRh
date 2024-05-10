package com.saiph.application.GestionRH.Domain.dto.DemandesDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CongeDto extends DemandeDto {

    private Integer duree;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date debut;
    private String motif;
}
