package com.saiph.application.GestionRH.Domain.entities.Demandes;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saiph.application.GestionRH.Domain.entities.Demande;
import jakarta.persistence.Entity;
import lombok.*;

import java.sql.Time;
import java.util.Date;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutorisationSortie extends Demande {
    private Integer duree;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateS;

    @JsonFormat(pattern = "HH:MM")
    private Date Hsortie;
    @JsonFormat(pattern = "HH:MM")
    private Date Hretour;
    private String motif;
    private Boolean isTemporaire;


}
