package com.saiph.application.GestionRH.security;

import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.exception.ResourceAlreadyExistsException;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.repository.UserRepository;
import com.saiph.application.GestionRH.services.GenericCrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

import static org.springframework.util.ClassUtils.isPresent;

@RequiredArgsConstructor
@Service
public class UserDetailService extends GenericCrudService<User, UserDto> implements UserDetailsService {


    private final UserRepository userRepository;
    private  PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public UserDto updateUser(Long id, User entityDto) throws ResourceNotFoundException {

        userRepository.save(entityDto);


        return convertToDto(entityDto);
    }

    @Override
    protected CrudRepository getRepository() {
        return userRepository;
    }
}
