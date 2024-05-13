package com.saiph.application.GestionRH.auth;

import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.repository.UserRepository;
import com.saiph.application.GestionRH.security.JwtService;
import com.saiph.application.GestionRH.services.DepartementCrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final DepartementCrudService departementService;
    private final AuthenticationManager authenticationManager;


    public RegistrationRequest register(RegistrationRequest request)  {

        var userdetail = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(true)
                .role(request.getRole())
                .DEmbauche(request.getDEmbauche())
                .email(request.getEmail())
                .cin(request.getCin())
                .img(request.getImg())
                .address(request.getAddress())
                .service(request.getService())
                .sexe(request.getSexe())
                .departement(null)
                .EJuridic(request.getEJuridic())
                .phonenumber(request.getPhonenumber())
                .build();

        userRepository.save(userdetail);
        if (userdetail.getDepartement()!=null){
        departementService.addEmpl(request.getDepartement().getId() ,userdetail.getId()) ;}
        System.out.println(userdetail.getDepartement()!=null);
        return  request;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("fullName", user.fullName());
        claims.put("Id", user.getId() );
        var jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

}