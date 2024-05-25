package com.saiph.application.GestionRH.Enum;

import lombok.Getter;

@Getter
public enum PDFTemplateName {

    ACTIVATE_ACCOUNT("activate_account"),
    PRET("Pret"),
    CONGE("Conge"),
    CHANGEMENT_HORAIRE("ChangementHoraire"),
    AUTORISATION_TRAVAIL_SUP("AutorisationTravailSup"),
    AUTORISATION_TELETRAVAIL("AutorisationTeletravail"),
    AUTORISATION_SORTIE("AutorisationSortie"),
    ACOMPTE("Acompte");

    private final String name;

    PDFTemplateName(String name) {
        this.name = name;
    }

    public static PDFTemplateName fromString(String name) {
        for (PDFTemplateName templateName : PDFTemplateName.values()) {
            if (templateName.name.equalsIgnoreCase(name)) {
                return templateName;
            }
        }
        throw new IllegalArgumentException("No enum constant with name " + name);
    }
}
