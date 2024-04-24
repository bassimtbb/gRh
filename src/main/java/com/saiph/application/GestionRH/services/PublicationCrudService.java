package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.PublicationDto;
import com.saiph.application.GestionRH.Domain.entities.Publication;
import com.saiph.application.GestionRH.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class PublicationCrudService extends GenericCrudService<Publication, PublicationDto> {

    private PublicationRepository publicationRepository;

    @Autowired
    public PublicationCrudService( PublicationRepository publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    @Override
    protected CrudRepository getRepository() {
        return publicationRepository;
    }
}
