package com.saiph.application.GestionRH.Domain.dto.DemandesDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@Getter
@Setter
public class AutorisationTravailSupDto extends DemandeDto {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String motif;
    @JsonFormat(pattern = "HH:mm")
    private Date Hacces;
    @JsonFormat(pattern = "HH:mm")
    private Date Hsortie;

}
