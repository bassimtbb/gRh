package com.saiph.application.GestionRH.Domain.entities;

import lombok.Data;

@Data
public class StatistiqueDemandeByDepartementResult {

private Integer countEmploye;


    private Integer  demandeCountByDepartement;
    private Integer  demandeEn_attente_Sup_HCountByDepartement;
    private Integer  demandeRefusee_Sup_HCountByDepartement;
    private Integer  demandeEn_attente_RRHCountByDepartement;
    private Integer  demandeValideeCountByDepartement;
    private Integer  demandeRefuseeCountByDepartement;

    // acompte counts
    private Integer acompteCountByDepartement;
    private Integer acompteEn_attente_Sup_HCountByDepartement;
    private Integer acompteRefusee_Sup_HCountByDepartement;
    private Integer acompteEn_attente_RRHCountByDepartement;
    private Integer acompteValideeCountByDepartement;
    private Integer acompteRefuseeCountByDepartement;


    // autorisationSortie counts
    private Integer autorisationSortieCountByDepartement;
    private Integer autorisationSortieEn_attente_Sup_HCountByDepartement;
    private Integer autorisationSortieRefusee_Sup_HCountByDepartement;
    private Integer autorisationSortieEn_attente_RRHCountByDepartement;
    private Integer autorisationSortieValideeCountByDepartement;
    private Integer autorisationSortieRefuseeCountByDepartement;


    // autorisationTeletravail counts
    private Integer autorisationTeletravailCountByDepartement;
    private Integer autorisationTeletravailEn_attente_Sup_HCountByDepartement;
    private Integer autorisationTeletravailRefusee_Sup_HCountByDepartement;
    private Integer autorisationTeletravailEn_attente_RRHCountByDepartement;
    private Integer autorisationTeletravailValideeCountByDepartement;
    private Integer autorisationTeletravailRefuseeCountByDepartement;


    // autorisationTravailSup counts
    private Integer autorisationTravailSupCountByDepartement;
    private Integer autorisationTravailSupEn_attente_Sup_HCountByDepartement;
    private Integer autorisationTravailSupRefusee_Sup_HCountByDepartement;
    private Integer autorisationTravailSupEn_attente_RRHCountByDepartement;
    private Integer autorisationTravailSupValideeCountByDepartement;
    private Integer autorisationTravailSupRefuseeCountByDepartement;


    // changementHoraire counts
    private Integer changementHoraireCountByDepartement;
    private Integer changementHoraireEn_attente_Sup_HCountByDepartement;
    private Integer changementHoraireRefusee_Sup_HCountByDepartement;
    private Integer changementHoraireEn_attente_RRHCountByDepartement;
    private Integer changementHoraireValideeCountByDepartement;
    private Integer changementHoraireRefuseeCountByDepartement;


    // conge counts
    private Integer congeCountByDepartement;
    private Integer congeEn_attente_Sup_HCountByDepartement;
    private Integer congeRefusee_Sup_HCountByDepartement;
    private Integer congeEn_attente_RRHCountByDepartement;
    private Integer congeRefuseeCountByDepartement;
    private Integer congeValideeCountByDepartement;


    // pret counts
    private Integer pretCountByDepartement;
    private Integer pretEn_attente_Sup_HCountByDepartement;
    private Integer pretRefusee_Sup_HCountByDepartement;
    private Integer pretEn_attente_RRHCountByDepartement;
    private Integer pretValideeCountByDepartement;
    private Integer pretRefuseeCountByDepartement;


}
