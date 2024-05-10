package com.saiph.application.GestionRH.Domain.dto.DemandesDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@Getter
@Setter
public class ChangementHoraireDto extends DemandeDto {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date debut;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date fin;
    private String motif;
    @JsonFormat(pattern = "HH:mm")
    private Date NouvelH;
    @JsonFormat(pattern = "HH:mm")
    private Date AncienH;

}
