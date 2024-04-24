package com.saiph.application.GestionRH.Domain.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
public class PublicationDto extends GenericDto {


    @NonNull
    private String file;

    @NonNull
    private String typeF;

    @NonNull
    private String description;

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getTypeF() {
        return typeF;
    }

    public void setTypeF(String typeF) {
        this.typeF = typeF;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}