package com.saiph.application.GestionRH.Domain.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Publication extends GenericEntity {

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