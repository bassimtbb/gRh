package com.saiph.application.GestionRH.security;

import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.repository.UserRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserDetailService extends GenericCrudService<User, UserDto> implements UserDetailsService {


    private final UserRepository userRepository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }


    @Override
    protected CrudRepository getRepository() {
        return userRepository;
    }
}
