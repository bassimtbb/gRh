package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.PublicationDto;
import com.saiph.application.GestionRH.Domain.entities.Publication;
import com.saiph.application.GestionRH.services.GenericCrudService;
import com.saiph.application.GestionRH.services.PublicationCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pub")
@Tag(name = "PublicationController")
public class PublicationController extends GenericCrudController<Publication, PublicationDto>{

    private PublicationCrudService publicationCrudService;

    @Autowired
    public PublicationController( PublicationCrudService publicationCrudService) {
        this.publicationCrudService = publicationCrudService;
    }

    @Override
    protected GenericCrudService<Publication, PublicationDto> getCrudService() {
        return publicationCrudService;
    }
}
