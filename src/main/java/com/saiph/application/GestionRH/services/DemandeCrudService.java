//package com.saiph.application.GestionRH.services;
//
//import com.saiph.application.GestionRH.Domain.dto.DemandeDto;
//import com.saiph.application.GestionRH.Domain.entities.Demande;
//import com.saiph.application.GestionRH.repository.DemandeRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//
//@Service
//@Transactional
//public class DemandeCrudService extends GenericCrudService<Demande, DemandeDto> {
//
//    private DemandeRepository demandeRepository;
//
//    @Autowired
//    public DemandeCrudService(DemandeRepository demandeRepository) {
//        this.demandeRepository = demandeRepository;
//    }
//
//    @Override
//    protected CrudRepository getRepository() {
//        return demandeRepository;
//    }
//}
