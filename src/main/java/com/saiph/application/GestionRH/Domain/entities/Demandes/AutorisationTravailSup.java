package com.saiph.application.GestionRH.Domain.entities.Demandes;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saiph.application.GestionRH.Domain.entities.Demande;
import jakarta.persistence.Entity;
import lombok.*;

import java.sql.Time;
import java.util.Date;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AutorisationTravailSup extends Demande {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String motif;
    @JsonFormat(pattern = "HH:mm")
    private Date Hacces;
    @JsonFormat(pattern = "HH:mm")
    private Date Hsortie;
}
