package com.saiph.application.GestionRH.Domain.entities.Statistique;

import lombok.Data;

@Data
public class StatistiqueDemandeResult {

    private Integer DemandeCount;
    private Integer DemandeCountEn_attente_Sup_H;
    private Integer DemandeCountRefusee_Sup_H;
    private Integer DemandeCountEn_attente_RRH;
    private Integer DemandeCountValidee;
    private Integer DemandeCountRefusee;

    // acompte counts;
    private Integer AcompteCount;
    private Integer AcompteCountEn_attente_Sup_H;
    private Integer AcompteCountRefusee_Sup_H;
    private Integer AcompteCountEn_attente_RRH;
    private Integer AcompteCountValidee;
    private Integer AcompteCountRefusee;

    // AutorisationSortie counts;
    private Integer AutorisationSortieCount;
    private Integer AutorisationSortieCountEn_attente_Sup_H;
    private Integer AutorisationSortieCountRefusee_Sup_H;
    private Integer AutorisationSortieCountEn_attente_RRH;
    private Integer AutorisationSortieCountValidee;
    private Integer AutorisationSortieCountRefusee;

    // AutorisationTeletravail counts;
    private Integer AutorisationTeletravailCount;
    private Integer AutorisationTeletravailCountEn_attente_Sup_H;
    private Integer AutorisationTeletravailCountRefusee_Sup_H;
    private Integer AutorisationTeletravailCountEn_attente_RRH;
    private Integer AutorisationTeletravailCountValidee;
    private Integer AutorisationTeletravailCountRefusee;

    // AutorisationTravailSup counts;
    private Integer AutorisationTravailSupCount;
    private Integer AutorisationTravailSupCountEn_attente_Sup_H;
    private Integer AutorisationTravailSupCountRefusee_Sup_H;
    private Integer AutorisationTravailSupCountEn_attente_RRH;
    private Integer AutorisationTravailSupCountValidee;
    private Integer AutorisationTravailSupCountRefusee;

    // ChangementHoraire counts;
    private Integer ChangementHoraireCount;
    private Integer ChangementHoraireCountEn_attente_Sup_H;
    private Integer ChangementHoraireCountRefusee_Sup_H;
    private Integer ChangementHoraireCountEn_attente_RRH;
    private Integer ChangementHoraireCountValidee;
    private Integer ChangementHoraireCountRefusee;

    // Conge counts;
    private Integer CongeCount;
    private Integer CongeCountEn_attente_Sup_H;
    private Integer CongeCountRefusee_Sup_H;
    private Integer CongeCountEn_attente_RRH;
    private Integer CongeCountValidee;
    private Integer CongeCountRefusee;

    // Pret counts;
    private Integer PretCount;
    private Integer PretCountEn_attente_Sup_H;
    private Integer PreCountRefusee_Sup_H;
    private Integer PretCountEn_attente_RRH;
    private Integer PretCountValidee;
    private Integer PretCountRefusee;

}
