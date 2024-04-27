package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.UtilisateurDto;
import com.saiph.application.GestionRH.Domain.entities.Utilisateur;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.repository.UtilisateurRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import com.saiph.application.GestionRH.services.UtilisateurCrudService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/utilisateur")
@Tag(name = "UtilisateurController")
public class UtilisateurController extends GenericCrudController<Utilisateur, UtilisateurDto> {
    public UtilisateurCrudService utilisateurCrudService;

    @Autowired
    public UtilisateurController(UtilisateurCrudService utilisateurCrudService) {
        this.utilisateurCrudService = utilisateurCrudService;
    }

    @Override
    protected GenericCrudService<Utilisateur, UtilisateurDto> getCrudService() {
        return utilisateurCrudService;
    }

 @GetMapping("/email/{email}")
    public Utilisateur loadUserByUsername(@PathVariable String email) throws UsernameNotFoundException {
        return utilisateurCrudService.loadUserByEmail(email);
    }

}