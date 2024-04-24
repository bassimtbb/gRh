package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.repository.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DepartementCrudService extends GenericCrudService<Departement, DepartementDto> {

    private DepartementRepository departementRepository;

    @Autowired
    public DepartementCrudService(DepartementRepository departementRepository) {
        this.departementRepository = departementRepository;
    }

    @Override
    public DepartementDto update(Long id, DepartementDto entityDto) throws ResourceNotFoundException {
        return super.update(id, entityDto);
    }

    @Override
    public DepartementDto findById(Long id) {
        return super.findById(id);
    }


    @Override
    protected CrudRepository getRepository() {
        return departementRepository;
    }

    @Override
    public List<DepartementDto> findAll() {
        return super.findAll();
    }
}
