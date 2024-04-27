package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.entities.UserDetailImp;
import com.saiph.application.GestionRH.repository.UserDetailImpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailImpService implements UserDetailsService {

    private final UserDetailImpRepository userDetailImpRepository;

    @Autowired
    public UserDetailImpService(UserDetailImpRepository userDetailImpRepository) {
        this.userDetailImpRepository = userDetailImpRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDetailImpRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }



}
