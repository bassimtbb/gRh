package com.saiph.application.GestionRH.Domain.dto.DemandesDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@Getter
@Setter
public class AutorisationSortieDto extends DemandeDto {
    private Integer duree;
    @JsonFormat(pattern = "yyyy-MM-dd") // Using ISO 8601 standard for date serialization
    private Date dateS;

    @JsonFormat(pattern = "HH:MM")
    private Date Hsortie;
    @JsonFormat(pattern = "HH:MM")
    private Date Hretour;
    private String motif;
    private Boolean isTemporaire;

}
