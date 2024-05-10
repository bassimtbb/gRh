package com.saiph.application.GestionRH.Domain.entities.Demandes;

import com.saiph.application.GestionRH.Domain.entities.Demande;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conge extends Demande {
    private Integer duree;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date debut;
    private String motif;
}